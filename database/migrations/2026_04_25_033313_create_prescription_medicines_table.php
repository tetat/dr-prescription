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
            $table->integer('duration')->nullable();
            $table->string('duration_type')->nullable();
            $table->json('doses')->nullable();
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
