<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use App\Http\Requests\StorePrescriptionRequest;
use App\Http\Requests\UpdatePrescriptionRequest;
use App\Services\PrescriptionService;
use App\Services\SelectService;
use Exception;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function __construct(
        private PrescriptionService $prescriptionService, 
        private SelectService $selectService,
    ){}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $prescriptions = $this->prescriptionService->getPrescriptionTableData($request);

        return inertia('prescriptions/index', [
            'prescriptions' => $prescriptions,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $doctors = $this->selectService->getDoctors();
        $patients = $this->selectService->getPatients();
        $hospitals = $this->selectService->getHospitals();
        $medicines = $this->selectService->getMedicines();
        $tests = $this->selectService->getTests();
        $examinations = $this->selectService->getExaminations();

        return inertia('prescriptions/create', [
            'doctors' => $doctors,
            'patients' => $patients,
            'hospitals' => $hospitals,
            'medicines' => $medicines,
            'tests' => $tests,
            'examinations' => $examinations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrescriptionRequest $request)
    {
        try {
            $this->prescriptionService->createPrescription($request->validated());

            return redirect()->route('prescriptions.index')->with('success', 'Prescription created successfully.');
        } catch (Exception $e) {
            return redirect()->route('prescriptions.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Prescription $prescription)
    {
        $prescription->load(['doctor', 'patient', 'hospital', 'medicines', 'tests', 'examinations']);

        return inertia('prescriptions/show', [
            'prescription' => $prescription,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Prescription $prescription)
    {
        $doctors = $this->selectService->getDoctors();
        $patients = $this->selectService->getPatients();
        $hospitals = $this->selectService->getHospitals();
        $medicines = $this->selectService->getMedicines();
        $tests = $this->selectService->getTests();
        $examinations = $this->selectService->getExaminations();
        $prescription->load(['doctor', 'patient', 'hospital', 'medicines', 'tests', 'examinations']);

        return inertia('prescriptions/edit', [
            'prescription' => $prescription,
            'doctors' => $doctors,
            'patients' => $patients,
            'hospitals' => $hospitals,
            'medicines' => $medicines,
            'tests' => $tests,
            'examinations' => $examinations,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrescriptionRequest $request, Prescription $prescription)
    {
        try {
            $this->prescriptionService->updatePrescription($prescription, $request->validated());

            return redirect()->route('prescriptions.index')->with('success', 'Prescription updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('prescriptions.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prescription $prescription)
    {
        try {
            $this->prescriptionService->deletePrescription($prescription);

            return redirect()->route('prescriptions.index')->with('deleted', 'Prescription deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('prescriptions.index')->with('error', $e->getMessage());
        }
    }
}
