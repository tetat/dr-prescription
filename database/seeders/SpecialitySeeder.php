<?php

namespace Database\Seeders;

use App\Models\Speciality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecialitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $specialities = [
            [
                'name' => 'Cardiology',
                'abbreviation' => 'Cardio',
            ],
            [
                'name' => 'Neurology',
                'abbreviation' => 'Neuro',
            ],
            [
                'name' => 'Otolaryngology',
                'abbreviation' => 'ENT',
            ],
            [
                'name' => 'Dermatology',
                'abbreviation' => 'Derm',
            ],
        ];

        foreach ($specialities as $speciality) {
            Speciality::create($speciality);
        }
    }
}
