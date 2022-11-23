<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('global_statistics', function (Blueprint $table) {
            $table->id();
            $table->date('stat_date')->unique();
            $table->integer('confirmed')->default(-1);
            $table->integer('deaths')->default(-1);
            $table->integer('recovered')->default(-1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('global_statistics');
    }
};
