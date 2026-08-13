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
            [
                'name' => 'Musab Ibn Mim',
                'locale_name' => 'ডাঃ মুসাব ইবন মিম',

                'title' => 'Dr.',
                'locale_title' => 'ডাঃ',

                'email' => 'musab@dt.com',
                'password' => '123654789',

                'gender' => 'Male',
                'blood_group' => 'A+',

                'address' => 'Dhaka, Bangladesh',

                'bio' => 'Experienced medicine specialist.',

                'licence_no' => 'A-000002',

                'role_ids' => [3],

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
                        'number' => '1300000001',
                    ],
                ],
            ],
        ];

        foreach ($doctors as $doctor) {
            $doctorService->createDoctor($doctor);
        }
    }
}
