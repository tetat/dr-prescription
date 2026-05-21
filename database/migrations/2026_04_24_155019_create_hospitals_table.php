<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hospitals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('locale_name')->nullable();
            $table->string('full_name')->nullable();
            $table->string('locale_full_name')->nullable();
            $table->string('logo')->nullable();
            $table->string('moto')->nullable();
            $table->string('locale_moto')->nullable();
            $table->text('address')->nullable();
            $table->text('locale_address')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hospitals');
    }
};
