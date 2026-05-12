<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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

    public function createRole(array $data): Role
    {
        return DB::transaction(function () use ($data) {

            $role = Role::create([
                'label' => $data['label'],
                'name' => Str::slug($data['label']),
                'guard_name' => $data['guard_name'] ?? 'web',
            ]);

            if (!empty($data['permissions'])) {
                $role->permissions()->sync($data['permissions']);
            }

            return $role;
        });
    }

    public function updateRole(Role $role, array $data): Role
    {
        return DB::transaction(function () use ($role, $data) {

            $role->update([
                'label' => $data['label'],
                'name' => Str::slug($data['label']),
                'guard_name' => $data['guard_name'] ?? 'web',
            ]);

            $role->permissions()->sync($data['permissions'] ?? []);

            return $role;
        });
    }

    public function deleteRole(Role $role): void
    {
        DB::transaction(function () use ($role) {
            $role->permissions()->detach();
            $role->delete();
        });
    }
}