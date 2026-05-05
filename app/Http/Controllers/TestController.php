<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Http\Requests\StoreTestRequest;
use App\Http\Requests\UpdateTestRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $testQuery = Test::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $testQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $testQuery->count();

        if ($perPage === -1) {
            $allTests = $testQuery->latest()
                ->get()
                ->map(fn($test) => [
                        'id' => $test->id,
                        'name' => $test->name,
                        'description' => $test->description ?? 'Not Given',
                    ]
                );
            $tests = [
                'data' => $allTests,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $tests = $testQuery->latest()->paginate($perPage)->withQueryString();

            $tests->getCollection()->transform(fn($test) => [
                'id' => $test->id,
                'name' => $test->name,
                'description' => $test->description ?? 'Not Given',
            ]);
        }

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
        $validated = $request->validated();
        
        try {
            DB::beginTransaction();

            $test = Test::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
            ]);

            if (!$test) {
                throw new Exception('Unable to create test.');
            }

            DB::commit();

            return redirect()->route('tests.index')->with('success', 'Test created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
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
            DB::beginTransaction();

            $test->update([
                'name' => $request->validated('name'),
                'description' => $request->validated('description'),
            ]);

            DB::commit();

            return redirect()->route('tests.index')->with('success', 'Test updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('tests.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Test $test)
    {
        try {
            DB::beginTransaction();

            $test->delete();

            DB::commit();

            return redirect()->route('tests.index')->with('deleted', 'Test deleted successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('tests.index')->with('error', $e->getMessage());
        }
    }
}
