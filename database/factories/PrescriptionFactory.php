<?php

namespace Database\Factories;

use App\Models\Hospital;
use App\Models\Prescription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Prescription>
 */
class PrescriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => User::factory(),
            'doctor_id' => User::factory(),
            'hospital_id' => Hospital::factory(),

            'chief_complaint' => fake()->sentence(),

            'patient_weight' => fake()->randomFloat(2, 40, 100),
            'patient_height' => fake()->randomFloat(2, 140, 190),

            'next_visit' => fake()->optional()->date(),

            'consultation_fee' => 700,
        ];
    }
}
