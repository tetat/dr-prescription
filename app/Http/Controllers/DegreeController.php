<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use App\Http\Requests\StoreDegreeRequest;
use App\Http\Requests\UpdateDegreeRequest;
use Illuminate\Http\Request;

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
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('institute', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $degreeQuery->count();

        if ($perPage === -1) {
            $allDegrees = $degreeQuery->latest()
                ->get()
                ->map(fn($degree) => [
                        'id' => $degree->id,
                        'title' => $degree->title,
                        'institute' => $degree->institute,
                        'passing_year' => $degree->passing_year ?? 'Not Given',
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
                'title' => $degree->title,
                'institute' => $degree->institute,
                'passing_year' => $degree->passing_year ?? 'Not Given',
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDegreeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Degree $degree)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Degree $degree)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDegreeRequest $request, Degree $degree)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Degree $degree)
    {
        //
    }
}
