<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['confirmed', 'deaths', 'recovered', 'country_id'];

    /**
     * Get the country that owns the statistics.
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
