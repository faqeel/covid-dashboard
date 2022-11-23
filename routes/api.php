<?php

use App\Http\Controllers\Api\V1\CountryStatisticController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'App\Http\Controllers\Api\V1', 'prefix' => 'v1'], function () {
    # api/v1/country
    Route::apiResource('/country', CountryController::class);

    # api/v1/country/{country}/statistic
    Route::get('/country/{country}/statistic', [CountryStatisticController::class, 'show']);
    Route::post('/country/{country}/statistic', [CountryStatisticController::class, 'save']);

    # api/v1/global
    Route::get('/global', GlobalStatisticsController::class);
});
