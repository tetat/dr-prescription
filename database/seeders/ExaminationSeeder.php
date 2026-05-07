<?php

namespace Database\Seeders;

use App\Models\Examination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExaminationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $examinations = [
            [
                'name' => 'Blood Pressure',
                'abbreviation' => 'BP',
                'unit' => 'mmHg'
            ],
        ];

        foreach ($examinations as $examination) {
            Examination::create($examination);
        }
    }
}
