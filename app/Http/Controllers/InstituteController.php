<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreInstituteRequest;
use App\Http\Requests\UpdateInstituteRequest;
use App\Models\Institute;
use Illuminate\Support\Facades\DB;
use Exception;

class InstituteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $instituteQuery = Institute::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $instituteQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('abbreviation', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $instituteQuery->count();

        if ($perPage === -1) {
            $allInstitutes = $instituteQuery->latest()
                ->get()
                ->map(fn($institute) => [
                        'id' => $institute->id,
                        'name' => $institute->name,
                        'abbreviation' => $institute->abbreviation,
                    ]
                );
            $institutes = [
                'data' => $allInstitutes,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $institutes = $instituteQuery->latest()->paginate($perPage)->withQueryString();

            $institutes->getCollection()->transform(fn($institute) => [
                'id' => $institute->id,
                'name' => $institute->name,
                'abbreviation' => $institute->abbreviation,
            ]);
        }

        return inertia('institutes/index', [
            'institutes' => $institutes,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('institutes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInstituteRequest $request)
    {
        $validated = $request->validated();
        
        try {
            DB::beginTransaction();

            $institute = Institute::create([
                'name' => $validated['name'],
                'abbreviation' => $validated['abbreviation'],
            ]);

            if (!$institute) {
                throw new Exception('Unable to create institute.');
            }

            DB::commit();

            return redirect()->route('institutes.index')->with('success', 'Institute created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('institutes.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Institute $institute)
    {
        return inertia('institutes/show', [
            'institute' => $institute,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Institute $institute)
    {
        return inertia('institutes/edit', [
            'institute' => $institute,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInstituteRequest $request, Institute $institute)
    {
        try {
            DB::beginTransaction();

            $institute->update([
                'name' => $request->validated('name'),
                'abbreviation' => $request->validated('abbreviation'),
            ]);

            DB::commit();

            return redirect()->route('institutes.index')->with('success', 'Institute updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('institutes.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Institute $institute)
    {
        try {
            DB::beginTransaction();

            $institute->delete();

            DB::commit();

            return redirect()->route('institutes.index')->with('deleted', 'Institute deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('institutes.index')->with('error', $e->getMessage());
        }
    }
}
