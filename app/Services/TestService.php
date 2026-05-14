<?php

namespace App\Services;

use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class TestService
{
    public function getTestQuery(): Builder
    {
        return Test::query();
    }

    public function getTestTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $testQuery = $this->getTestQuery();

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

        return $tests;
    }

    public function createTest(array $data): Test
    {
        return DB::transaction(function() use ($data) {
            $test = Test::create([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            return $test;
        });
    }

    public function updateTest(array $data, Test $test): Test
    {
        return DB::transaction(function() use ($data, $test) {
            $test->update([
                'name' => $data['name'],
                'description' => $data['description'],
            ]);

            return $test;
        });
    }

    public function deleteTest(Test $test): void
    {
        DB::transaction(function() use ($test) {
            $test->delete();
        });
    }
}