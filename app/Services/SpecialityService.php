<?php

namespace App\Services;

use App\Models\Speciality;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SpecialityService
{
    public function getSpecialityTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $specialityQuery = Speciality::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $specialityQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('abbreviation', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $specialityQuery->count();

        if ($perPage === -1) {
            $allSpecialities = $specialityQuery->latest()
                ->get()
                ->map(fn($speciality) => [
                        'id' => $speciality->id,
                        'name' => $speciality->name,
                        'abbreviation' => $speciality->abbreviation ?? 'Not Given',
                    ]
                );
            $specialities = [
                'data' => $allSpecialities,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $specialities = $specialityQuery->latest()->paginate($perPage)->withQueryString();

            $specialities->getCollection()->transform(fn($speciality) => [
                'id' => $speciality->id,
                'name' => $speciality->name,
                'abbreviation' => $speciality->abbreviation ?? 'Not Given',
            ]);
        }

        return $specialities;
    }

    public function createSpeciality(array $data): Speciality
    {
        return DB::transaction(function() use ($data) {
            $speciality = Speciality::create([
                'name' => $data['name'],
                'abbreviation' => $data['abbreviation'],
            ]);

            return $speciality;
        });
    }

    public function updateSpeciality(array $data, Speciality $speciality): Speciality
    {
        return DB::transaction(function() use ($data, $speciality) {
            $speciality->update([
                'name' => $data['name'],
                'abbreviation' => $data['abbreviation'],
            ]);

            return $speciality;
        });
    }

    public function deleteSpeciality(Speciality $speciality): void
    {
        DB::transaction(function() use ($speciality) {
            $speciality->delete();
        });
    }
}