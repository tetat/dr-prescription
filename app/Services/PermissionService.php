<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Permission;

class PermissionService
{
    public function getPermissionsTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $permissionQuery = Permission::query();

        if ($request->filled('search')) {
            $search = $request->search;

            $permissionQuery->where(fn($query) => $query->where('label', 'like', "%{$search}%"))
                ->orWhere('name', 'like', "%{$search}%")
                ->orWhere('group', 'like', "%{$search}%");
        }
        
        $totalCount = $permissionQuery->count();
        
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

        return $permissions;
    }

    public function getGroupedPermissions()
    {
        return Permission::all()
            ->groupBy('group')
            ->map(function ($group) {
                return $group->map(function ($permission) {
                    return [
                        'id' => $permission->id,
                        'label' => $permission->label,
                        'name' => $permission->name,
                    ];
                });
            });
    }
}
