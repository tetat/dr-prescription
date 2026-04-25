<?php

namespace Database\Factories;

use App\Models\DoctorSetting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DoctorSetting>
 */
class DoctorSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'doctor_id' => User::factory(),

            'consultation_fee' => 700,
            'followup_fee' => 500,
            'emergency_fee' => 1000,

            'followup_valid_days' => 15,
            'allow_free_followup' => false,
        ];
    }
}
