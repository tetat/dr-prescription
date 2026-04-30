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
        $patientQuery = User::query();
        $totalCount = $patientQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $patientQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('blood_group', 'like', "%{$search}")
            );
        }

        if ($perPage === -1) {
            $allPatients = $patientQuery->latest()
                ->get()
                ->map(fn($patient) => [
                        'id' => $patient->id,
                        'name' => $patient->name,
                        'email' => $patient->email ?? 'Not Given',
                        'gender' => $patient->gender,
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
                'gender' => $patient->gender,
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

            $patientRole = Role::where('slug', 'patient')->firstOrFail();

            DB::beginTransaction();

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'dob' => $data['dob'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
                'password' => $data['name'],
            ]);

            $user->assignRole($patientRole);

            if (!empty($data['phones'])) {
                foreach ($data['phones'] as $phone) {
                    $user->phones()->create([
                        'country_code' => $phone['country_code'],
                        'number' => $phone['number'],
                    ]);
                }
            }

            if ($user) {
                DB::commit();
                return redirect()
                    ->route('patients.index')
                    ->with('success', 'Patient created successfully.');
            }

            DB::rollBack();
            return redirect()->route('patients.index')->with('error', 'Unable to create Patient.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('patients.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('phones');

        return inertia('patients/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('phones');

        return inertia('patients/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
