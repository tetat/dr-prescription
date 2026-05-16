<?php

namespace App\Services;

use App\Models\Examination;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExaminationService
{
    public function getExaminationQuery(): Builder
    {
        return Examination::query();
    }

    public function getExaminationTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $examinationQuery = $this->getExaminationQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $examinationQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $examinationQuery->count();

        if ($perPage === -1) {
            $allExaminations = $examinationQuery->latest()
                ->get()
                ->map(fn($examination) => [
                        'id' => $examination->id,
                        'name' => $examination->name,
                        'abbreviation' => $examination->abbreviation ?? 'N/A',
                        'unit' => $examination->unit ?? 'N/A',
                    ]
                );
            $examinations = [
                'data' => $allExaminations,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $examinations = $examinationQuery->latest()->paginate($perPage)->withQueryString();

            $examinations->getCollection()->transform(fn($examination) => [
                'id' => $examination->id,
                'name' => $examination->name,
                'abbreviation' => $examination->abbreviation ?? 'N/A',
                'unit' => $examination->unit ?? 'N/A',
            ]);
        }

        return $examinations;
    }

    public function createExamination(array $data): Examination
    {
        return DB::transaction(function() use ($data) {
            $examination = Examination::create([
                'name' => $data['name'],
                'abbreviation' => $data['abbreviation'],
                'unit' => $data['unit'],
            ]);

            return $examination;
        });
    }

    public function updateExamination(Examination $examination, array $data): Examination
    {
        return DB::transaction(function() use ($examination, $data) {
            $examination->update([
                'name' => $data['name'],
                'abbreviation' => $data['abbreviation'],
                'unit' => $data['unit'],
            ]);

            return $examination;
        });
    }

    public function deleteExamination(Examination $examination): void
    {
        DB::transaction(function() use ($examination) {
            $examination->delete();
        });
    }
}