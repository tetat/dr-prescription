<?php

namespace App\Http\Controllers;

use App\Models\Examination;
use App\Http\Requests\StoreExaminationRequest;
use App\Http\Requests\UpdateExaminationRequest;
use App\Services\ExaminationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class ExaminationController extends Controller
{
    public function __construct(
        private ExaminationService $examinationService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $examinations = $this->examinationService->getExaminationTableData($request);

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
        try {
            $this->examinationService->createExamination($request->validated());

            return redirect()->route('examinations.index')->with('success', 'Examination created successfully.');
        } catch (Exception $e) {
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
