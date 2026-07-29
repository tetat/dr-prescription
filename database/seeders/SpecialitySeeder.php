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
                'locale_name' => 'হৃদরোগ',
                'abbreviation' => 'Cardio',
                'locale_abbreviation' => 'হৃদরোগ',
            ],
            [
                'name' => 'Neurology',
                'locale_name' => 'স্নায়ুরোগ',
                'abbreviation' => 'Neuro',
                'locale_abbreviation' => 'স্নায়ু',
            ],
            [
                'name' => 'Otolaryngology',
                'locale_name' => 'কান, নাক ও গলা',
                'abbreviation' => 'ENT',
                'locale_abbreviation' => 'ইএনটি',
            ],
            [
                'name' => 'Dermatology',
                'locale_name' => 'চর্মরোগ',
                'abbreviation' => 'Derm',
                'locale_abbreviation' => 'চর্ম',
            ],
        ];

        foreach ($specialities as $speciality) {
            Speciality::create($speciality);
        }
    }
}
