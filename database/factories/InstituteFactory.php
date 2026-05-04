<?php

namespace Database\Factories;

use App\Models\Institute;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Institute>
 */
class InstituteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'abbreviation' => $this->faker->word,
        ];
    }
}
