<?php

namespace Database\Seeders;

use App\Models\Institute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstituteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $institutes = [
            [
                'name' => 'Dhaka Medical College',
                'abbreviation' => 'DMC',
            ],
            [
                'name' => 'Chattogram Medical College',
                'abbreviation' => 'CMC',
            ],
            [
                'name' => 'Sylhet Medical College',
                'abbreviation' => 'SMC',
            ],
            [
                'name' => 'University of Dhaka',
                'abbreviation' => 'DU',
            ],
        ];

        foreach ($institutes as $institute) {
            Institute::create($institute);
        }
    }
}
