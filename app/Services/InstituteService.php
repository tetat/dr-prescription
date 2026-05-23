<?php

namespace App\Services;

use App\Models\Institute;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class InstituteService
{
    public function getInstituteTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $instituteQuery = Institute::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $instituteQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('abbreviation', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $instituteQuery->count();

        if ($perPage === -1) {
            $allInstitutes = $instituteQuery->latest()
                ->get()
                ->map(fn($institute) => [
                        'id' => $institute->id,
                        'name' => $institute->name,
                        'locale_name' => $institute->locale_name ?? 'N/A',
                        'abbreviation' => $institute->abbreviation,
                        'locale_abbreviation' => $institute->locale_abbreviation,
                    ]
                );
            $institutes = [
                'data' => $allInstitutes,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $institutes = $instituteQuery->latest()->paginate($perPage)->withQueryString();

            $institutes->getCollection()->transform(fn($institute) => [
                'id' => $institute->id,
                'name' => $institute->name,
                'locale_name' => $institute->locale_name ?? 'N/A',
                'abbreviation' => $institute->abbreviation,
                'locale_abbreviation' => $institute->locale_abbreviation,
            ]);
        }

        return $institutes;
    }

    public function createInstitute(array $data): Institute
    {
        return DB::transaction(function() use ($data) {
            $institute = Institute::create([
                'name' => $data['name'],
                'locale_name' => $data['locale_name'],
                'abbreviation' => $data['abbreviation'],
                'locale_abbreviation' => $data['locale_abbreviation'],
            ]);

            return $institute;
        });
    }

    public function updateInstitute(array $data, Institute $institute): Institute
    {
        return DB::transaction(function() use ($data, $institute) {
            $institute->name = $data['name'];
            $institute->locale_name = $data['locale_name'];
            $institute->abbreviation = $data['abbreviation'];
            $institute->locale_abbreviation = $data['locale_abbreviation'];
            
            $institute->update();

            return $institute;
        });
    }

    public function deleteInstitute(Institute $institute): void
    {
        DB::transaction(function() use ($institute) {
            $institute->delete();
        });
    }
}