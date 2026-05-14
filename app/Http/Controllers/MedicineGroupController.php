<?php

namespace App\Http\Controllers;

use App\Models\MedicineGroup;
use App\Http\Requests\StoreMedicineGroupRequest;
use App\Http\Requests\UpdateMedicineGroupRequest;
use App\Services\MedicineGroupService;
use Illuminate\Http\Request;
use Exception;

class MedicineGroupController extends Controller
{
    public function __construct(private MedicineGroupService $medicineGroupService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $medicineGroups = $this->medicineGroupService->getMedicineGroupTableData($request);

        return inertia('medicine-groups/index', [
            'medicineGroups' => $medicineGroups,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('medicine-groups/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedicineGroupRequest $request)
    {
        try {
            $this->medicineGroupService->createMedicineGroup($request->validated());

            return redirect()->route('medicine-groups.index')
                ->with('success', 'Medicine Group created successfully');
        } catch (Exception $e) {
            return redirect()->route('medicine-groups.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicineGroup $medicineGroup)
    {
        return inertia('medicine-groups/show', [
            'medicineGroup' => $medicineGroup,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedicineGroup $medicineGroup)
    {
        return inertia('medicine-groups/edit', [
            'medicineGroup' => $medicineGroup,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedicineGroupRequest $request, MedicineGroup $medicineGroup)
    {
        try {
            $this->medicineGroupService->updateMedicineGroup($request->validated(), $medicineGroup);

            return redirect()->route('medicine-groups.index')
                ->with('success', 'Medicine Group updated successfully');
        } catch (Exception $e) {
            return redirect()->route('medicine-groups.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicineGroup $medicineGroup)
    {
        try {
            $this->medicineGroupService->deleteMedicineGroup($medicineGroup);

            return redirect()->route('medicine-groups.index')
                ->with('deleted', 'Medicine Group deleted successfully');
        } catch (Exception $e) {
            return redirect()->route('medicine-groups.index')->with('error', $e->getMessage());
        }
    }
}
