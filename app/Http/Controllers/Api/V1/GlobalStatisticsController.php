<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\GlobalStatisticsResource;
use App\Models\GlobalStatistics;
use Illuminate\Http\Request;

class GlobalStatisticsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $statistics = GlobalStatistics::latest('stat_date')->first();
        if ($statistics) {
            return new GlobalStatisticsResource($statistics);
        }
        return response()->json(['data' => null]);
    }
}
