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
        Schema::create('doctor_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')
                ->constrained('users')
                ->cascadeOnDelete();
            $table->decimal('consultation_fee', 10, 2);
            $table->decimal('followup_fee', 10, 2)->nullable();
            $table->decimal('emergency_fee', 10, 2)->nullable();
            $table->integer('followup_valid_days');
            $table->boolean('allow_free_followup')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor_settings');
    }
};
