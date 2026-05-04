<?php

namespace App\Http\Controllers;

use App\Models\Speciality;
use App\Http\Requests\StoreSpecialityRequest;
use App\Http\Requests\UpdateSpecialityRequest;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Http\Request;

class SpecialityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $specialityQuery = Speciality::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $specialityQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('abbreviation', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $specialityQuery->count();

        if ($perPage === -1) {
            $allSpecialities = $specialityQuery->latest()
                ->get()
                ->map(fn($speciality) => [
                        'id' => $speciality->id,
                        'name' => $speciality->name,
                        'abbreviation' => $speciality->abbreviation ?? 'Not Given',
                    ]
                );
            $specialities = [
                'data' => $allSpecialities,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $specialities = $specialityQuery->latest()->paginate($perPage)->withQueryString();

            $specialities->getCollection()->transform(fn($speciality) => [
                'id' => $speciality->id,
                'name' => $speciality->name,
                'abbreviation' => $speciality->abbreviation ?? 'Not Given',
            ]);
        }

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
        $validated = $request->validated();
        
        try {
            DB::beginTransaction();

            $speciality = Speciality::create([
                'name' => $validated['name'],
                'abbreviation' => $validated['abbreviation'],
            ]);

            if (!$speciality) {
                throw new Exception('Unable to create speciality.');
            }

            DB::commit();

            return redirect()->route('specialities.index')->with('success', 'Speciality created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
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
            DB::beginTransaction();

            $speciality->update([
                'name' => $request->validated('name'),
                'abbreviation' => $request->validated('abbreviation'),
            ]);

            DB::commit();

            return redirect()->route('specialities.index')->with('success', 'Speciality updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('specialities.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Speciality $speciality)
    {
        try {
            DB::beginTransaction();

            $speciality->delete();

            DB::commit();

            return redirect()->route('specialities.index')->with('deleted', 'Speciality deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('specialities.index')->with('error', $e->getMessage());
        }
    }
}
