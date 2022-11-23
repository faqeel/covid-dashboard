<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class GlobalStatisticsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'stat_date' => $this->stat_date,
            'confirmed' => $this->confirmed,
            'deaths' => $this->deaths,
            'recovered' => $this->recovered
        ];
    }
}
