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
                'phones' => [
                    [
                        'country_code' => '+880',
                        'number' => '25516513042'
                    ]
                ]
            ],
            [
                'name' => 'Chattogram Medical College Hospital',
                'full_name' => 'Chattogram Medical College Hospital',
                'address' => 'Chattogram, Bangladesh',
                'phones' => [
                    [
                        'country_code' => '+880',
                        'number' => '2333350180'
                    ]
                ]
            ],
            [
                'name' => 'Sylhet M.A.G. Osmani Medical College',
                'full_name' => 'Sylhet M.A.G. Osmani Medical College',
                'address' => 'Sylhet, Bangladesh',
                'phones' => [
                    [
                        'country_code' => '+880',
                        'number' => '2996631213'
                    ]
                ]
            ],
        ];

        foreach ($hospitals as $hospital) {
            $phones = $hospital['phones'];
            unset($hospital['phones']);

            $createdHospital = Hospital::create($hospital);

            $createdHospital->phones()->createMany($phones);
        }
    }
}
