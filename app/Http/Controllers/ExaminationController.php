<?php

namespace App\Http\Controllers;

use App\Models\Examination;
use App\Http\Requests\StoreExaminationRequest;
use App\Http\Requests\UpdateExaminationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class ExaminationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $examinationQuery = Examination::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $examinationQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $examinationQuery->count();

        if ($perPage === -1) {
            $allExaminations = $examinationQuery->latest()
                ->get()
                ->map(fn($examination) => [
                        'id' => $examination->id,
                        'name' => $examination->name,
                        'abbreviation' => $examination->abbreviation ?? 'Not Given',
                        'unit' => $examination->unit ?? 'Not Given',
                    ]
                );
            $examinations = [
                'data' => $allExaminations,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $examinations = $examinationQuery->latest()->paginate($perPage)->withQueryString();

            $examinations->getCollection()->transform(fn($examination) => [
                'id' => $examination->id,
                'name' => $examination->name,
                'abbreviation' => $examination->abbreviation ?? 'Not Given',
                'unit' => $examination->unit ?? 'Not Given',
            ]);
        }

        return inertia('examinations/index', [
            'examinations' => $examinations,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('examinations/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExaminationRequest $request)
    {
        $validated = $request->validated();
        
        try {
            DB::beginTransaction();

            $examination = Examination::create([
                'name' => $validated['name'],
                'abbreviation' => $validated['abbreviation'],
                'unit' => $validated['unit'],
            ]);

            if (!$examination) {
                throw new Exception('Unable to create examination.');
            }

            DB::commit();

            return redirect()->route('examinations.index')->with('success', 'Examination created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('examinations.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Examination $examination)
    {
        return inertia('examinations/show', [
            'examination' => $examination,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Examination $examination)
    {
        return inertia('examinations/edit', [
            'examination' => $examination,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExaminationRequest $request, Examination $examination)
    {
        try {
            DB::beginTransaction();

            $examination->update([
                'name' => $request->validated('name'),
                'abbreviation' => $request->validated('abbreviation'),
                'unit' => $request->validated('unit'),
            ]);

            DB::commit();

            return redirect()->route('examinations.index')->with('success', 'Examination updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('examinations.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Examination $examination)
    {
        try {
            DB::beginTransaction();

            $examination->delete();

            DB::commit();

            return redirect()->route('examinations.index')->with('deleted', 'Examination deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('examinations.index')->with('error', $e->getMessage());
        }
    }
}
