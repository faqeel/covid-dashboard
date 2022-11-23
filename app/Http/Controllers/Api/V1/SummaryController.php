<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\SummaryResource;
use App\Models\Country;
use App\Models\GlobalStatistics;
use Illuminate\Http\Request;

class SummaryController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return new SummaryResource([
            'global' => GlobalStatistics::latest('stat_date')->first(),
            'countries' => Country::all()
        ]);
    }
}
