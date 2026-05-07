<?php

namespace Database\Seeders;

use App\Models\Test;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tests = [
            [
                'name' => 'CBC',
                'description' => 'Complete Blood Count',
            ],
            [
                'name' => 'HB%',
                'description' => 'Haemoglobin',
            ],
            [
                'name' => 'USG of W/A',
                'description' => 'Ultrasound of Whole Abdomen',
            ],
            [
                'name' => 'ECG',
                'description' => 'Electrocardiogram',
            ],
        ];

        foreach ($tests as $test) {
            Test::create($test);
        }
    }
}
