<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use App\Http\Requests\StoreHospitalRequest;
use App\Http\Requests\UpdateHospitalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Services\HospitalService;

class HospitalController extends Controller
{
    public function __construct(
        private HospitalService $hospitalService
    ){}
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $hospitals = $this->hospitalService->getHospitalTableData($request);

        return inertia('hospitals/index', [
            'hospitals' => $hospitals,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('hospitals/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHospitalRequest $request)
    {        
        try {
            $this->hospitalService->createHospital($request);

            return redirect()->route('hospitals.index')->with('success', 'Hospital created successfully.');
        } catch (Exception $e) {
            return redirect()->route('hospitals.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Hospital $hospital)
    {
        $hospital->logo = $hospital->logo_url;
        $hospital->load('phones');

        return inertia('hospitals/show', [
            'hospital' => $hospital,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hospital $hospital)
    {
        $hospital->logo_url = $hospital->logo_url;
        $hospital->load('phones');

        return inertia('hospitals/edit', [
            'hospital' => $hospital,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHospitalRequest $request, Hospital $hospital)
    {
        try {
            $this->hospitalService->updateHospital($request, $hospital);

            return redirect()->route('hospitals.index')->with('success', 'Hospital updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('hospitals.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hospital $hospital)
    {
        try {
            $this->hospitalService->deleteHospital($hospital);

            return redirect()->route('hospitals.index')->with('deleted', 'Hospital deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('hospitals.index')->with('error', $e->getMessage());
        }
    }
}
