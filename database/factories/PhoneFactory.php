<?php

namespace Database\Factories;

use App\Models\Hospital;
use App\Models\Phone;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Phone>
 */
class PhoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $phoneables = [
            User::class,
            Hospital::class,
        ];

        return [
            'phoneable_id' => function () {
                return fake()->randomElement([
                    User::factory(),
                    Hospital::factory(),
                ]);
            },

            'phoneable_type' => fake()->randomElement($phoneables),

            'country_code' => fake()->randomElement([
                '+880', '+1', '+91'
            ]),

            'number' => fake()->numerify('##########'),
        ];
    }
}
