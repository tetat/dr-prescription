<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $patientQuery = User::role('patient');

        if ($request->filled('search')) {
            $search = $request->search;

            $patientQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('blood_group', 'like', "%{$search}")
            );
        }
        $totalCount = $patientQuery->count();

        if ($perPage === -1) {
            $allPatients = $patientQuery->latest()
                ->get()
                ->map(fn($patient) => [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'email' => $patient->email ?? 'Not Given',
                        'gender' => ucfirst($patient->gender->value),
                        'age' => $patient->age,
                        'blood_group' => $patient->blood_group ?? 'Not Given',
                        'address' => $patient->address ?? 'Not Given',
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
                'email' => $patient->email ?? 'Not Given',
                'gender' => ucfirst($patient->gender->value),
                'age' => $patient->age,
                'blood_group' => $patient->blood_group ?? 'Not Given',
                'address' => $patient->address ?? 'Not Given',
            ]);
        }

        return inertia('patients/index', [
            'patients' => $patients,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return inertia('patients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        try {
            $data = $request->validated();

            $patientRole = Role::where('name', 'patient')->firstOrFail();

            DB::beginTransaction();

            $patient = User::create([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'dob' => $data['dob'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
                'password' => $data['name'],
            ]);

            $patient->assignRole($patientRole);

            if (!empty($data['phones'])) {
                $patient->phones()->createMany($data['phones']);
            }

            if ($patient) {
                DB::commit();
                return redirect()
                    ->route('patients.index')
                    ->with('success', 'Patient created successfully.');
            }

            throw new Exception('Unable to create patient.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('patients.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $patient)
    {
        $patient->load('phones');

        return inertia('patients/show', [
            'patient' => $patient,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $patient)
    {
        $patient->load('phones');

        return inertia('patients/edit', [
            'patient' => $patient,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, User $patient)
    {
        try {
            $data = $request->validated();

            DB::transaction(function () use ($patient, $data) {

                // update patient
                $patient->update([
                    'name' => $data['name'],
                    'email' => $data['email'] ?? null,
                    'gender' => $data['gender'],
                    'dob' => $data['dob'],
                    'blood_group' => $data['blood_group'] ?? null,
                    'address' => $data['address'] ?? null,
                ]);

                // replace phones
                $patient->phones()->delete();

                $patient->phones()->createMany($data['phones']);
            });

            return redirect()
                ->route('patients.index')
                ->with('success', 'Patient updated successfully.');

        } catch (Exception $e) {
            return redirect()
                ->route('patients.index')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $patient)
    {
        try {
            if ($patient) {
                $patient->phones()->delete();
                $patient->delete();
                
                return redirect()->route('patients.index')->with('deleted', 'Patient deleted successfully.');
            }

            throw new Exception('Unable to delete patient.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
