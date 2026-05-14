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
use App\Services\PatientService;

class PatientController extends Controller
{
    public function __construct(
        private readonly PatientService $patientService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $patients = $this->patientService->getPatientTableData($request);

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
            $this->patientService->createPatient($request->validated());

            return redirect()->route('patients.index')->with('success', 'Patient created successfully.');
        } catch (Exception $e) {
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
            $this->patientService->updatePatient($patient, $request->validated());

            return redirect()->route('patients.index')->with('success', 'Patient updated successfully.');

        } catch (Exception $e) {
            return redirect()->route('patients.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $patient)
    {
        try {
            $this->patientService->deletePatient($patient);
            
            return redirect()->route('patients.index')->with('deleted', 'Patient deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
