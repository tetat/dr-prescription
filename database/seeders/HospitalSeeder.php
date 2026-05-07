<?php

namespace Database\Seeders;

use App\Models\Hospital;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HospitalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hospitals = [
            [
                'name' => 'Dhaka Medical College Hospital',
                'full_name' => 'Dhaka Medical College Hospital',
                'address' => 'Dhaka, Bangladesh',
            ],
            [
                'name' => 'Chattogram Medical College Hospital',
                'full_name' => 'Chattogram Medical College Hospital',
                'address' => 'Chattogram, Bangladesh',
            ],
            [
                'name' => 'Sylhet Medical College Hospital',
                'full_name' => 'Sylhet Medical College Hospital',
                'address' => 'Sylhet, Bangladesh',
            ],
        ];

        foreach ($hospitals as $hospital) {
            Hospital::create($hospital);
        }
    }
}
