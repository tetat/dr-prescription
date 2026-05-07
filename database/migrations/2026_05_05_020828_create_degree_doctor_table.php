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
        Schema::create('degree_doctor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignId('degree_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('institute_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('passing_year')->nullable();
            $table->unique(['doctor_id', 'degree_id', 'institute_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('degree_doctor');
    }
};
