<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use App\Http\Requests\StoreDegreeRequest;
use App\Http\Requests\UpdateDegreeRequest;
use Illuminate\Http\Request;
use Exception;
use App\Services\DegreeService;

class DegreeController extends Controller
{
    public function __construct(
        private readonly DegreeService $degreeService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $degrees = $this->degreeService->getDegreeTableData($request);

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
        try {
            $this->degreeService->createDegree($request->validated());

            return redirect()->route('degrees.index')->with('success', 'Degree created successfully.');
        } catch (Exception $e) {
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
            $this->degreeService->updateDegree($degree, $request->validated());

            return redirect()->route('degrees.index')->with('success', 'Degree updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('degrees.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Degree $degree)
    {
        try {
            $this->degreeService->deleteDegree($degree);

            return redirect()->route('degrees.index')->with('deleted', 'Degree deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('degrees.index')->with('error', $e->getMessage());
        }
    }
}
