<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PatientService
{
    public function getPatientQuery(): Builder
    {
        $userQuery = User::role('patient');

        return $userQuery;
    }

    public function getPatientTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $patientQuery = $this->getPatientQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $patientQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhereHas('phones', function ($q) use ($search) {
                        $q->where('number', 'like', "{$search}%");
                    })
            );
        }

        $totalCount = $patientQuery->count();

        if ($perPage === -1) {
            $allPatients = $patientQuery->latest()
                ->get()
                ->map(fn($patient) => [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'email' => $patient->email ?? 'N/A',
                        'gender' => ucfirst($patient->gender->value),
                        'age' => $patient->age,
                        'blood_group' => $patient->blood_group ?? 'N/A',
                        'address' => $patient->address ?? 'N/A',
                    ]
                );
            $patients = [
                'data' => $allPatients,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $patients = $patientQuery->latest()->paginate($perPage)->withQueryString();

            $patients->getCollection()->transform(fn($patient) => [
                'id' => $patient->id,
                'name' => $patient->name,
                'email' => $patient->email ?? 'N/A',
                'gender' => ucfirst($patient->gender->value),
                'age' => $patient->age,
                'blood_group' => $patient->blood_group ?? 'N/A',
                'address' => $patient->address ?? 'N/A',
            ]);
        }

        return $patients;
    }

    public function createPatient(array $data)
    {
        return DB::transaction(function () use ($data) {

            $patient = User::create([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'dob' => $data['dob'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
                'password' => '12345687',
            ]);

            $patient->assignRole(['patient']);

            $patient->phones()->createMany($data['phones']);

            return $patient;
        });
    }

    public function updatePatient(User $patient, array $data)
    {
        DB::transaction(function () use ($patient, $data) {
            $patient->update([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'dob' => $data['dob'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
            ]);

            $patient->phones()->delete();
            $patient->phones()->createMany($data['phones']);

            return $patient;
        });
    }

    public function deletePatient(User $patient)
    {
        DB::transaction(function () use ($patient) {
            $patient->phones()->delete();
            $patient->delete();
        });
    }
}