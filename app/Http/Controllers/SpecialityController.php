<?php

namespace App\Http\Controllers;

use App\Models\Speciality;
use App\Http\Requests\StoreSpecialityRequest;
use App\Http\Requests\UpdateSpecialityRequest;
use Exception;
use Illuminate\Http\Request;
use App\Services\SpecialityService;

class SpecialityController extends Controller
{
    public function __construct(
        private readonly SpecialityService $specialityService
    ) {}
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $specialities = $this->specialityService->getSpecialityTableData($request);

        return inertia('specialities/index', [
            'specialities' => $specialities,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('specialities/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpecialityRequest $request)
    {
        try {
            $this->specialityService->createSpeciality($request->validated());

            return redirect()->route('specialities.index')->with('success', 'Speciality created successfully.');
        } catch (Exception $e) {
            return redirect()->route('specialities.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Speciality $speciality)
    {
        return inertia('specialities/show', [
            'speciality' => $speciality,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Speciality $speciality)
    {
        return inertia('specialities/edit', [
            'speciality' => $speciality,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSpecialityRequest $request, Speciality $speciality)
    {
        try {
            $this->specialityService->updateSpeciality($request->validated(), $speciality);

            return redirect()->route('specialities.index')->with('success', 'Speciality updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('specialities.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Speciality $speciality)
    {
        try {
            $this->specialityService->deleteSpeciality($speciality);

            return redirect()->route('specialities.index')->with('deleted', 'Speciality deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('specialities.index')->with('error', $e->getMessage());
        }
    }
}
