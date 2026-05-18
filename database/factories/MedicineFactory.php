<?php

namespace Database\Factories;

use App\Models\Medicine;
use App\Models\MedicineGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Medicine>
 */
class MedicineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Napa',
                'Seclo',
                'Ace',
                'Amodis',
                'Losectil'
            ]),

            'generic_name' => fake()->randomElement([
                'Paracetamol',
                'Omeprazole',
                'Amoxicillin'
            ]),

            'strength' => fake()->randomElement([
                '500mg',
                '20mg',
                '250mg/5ml'
            ]),

            'medicine_group_id' => MedicineGroup::factory(),
        ];
    }
}
