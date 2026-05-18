<?php

namespace Database\Seeders;

use App\Models\MedForm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $forms = [
            [
                'short_name' => 'Tab',
                'long_name' => 'Tablet',
            ],
            [
                'short_name' => 'Caps',
                'long_name' => 'Capsule',
            ],
            [
                'short_name' => 'Syp',
                'long_name' => 'Syrup',
            ],
            [
                'short_name' => 'Inj',
                'long_name' => 'Injection',
            ],
            [
                'short_name' => 'Inf',
                'long_name' => 'Infusion',
            ],
            [
                'short_name' => 'Supp',
                'long_name' => 'Suppository',
            ],
            [
                'short_name' => 'Drops',
                'long_name' => 'Drops',
            ],
            [
                'short_name' => 'Cream',
                'long_name' => 'Cream',
            ],
            [
                'short_name' => 'Oint',
                'long_name' => 'Ointment',
            ],
        ];

        foreach ($forms as $form) {
            MedForm::create([
                'short_name' => $form['short_name'],
                'long_name' => $form['long_name'],
            ]);
        }
    }
}
