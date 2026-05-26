<?php

namespace Database\Seeders;

use App\Services\PatientService;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patientService = app(PatientService::class);

        $patients = [
            [
                'name' => 'Rahim Uddin',

                'email' => 'rahim@example.com',

                'gender' => 'Male',

                'age' => 35,
                'age_type' => 'Year',

                'blood_group' => 'B+',

                'address' => 'Dhaka, Bangladesh',

                'phones' => [
                    [
                        'country_code' => '+880',
                        'number' => '1710000001',
                    ],
                ],
            ],

            [
                'name' => 'Karim Ahmed',

                'email' => null,

                'gender' => 'Male',

                'age' => 52,
                'age_type' => 'Year',

                'blood_group' => 'O+',

                'address' => 'Chattogram, Bangladesh',

                'phones' => [
                    [
                        'country_code' => '+880',
                        'number' => '1710000003',
                    ],
                ],
            ],
        ];

        foreach ($patients as $patient) {
            $patientService->createPatient($patient);
        }
    }
}
