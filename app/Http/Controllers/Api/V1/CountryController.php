<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\StoreCountryRequest;
use App\Http\Requests\Api\V1\UpdateCountryRequest;
use App\Http\Resources\Api\V1\CountryResource;
use App\Models\Country;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CountryResource::collection(Country::paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Api\V1\StoreCountryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCountryRequest $request)
    {
        $country = Country::create($request->safe()->only(['name', 'code']));
        return new CountryResource($country);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        return new CountryResource($country);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Api\V1\UpdateCountryRequest  $request
     * @param  \App\Models\Country $country
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCountryRequest $request, Country $country)
    {
        $country->update($request->safe()->only(['name', 'code']));
        return new CountryResource($country);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Country $country
     */
    public function destroy(Country $country)
    {
        $country->delete();
    }
}
