<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Http\Requests\StoreTestRequest;
use App\Http\Requests\UpdateTestRequest;
use Illuminate\Http\Request;
use Exception;
use App\Services\TestService;

class TestController extends Controller
{
    public function __construct(
        private TestService $testService
    ) {}
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tests = $this->testService->getTestTableData($request);

        return inertia('tests/index', [
            'tests' => $tests,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('tests/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTestRequest $request)
    {
        try {
            $this->testService->createTest($request->validated());

            return redirect()->route('tests.index')->with('success', 'Test created successfully.');
        } catch (Exception $e) {
            return redirect()->route('tests.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Test $test)
    {
        return inertia('tests/show', [
            'test' => $test,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Test $test)
    {
        return inertia('tests/edit', [
            'test' => $test,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTestRequest $request, Test $test)
    {
        try {
            $this->testService->updateTest($request->validated(), $test);

            return redirect()->route('tests.index')->with('success', 'Test updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('tests.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Test $test)
    {
        try {
            $this->testService->deleteTest($test);

            return redirect()->route('tests.index')->with('deleted', 'Test deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('tests.index')->with('error', $e->getMessage());
        }
    }
}
