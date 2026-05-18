<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Medicine;

class MedicineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medicines = [
            [
                'name' => 'Napa',
                'strength' => '500mg',
                'form_id' => 1,
                'medicine_group_id' => 1,
            ],
            [
                'name' => 'Ceftron',
                'form_id' => 2,
                'strength' => '200mg',
                'medicine_group_id' => 2,
            ]
        ];

        foreach ($medicines as $medicine) {
            $formId = $medicine['form_id'];

            unset($medicine['form_id']);

            $medicine = Medicine::create($medicine);

            $medicine->forms()->attach($formId);
        }
    }
}
