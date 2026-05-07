<?php

namespace Database\Seeders;

use App\Models\Degree;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DegreeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $degrees = [
            [
                'name' => 'Bachelor of Medicine and Bachelor of Surgery',
                'abbreviation' => 'MBBS',
            ],
            [
                'name' => 'Fellow of the College of Physicians and Surgeons',
                'abbreviation' => 'FCPS',
            ],
            [
                'name' => 'Doctor of Medicine',
                'abbreviation' => 'MD',
            ],
            [
                'name' => 'Master of Surgery',
                'abbreviation' => 'MS',
            ]
        ];

        foreach ($degrees as $degree) {
            Degree::create($degree);
        }
    }
}
