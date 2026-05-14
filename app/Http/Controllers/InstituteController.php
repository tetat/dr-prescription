<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreInstituteRequest;
use App\Http\Requests\UpdateInstituteRequest;
use App\Models\Institute;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Services\InstituteService;

class InstituteController extends Controller
{
    public function __construct(
        private InstituteService $instituteService
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $institutes = $this->instituteService->getInstituteTableData($request);

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
        try {
            $this->instituteService->createInstitute($request->validated());

            return redirect()->route('institutes.index')->with('success', 'Institute created successfully.');
        } catch (Exception $e) {
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
            $this->instituteService->updateInstitute($request->validated(), $institute);

            return redirect()->route('institutes.index')->with('success', 'Institute updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('institutes.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Institute $institute)
    {
        try {
            $this->instituteService->deleteInstitute($institute);

            return redirect()->route('institutes.index')->with('deleted', 'Institute deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('institutes.index')->with('error', $e->getMessage());
        }
    }
}
