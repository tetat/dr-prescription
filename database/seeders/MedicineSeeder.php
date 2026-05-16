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
                'form' => 'tablet',
                'strength' => '500mg',
                'medicine_group_id' => 1,
            ],
            [
                'name' => 'Ceftron',
                'form' => 'tablet',
                'strength' => '200mg',
                'medicine_group_id' => 2,
            ]
        ];

        foreach ($medicines as $medicine) {
            Medicine::create($medicine);
        }
    }
}
