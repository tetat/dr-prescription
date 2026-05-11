<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class RoleService
{
    public function getRoleQuery(): Builder
    {
        $roleQuery = Role::query();
        $authUser = auth()->user();

        if ($authUser->hasRole('admin')) {
            $roleQuery->whereNotIn('name', ['super-admin']);
        } elseif ($authUser->hasRole('doctor')) {
            $roleQuery->whereNotIn('name', [
                'super-admin',
                'admin',
            ]);
        } elseif (!$authUser->hasRole('super-admin')) {
            $roleQuery->whereNotIn('name', [
                'super-admin',
                'admin',
                'doctor',
            ]);
        }

        return $roleQuery;
    }

    public function getAllRoles(): Collection
    {
        return $this->getRoleQuery()
            ->get()
            ->map(fn($role) => [
                'id' => $role->id,
                'name' => $role->name,
                'label' => $role->label,
            ]);
    }

    public function getRolesTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $roleQuery = $this->getRoleQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $roleQuery->where(fn($query) => 
                $query->where('label', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
            );
        }
        
        $totalCount = $roleQuery->count();

        if ($perPage === -1) {
            $allRoles = $roleQuery->latest()
                ->get()
                ->map(fn($role) => [
                        'id' => $role->id,
                        'label' => $role->label,
                        'name' => $role->name,
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
                'label' => $role->label,
                'name' => $role->name,
                'guard_name' => $role->guard_name,
            ]);
        }

        return $roles;
    }
}