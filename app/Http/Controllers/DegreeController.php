<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use App\Http\Requests\StoreDegreeRequest;
use App\Http\Requests\UpdateDegreeRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class DegreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $degreeQuery = Degree::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $degreeQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('abbreviation', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $degreeQuery->count();

        if ($perPage === -1) {
            $allDegrees = $degreeQuery->latest()
                ->get()
                ->map(fn($degree) => [
                        'id' => $degree->id,
                        'name' => $degree->name,
                        'abbreviation' => $degree->abbreviation,
                    ]
                );
            $degrees = [
                'data' => $allDegrees,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $degrees = $degreeQuery->latest()->paginate($perPage)->withQueryString();

            $degrees->getCollection()->transform(fn($degree) => [
                'id' => $degree->id,
                'name' => $degree->name,
                'abbreviation' => $degree->abbreviation,
            ]);
        }

        return inertia('degrees/index', [
            'degrees' => $degrees,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('degrees/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDegreeRequest $request)
    {
        $validated = $request->validated();
        
        try {
            DB::beginTransaction();

            $degree = Degree::create([
                'name' => $validated['name'],
                'abbreviation' => $validated['abbreviation'],
            ]);

            if (!$degree) {
                throw new Exception('Unable to create degree.');
            }

            DB::commit();

            return redirect()->route('degrees.index')->with('success', 'Degree created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('degrees.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Degree $degree)
    {
        return inertia('degrees/show', [
            'degree' => $degree,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Degree $degree)
    {
        return inertia('degrees/edit', [
            'degree' => $degree,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDegreeRequest $request, Degree $degree)
    {
        try {
            DB::beginTransaction();

            $degree->update([
                'name' => $request->validated('name'),
                'abbreviation' => $request->validated('abbreviation'),
            ]);

            DB::commit();

            return redirect()->route('degrees.index')->with('success', 'Degree updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('degrees.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Degree $degree)
    {
        try {
            DB::beginTransaction();

            $degree->delete();

            DB::commit();

            return redirect()->route('degrees.index')->with('deleted', 'Degree deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('degrees.index')->with('error', $e->getMessage());
        }
    }
}
