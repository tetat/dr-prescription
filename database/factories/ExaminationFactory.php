<?php

namespace Database\Factories;

use App\Models\Examination;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Examination>
 */
class ExaminationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $examinations = [
            'BP' => ['name' => 'Blood Pressure', 'unit' => 'mmHg'],
            'P'  => ['name' => 'Pulse', 'unit' => 'bpm'],
            'T'  => ['name' => 'Temperature', 'unit' => '°C'],
            'HL' => ['name' => 'Heart/Lung', 'unit' => null],
            'RR' => ['name' => 'Respiratory Rate', 'unit' => 'breaths/min'],
            'HR' => ['name' => 'Heart Rate', 'unit' => 'bpm'],
        ];

        $key = fake()->randomElement(array_keys($examinations));
        $exam = $examinations[$key];

        return [
            'name' => $exam['name'],
            'abbreviation' => $key,
            'unit' => $exam['unit'],
        ];
    }
}
