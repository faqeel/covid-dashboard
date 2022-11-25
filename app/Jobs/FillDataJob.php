<?php

namespace App\Jobs;

use App\Models\Country;
use App\Models\GlobalStatistics;
use App\Models\Statistic;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FillDataJob implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Indicate if the job should be marked as failed on timeout.
     *
     * @var bool
     */
    public $failOnTimeout = true;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info("Starting Fill Data Job...");

        $data = $this->fetchData();

        if (empty($data->Message)) {

            $this->processGlobalStatistics($data->Global);
            $this->processCountriesStatistics($data->Countries);
            Log::info("The fill data job has been completed!");

        } else {
            Log::warning('Unable to fetch data, message: ' . $data->Message);
            $this->release(30);
        }
    }

    /**
     * Fetchs data from the covid19api service.
     * 
     * @return mixed decoded response body
     */
    private function fetchData()
    {
        $baseURL = Config::get('services.covid19api.url');
        $response = Http::retry(3, 1000)->acceptJson()->get($baseURL . '/summary');
        if ($response->failed()) {
            Log::warning("Error HTTP response, status code: " . $response->status());
            $this->release(30);
        }
        return json_decode($response->body());
    }

    /**
     * Updates or inserts global statistics into the database.
     * 
     * @param object $data An object contains global statistics.
     * @return void 
     */
    private function processGlobalStatistics($data)
    {
        if (empty($data)) {
            Log::warning('No global statistics provided');
            return;
        }
        GlobalStatistics::updateOrCreate(
            ['stat_date' => Carbon::now()],
            [
                'confirmed' => $data->TotalConfirmed,
                'deaths' => $data->TotalDeaths,
                'recovered' => $data->TotalRecovered
            ]
        );
    }

    /**
     * Updates or inserts countries and their statistics into the database.
     * 
     * @param object[] $countries List of countries along with their statistics.
     * @return void
     */
    private function processCountriesStatistics($countries)
    {
        if (empty($countries)) {
            Log::warning('No countries provided');
            return;
        }
        foreach ($countries as $country) {
            // Retrieve a country by its code or create it if it doesn't exist
            $c = Country::firstOrCreate(
                ['code' => $country->CountryCode],
                ['name' => $country->Country]
            );

            // Update the retrieved/created country statistics or create it
            // if it doesn't exist
            Statistic::updateOrCreate(
                ['country_id' => $c->id],
                [
                    'confirmed' => $country->TotalConfirmed,
                    'deaths' => $country->TotalDeaths,
                    'recovered' => $country->TotalRecovered,
                ]
            );
        }
    }
}
