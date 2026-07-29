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
                'locale_name' => 'চিকিৎসাবিদ্যা ও শল্যচিকিৎসায় স্নাতক',
                'abbreviation' => 'MBBS',
                'locale_abbreviation' => 'এমবিবিএস',
            ],
            [
                'name' => 'Fellow of the College of Physicians and Surgeons',
                'locale_name' => 'কলেজ অব ফিজিশিয়ানস অ্যান্ড সার্জনস-এর ফেলো',
                'abbreviation' => 'FCPS',
                'locale_abbreviation' => 'এফসিপিএস',
            ],
            [
                'name' => 'Doctor of Medicine',
                'locale_name' => 'ডক্টর অব মেডিসিন',
                'abbreviation' => 'MD',
                'locale_abbreviation' => 'এমডি',
            ],
            [
                'name' => 'Master of Surgery',
                'locale_name' => 'মাস্টার অব সার্জারি',
                'abbreviation' => 'MS',
                'locale_abbreviation' => 'এমএস',
            ],
        ];

        foreach ($degrees as $degree) {
            Degree::create($degree);
        }
    }
}
