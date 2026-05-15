<?php

namespace App\Services;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MedicineService
{
    public function getAllMedicines(): Collection
    {
        return Medicine::all()->map(fn($medicine) => [
            'id' => $medicine->id,
            'name' => $medicine->name,
        ]);
    }

    public function getMedicineTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $medicineQuery = Medicine::with('group');

        if ($request->filled('search')) {
            $search = $request->search;

            $medicineQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhereHas('group', function ($groupQuery) use ($search) {
                        $groupQuery->where('name', 'like', "%{$search}%");
                    })
            );
        }
        
        $totalCount = $medicineQuery->count();

        if ($perPage === -1) {
            $allMedicines = $medicineQuery->latest()
                ->get()
                ->map(fn($medicine) => [
                        'id' => $medicine->id,
                        'name' => $medicine->name,
                        'generic_name' => $medicine->generic_name ?? 'Not Given',
                        'form' => $medicine->form,
                        'strength' => $medicine->strength,
                        'group_name' => $medicine->group->name,
                    ]
                );
            $medicines = [
                'data' => $allMedicines,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $medicines = $medicineQuery->latest()->paginate($perPage)->withQueryString();

            $medicines->getCollection()->transform(fn($medicine) => [
                'id' => $medicine->id,
                'name' => $medicine->name,
                'generic_name' => $medicine->generic_name ?? 'Not Given',
                'form' => $medicine->form,
                'strength' => $medicine->strength,
                'group_name' => $medicine->group->name,
            ]);
        }

        return $medicines;
    }

    public function createMedicine(array $data): Medicine
    {
        return DB::transaction(function() use ($data) {
            $medicine = Medicine::create([
                'name' => $data['name'],
                'generic_name' => $data['generic_name'],
                'form' => $data['form'],
                'strength' => $data['strength'],
                'medicine_group_id' => $data['medicine_group_id'],
            ]);

            return $medicine;
        });
    }

    public function updateMedicine(array $data, Medicine $medicine): Medicine
    {
        return DB::transaction(function() use ($data, $medicine) {
            $medicine->update([
                'name' => $data['name'],
                'generic_name' => $data['generic_name'],
                'form' => $data['form'],
                'strength' => $data['strength'],
                'medicine_group_id' => $data['medicine_group_id'],
            ]);

            return $medicine;
        });
    }

    public function deleteMedicine(Medicine $medicine): void
    {
        DB::transaction(function() use ($medicine) {
            $medicine->delete();
        });
    }
}