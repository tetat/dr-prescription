<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Permission;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $roleQuery = Role::query();
        $totalCount = $roleQuery->count();

        if ($request->filled('search')) {
            $search = $request->search;

            $roleQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}")
            );
        }

        if ($perPage === -1) {
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
            $roles = $roleQuery->latest()->paginate($perPage)->withQueryString();

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
        $permissions = Permission::all()
            ->groupBy('group')
            ->map(function ($group) {
                return $group->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'slug' => $permission->slug,
                    ];
                });
            });

        return inertia('roles/create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        try {
            $role = Role::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'guard_name' => $request->guard_name,
            ]);

            if ($request->has('permissions')) {
                $role->permissions()->sync($request->permissions);
            }

            if ($role) {
                return redirect()->route('roles.index')->with('success', 'Role created successfully.');
            }
            return redirect()->route('roles.index')->with('error', 'Unable to create role.');
        } catch (Exception $e) {
            return redirect()->route('roles.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return inertia('roles/show', [
            'role' => $role,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return inertia('roles/edit', [
            'role' => $role,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {
            if ($role) {
                $role->name = $request->name;
                $role->slug = Str::slug($request->name);
                $role->guard_name = $request->guard_name;

                $role->save();

                return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
            }

            return redirect()->route('roles.index')->with('error', 'Unable to update role.');
        } catch (Exception $e) {
            return redirect()->route('roles.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        try {
            if ($role) {
                $role->delete();
                
                return redirect()->route('roles.index')->with('deleted', 'Role deleted successfully.');
            }

            return redirect()->back()->with('error', 'Unable to delete role.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
