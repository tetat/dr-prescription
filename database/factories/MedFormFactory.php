<?php

namespace Database\Factories;

use App\Models\MedForm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MedForm>
 */
class MedFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'short_name' => fake()->randomElement([
                'Tab',
                'Caps',
                'Syp',
                'Inj',
            ]),

            'long_name' => fake()->randomElement([
                'Tablet',
                'Capsule',
                'Syrup',
                'Injection',
            ]),
        ];
    }
}
