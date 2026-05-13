<?php

namespace App\Services;

use App\Models\Degree;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class DegreeService
{
    public function getDegreeQuery(): Builder
    {
        return Degree::query();
    }

    public function getDegreeTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $degreeQuery = $this->getDegreeQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $degreeQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('abbreviation', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $degreeQuery->count();

        if ($perPage === -1) {
            $allDegrees = $degreeQuery->latest()
                ->get()
                ->map(fn($degree) => [
                        'id' => $degree->id,
                        'name' => $degree->name,
                        'abbreviation' => $degree->abbreviation,
                    ]
                );
            $degrees = [
                'data' => $allDegrees,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $degrees = $degreeQuery->latest()->paginate($perPage)->withQueryString();

            $degrees->getCollection()->transform(fn($degree) => [
                'id' => $degree->id,
                'name' => $degree->name,
                'abbreviation' => $degree->abbreviation,
            ]);
        }

        return $degrees;
    }

    public function createDegree(array $data): Degree
    {
        return DB::transaction(function() use ($data) {
            $degree = Degree::create([
                'name' => $data['name'],
                'abbreviation' => $data['abbreviation'],
            ]);

            return $degree;
        });
    }

    public function updateDegree(Degree $degree, array $data): Degree
    {
        return DB::transaction(function() use ($degree, $data) {
            $degree->update([
                'name' => $data['name'],
                'abbreviation' => $data['abbreviation'],
            ]);

            return $degree;
        });
    }

    public function deleteDegree(Degree $degree): void
    {
        DB::transaction(function() use ($degree) {
            $degree->delete();
        });
    }
}