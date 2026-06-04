<?php

namespace Database\Seeders;

use App\Services\DoctorProfileService;
use Illuminate\Database\Seeder;

class DoctorProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctorService = app(DoctorProfileService::class);

        $doctors = [
            [
                'name' => 'Atiqur Rahman',
                'locale_name' => 'আতিকুর রহমান',

                'title' => 'Dr.',
                'locale_title' => 'ডাঃ',

                'email' => 'atiqur@dt.com',
                'password' => '123654789',

                'gender' => 'Male',
                'blood_group' => 'B+',

                'address' => 'Dhaka, Bangladesh',

                'bio' => 'Experienced medicine specialist.',

                'licence_no' => 'A-000001',

                'role_ids' => [1, 3],

                'speciality_ids' => [3],

                'degrees' => [
                    [
                        'degree_id' => 1,
                        'institute_id' => 4,
                        'passing_year' => '2019',
                    ],
                ],

                'phones' => [
                    [
                        'country_code' => '+880',
                        'number' => '1300000000',
                    ],
                ],
            ],
        ];

        foreach ($doctors as $doctor) {
            $doctorService->createDoctor($doctor);
        }
    }
}
