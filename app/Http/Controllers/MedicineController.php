<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use App\Http\Requests\StoreMedicineRequest;
use App\Http\Requests\UpdateMedicineRequest;
use App\Services\MedicineService;
use App\Services\MedicineGroupService;
use Illuminate\Http\Request;
use Exception;

class MedicineController extends Controller
{
    public function __construct(
        private MedicineService $medicineService,
        private MedicineGroupService $medicineGroupService,
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $medicines = $this->medicineService->getMedicineTableData($request);
        
        return inertia('medicines/index', [
            'medicines' => $medicines,
            'filters' => $request->only('perPage', 'search')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $medicineGroups = $this->medicineGroupService->getAllMedicineGroups();

        return inertia('medicines/create', [
            'medicineGroups' => $medicineGroups,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicineRequest $request)
    {
        try {
            $this->medicineService->createMedicine($request->validated());

            return redirect()->route('medicines.index')->with('success', 'Medicine created successfully.');
        } catch (Exception $e) {
            dd($e->getMessage());
            return redirect()->route('medicines.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicine $medicine)
    {
        $medicine->load('group');

        return inertia('medicines/show', [
            'medicine' => $medicine,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medicine $medicine)
    {
        $medicine->load('group');
        $medicineGroups = $this->medicineGroupService->getAllMedicineGroups();

        return inertia('medicines/edit', [
            'medicine' => $medicine,
            'medicineGroups' => $medicineGroups,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicineRequest $request, Medicine $medicine)
    {
        try {
            $this->medicineService->updateMedicine($request->validated(), $medicine);

            return redirect()->route('medicines.index')->with('success', 'Medicine updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('medicines.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicine $medicine)
    {
        try {
            $this->medicineService->deleteMedicine($medicine);

            return redirect()->route('medicines.index')->with('deleted', 'Medicine deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('medicines.index')->with('error', $e->getMessage());
        }
    }
}
