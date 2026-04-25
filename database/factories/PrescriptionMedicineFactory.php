<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\Prescription;
use App\Models\PrescriptionMedicine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PrescriptionMedicine>
 */
class PrescriptionMedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prescription_id' => Prescription::factory(),
            'medicine_id' => Medicine::factory(),
            'dosage' => fake()->randomElement([
                '1 tablet',
                '1 spoon',
            ]),
            'duration' => fake()->numberBetween(3, 14),
            'duration_type' => fake()->randomElement(['day', 'week', 'month', 'continue']),
            'before_food' => fake()->boolean(30),
            'first_dose' => fake()->boolean(100),
            'second_dose' => fake()->boolean(90),
            'third_dose' => fake()->boolean(80),
            'fourth_dose' => fake()->boolean(50),
            'instructions' => fake()->optional()->sentence(),
        ];
    }
}
