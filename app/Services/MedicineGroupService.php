<?php

namespace App\Services;

use App\Models\MedicineGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MedicineGroupService
{
    public function getMedicineGroupTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $medicineGroupQuery = MedicineGroup::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $medicineGroupQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $medicineGroupQuery->count();

        if ($perPage === -1) {
            $allMedicineGroups = $medicineGroupQuery->latest()
                ->get()
                ->map(fn($medicineGroup) => [
                        'id' => $medicineGroup->id,
                        'name' => $medicineGroup->name,
                        'description' => $medicineGroup->description ?? 'Not Given',
                    ]
                );
            $medicineGroups = [
                'data' => $allMedicineGroups,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $medicineGroups = $medicineGroupQuery->latest()->paginate($perPage)->withQueryString();

            $medicineGroups->getCollection()->transform(fn($medicineGroup) => [
                'id' => $medicineGroup->id,
                'name' => $medicineGroup->name,
                'description' => $medicineGroup->description ?? 'Not Given',
            ]);
        }

        return $medicineGroups;
    }

    public function createMedicineGroup(array $data): MedicineGroup
    {
        return DB::transaction(function() use ($data) {
            $medicineGroup = MedicineGroup::create([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            return $medicineGroup;
        });
    }

    public function updateMedicineGroup(array $data, MedicineGroup $medicineGroup): MedicineGroup
    {
        return DB::transaction(function() use ($data, $medicineGroup) {
            $medicineGroup->update([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            return $medicineGroup;
        });
    }

    public function deleteMedicineGroup(MedicineGroup $medicineGroup): void
    {
        DB::transaction(function() use ($medicineGroup) {
            $medicineGroup->delete();
        });
    }
}