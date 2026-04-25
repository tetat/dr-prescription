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
        Schema::create('prescription_medicines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prescription_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('medicine_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('dosage')->nullable();
            $table->integer('duration')->nullable();
            $table->string('duration_type')->nullable();
            $table->boolean('before_food')->default(false);
            $table->boolean('first_dose')->default(true);
            $table->boolean('second_dose')->default(true);
            $table->boolean('third_dose')->default(true);
            $table->boolean('fourth_dose')->default(false);
            $table->text('instructions')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescription_medicines');
    }
};
