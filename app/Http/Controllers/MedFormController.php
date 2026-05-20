<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMedFormRequest;
use App\Http\Requests\UpdateMedFormRequest;
use App\Models\MedForm;
use App\Services\MedFormService;
use Exception;
use Illuminate\Http\Request;

class MedFormController extends Controller
{
    public function __construct(private MedFormService $medFormService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $medForms = $this->medFormService->getMedFormTableData($request);

        return inertia('med-forms/index', [
            'medForms' => $medForms,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('med-forms/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMedFormRequest $request)
    {
        try {
            $this->medFormService->createMedForm($request->validated());

            return redirect()->route('med-forms.index')->with('success', 'Medicine form created successfully.');
        } catch (Exception $e) {
            return redirect()->route('med-forms.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MedForm $medForm)
    {
        return inertia('med-forms/show',  [
            'medForm' => $medForm,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedForm $medForm)
    {
        return inertia('med-forms/edit',  [
            'medForm' => $medForm,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMedFormRequest $request, MedForm $medForm)
    {
        try {
            $this->medFormService->updateMedForm($request->validated(), $medForm);

            return redirect()->route('med-forms.index')->with('success', 'Medicine form updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('med-forms.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedForm $medForm)
    {
        try {
            $this->medFormService->deleteMedForm($medForm);

            return redirect()->route('med-forms.index')->with('deleted', 'Medicine form deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('med-forms.index')->with('error', $e->getMessage());
        }
    }
}
