<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $per_page = (int) ($request->per_page ?? "10");
        $roleQuery = Role::query();
        $totalCount = $roleQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $roleQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}")
            );
        }

        if ($per_page === -1) {
            $allRoles = $roleQuery->latest()
                ->get()
                ->map(fn($role) => [
                        'id' => $role->id,
                        'name' => $role->name,
                        'slug' => $role->slug,
                        'guard_name' => $role->guard_name,
                    ]
                );
            $roles = [
                'data' => $allRoles,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $roles = $roleQuery->latest()->paginate($per_page)->withQueryString();

            $roles->getCollection()->transform(fn($role) => [
                'id' => $role->id,
                'name' => $role->name,
                'slug' => $role->slug,
                'guard_name' => $role->guard_name,
            ]);
        }

        return inertia('roles/index', [
            'roles' => $roles,
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
    public function store(StoreRoleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }
}
