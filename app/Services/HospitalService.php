<?php

namespace App\Services;

use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class HospitalService
{
    public function getHospitalQuery(): Builder
    {
        return Hospital::query();
    }

    public function getHospitalTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $hospitalQuery = $this->getHospitalQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $hospitalQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $hospitalQuery->count();

        if ($perPage === -1) {
            $allHospitals = $hospitalQuery->latest()
                ->get()
                ->map(fn($hospital) => [
                        'id' => $hospital->id,
                        'name' => $hospital->name,
                        'locale_name' => $hospital->locale_name ?? 'N/A',
                        'full_name' => $hospital->full_name ?? 'N/A',
                        'locale_full_name' => $hospital->locale_full_name,
                        'logo' => $hospital->logo_url,
                        'moto' => $hospital->moto ?? 'N/A',
                        'locale_moto' => $hospital->locale_moto ?? 'N/A',
                        'address' => $hospital->address ?? 'N/A',
                        'locale_address' => $hospital->locale_address ?? 'N/A',
                    ]
                );
            $hospitals = [
                'data' => $allHospitals,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $hospitals = $hospitalQuery->latest()->paginate($perPage)->withQueryString();

            $hospitals->getCollection()->transform(fn($hospital) => [
                'id' => $hospital->id,
                'name' => $hospital->name,
                'locale_name' => $hospital->locale_name ?? 'N/A',
                'full_name' => $hospital->full_name ?? 'N/A',
                'locale_full_name' => $hospital->locale_full_name,
                'logo' => $hospital->logo_url,
                'moto' => $hospital->moto ?? 'N/A',
                'locale_moto' => $hospital->locale_moto ?? 'N/A',
                'address' => $hospital->address ?? 'N/A',
                'locale_address' => $hospital->locale_address ?? 'N/A',
            ]);
        }

        return $hospitals;
    }

    public function createHospital(Request $request): Hospital
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();

            $logoPath = null;
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('hospitals', 'public');
            }

            $hospital = Hospital::create([
                'name' => $data['name'],
                'locale_name' => $data['locale_name'],
                'full_name' => $data['full_name'],
                'locale_full_name' => $data['locale_full_name'],
                'logo' => $logoPath,
                'moto' => $data['moto'],
                'locale_moto' => $data['locale_moto'],
                'address' => $data['address'],
                'locale_address' => $data['locale_address'],
            ]);

            // phones
            $hospital->phones()->createMany($data['phones']);

            return $hospital;
        });
    }

    public function updateHospital(Request $request, Hospital $hospital): Hospital
    {
        return DB::transaction(function () use ($hospital, $request) {
            $logoPath = $hospital->logo;
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('hospitals', 'public');
            }

            $data = $request->validated();

            $hospital->name = $data['name'];
            $hospital->locale_name = $data['locale_name'];
            $hospital->full_name = $data['full_name'];
            $hospital->locale_full_name = $data['locale_full_name'];
            $hospital->logo = $logoPath;
            $hospital->moto = $data['moto'];
            $hospital->locale_moto = $data['locale_moto'];
            $hospital->address = $data['address'];
            $hospital->locale_address = $data['locale_address'];

            $hospital->update();

            // phones
            $hospital->phones()->delete();
            $hospital->phones()->createMany($request->validated('phones'));

            return $hospital;
        });
    }

    public function deleteHospital(Hospital $hospital): void
    {
        DB::transaction(function () use ($hospital) {
            $hospital->phones()->delete();
            $hospital->delete();
        });
    }
}