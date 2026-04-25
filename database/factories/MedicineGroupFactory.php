<?php

namespace Database\Factories;

use App\Models\MedicineGroup;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MedicineGroup>
 */
class MedicineGroupFactory extends Factory
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
                'Antibiotics',
                'Painkiller',
                'Antacid',
                'Vitamins',
                'Anti-inflammatory'
            ]),
            'description' => fake()->sentence(),
        ];
    }
}
