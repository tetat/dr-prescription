<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MedicineGroup;

class MedicineGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $medicineGroups = [
            [
                'name' => 'Paracetamol',
            ],
            [
                'name' => 'Ceftriaxone',
            ]
        ];

        foreach ($medicineGroups as $medicineGroup) {
            MedicineGroup::create($medicineGroup);
        }
    }
}
