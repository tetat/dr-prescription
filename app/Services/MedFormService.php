<?php

namespace App\Services;

use App\Models\MedForm;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class MedFormService
{
    public function getMedFormTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $medFormQuery = MedForm::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $medFormQuery->where(
                fn($query) =>
                $query->where('short_name', 'like', "%{$search}%")
                    ->orWhere('long_name', 'like', "%{$search}%")
            );
        }

        $totalCount = $medFormQuery->count();

        if ($perPage === -1) {
            $allMedForms = $medFormQuery->latest()
                ->get()
                ->map(
                    fn($medForm) => [
                        'id' => $medForm->id,
                        'short_name' => $medForm->short_name,
                        'long_name' => $medForm->long_name,
                    ]
                );
            $medForms = [
                'data' => $allMedForms,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $medForms = $medFormQuery->latest()->paginate($perPage)->withQueryString();

            $medForms->getCollection()->transform(fn($medForm) => [
                'id' => $medForm->id,
                'short_name' => $medForm->short_name,
                'long_name' => $medForm->long_name,
            ]);
        }

        return $medForms;
    }

    public function createMedForm(array $data): MedForm
    {
        return DB::transaction(function() use ($data) {
            $medForm = MedForm::create([
                'short_name' => $data['short_name'],
                'long_name' => $data['long_name'],
            ]);

            return $medForm;
        });
    }

    public function updateMedForm(array $data, MedForm $medForm): MedForm
    {
        return DB::transaction(function() use ($data, $medForm) {
            $medForm->update([
                'short_name' => $data['short_name'],
                'long_name' => $data['long_name'],
            ]);

            return $medForm;
        });
    }

    public function deleteMedForm(MedForm $medForm): void
    {
        DB::transaction(function() use ($medForm) {
            $medForm->delete();
        });
    }
}
