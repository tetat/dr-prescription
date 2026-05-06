<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use App\Http\Requests\StoreHospitalRequest;
use App\Http\Requests\UpdateHospitalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class HospitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $hospitalQuery = Hospital::query();

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
                        'full_name' => $hospital->full_name ?? 'Not Given',
                        'logo' => $hospital->logo_url,
                        'moto' => $hospital->moto ?? 'Not Given',
                        'address' => $hospital->address ?? 'Not Given',
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
                'full_name' => $hospital->full_name ?? 'Not Given',
                'logo' => $hospital->logo_url,
                'moto' => $hospital->moto ?? 'Not Given',
                'address' => $hospital->address ?? 'Not Given',
            ]);
        }

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
        $validated = $request->validated();
        
        try {
            DB::beginTransaction();

            $logoPath = null;
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('hospitals', 'public');
            }

            $hospital = Hospital::create([
                'name' => $validated['name'],
                'full_name' => $validated['full_name'],
                'logo' => $logoPath,
                'moto' => $validated['moto'],
                'address' => $validated['address'],
            ]);

            if (!$hospital) {
                throw new Exception('Unable to create hospital.');
            }

            DB::commit();

            return redirect()->route('hospitals.index')->with('success', 'Hospital created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('hospitals.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Hospital $hospital)
    {
        $hospital->logo = $hospital->logo_url;

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
            DB::beginTransaction();

            $logoPath = $hospital->logo;
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('hospitals', 'public');
            }

            $hospital->update([
                'name' => $request->validated('name'),
                'full_name' => $request->validated('full_name'),
                'logo' => $logoPath,
                'moto' => $request->validated('moto'),
                'address' => $request->validated('address'),
            ]);

            DB::commit();

            return redirect()->route('hospitals.index')->with('success', 'Hospital updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('hospitals.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hospital $hospital)
    {
        try {
            DB::beginTransaction();

            $hospital->delete();

            DB::commit();

            return redirect()->route('hospitals.index')->with('deleted', 'Hospital deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('hospitals.index')->with('error', $e->getMessage());
        }
    }
}
