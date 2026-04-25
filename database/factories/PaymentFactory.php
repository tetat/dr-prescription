<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Prescription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
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

            'amount' => fake()->randomFloat(2, 100, 1000),

            'method' => fake()->randomElement([
                'cash', 'bkash', 'bank'
            ]),

            'status' => fake()->randomElement([
                'paid', 'partial', 'pending'
            ]),

            'paid_at' => now(),
        ];
    }
}
