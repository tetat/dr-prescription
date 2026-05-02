<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $permissionQuery = Permission::query();
        $totalCount = $permissionQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $permissionQuery->where(fn($query) => $query->where('label', 'like', "%{$search}%"))
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('group', 'like', "%{$search}%");
        }
        
        if ($perPage === -1) {
            $allPermissions = $permissionQuery->latest()
                ->get()
                ->map(fn($permission) => [
                    'id' => $permission->id,
                    'label' => $permission->label,
                    'name' => $permission->name,
                    'group' => $permission->group,
                    'guard_name' => $permission->guard_name,
                ]);
            $permissions = [
                'data' => $allPermissions,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $permissions = $permissionQuery->latest()->paginate($perPage)->withQueryString();

            $permissions->getCollection()->transform(fn($permission) => [
                'id' => $permission->id,
                'label' => $permission->label,
                'name' => $permission->name,
                'group' => $permission->group,
                'guard_name' => $permission->guard_name,
            ]);
        }
        
        return inertia('permissions/index', [
            'permissions' => $permissions,
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        //
    }
}
