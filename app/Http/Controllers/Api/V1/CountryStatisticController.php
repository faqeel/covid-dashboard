<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\SaveStatisticRequest;
use App\Http\Resources\Api\V1\CountryStatisticResource;
use App\Models\Country;
use App\Models\Statistic;

class CountryStatisticController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        return new CountryStatisticResource($country);
    }

    /**
     * Update or create the statistics of the specified resource in storage.
     *
     * @param  \App\Http\Requests\Api\V1\SaveStatisticRequest  $request
     * @param  \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function save(SaveStatisticRequest $request, Country $country)
    {
        Statistic::updateOrCreate(
            ['country_id' => $country->id],
            $request->safe()->only(['confirmed', 'deaths', 'recovered'])
        );
        return new CountryStatisticResource($country);
    }
}
