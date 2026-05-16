<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class UserService
{
    public function __construct(
        private RoleService $roleService
    ) {}

    public function getUserQuery(): Builder
    {
        $userQuery = User::with('roles');
        $authUser = auth()->user();

        if ($authUser->hasRole('super-admin')) {
            $userQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['doctor', 'patient']);
            });
        } else if ($authUser->hasRole('admin')) {
            $userQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin', 'doctor', 'patient']);
            });
        } else if ($authUser->hasRole('doctor')) {
            $userQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin', 'admin', 'doctor', 'patient']);
            });
        } else {
            $userQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin', 'admin', 'doctor', 'patient']);
            });
        }

        return $userQuery;
    }

    public function getUsersTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $userQuery = $this->getUserQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $userQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
            );
        }

        $totalCount = $userQuery->count();

        if ($perPage === -1) {
            $allUsers = $userQuery->latest()
                ->get()
                ->map(fn($user) => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'roles' => $user->roles->pluck('label')->toArray(),
                        'gender' => ucfirst($user->gender->value),
                        'blood_group' => $user->blood_group ?? 'N/A',
                        'address' => $user->address ?? 'N/A',
                    ]
                );
            $users = [
                'data' => $allUsers,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $users = $userQuery->latest()->paginate($perPage)->withQueryString();

            $users->getCollection()->transform(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('label')->toArray(),
                'gender' => ucfirst($user->gender->value),
                'blood_group' => $user->blood_group ?? 'N/A',
                'address' => $user->address ?? 'N/A',
            ]);
        }

        return $users;
    }

    public function getFilteredRoles(): Collection
    {
        return $this->roleService
            ->getAllRoles()
            ->whereNotIn('name', ['doctor', 'patient'])
            ->values();
    }

    public function createUser(array $data): User
    {
        return DB::transaction(function () use ($data) {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
                'password' => bcrypt($data['name']),
            ]);

            $user->assignRole($data['role_name']);

            $user->phones()->createMany($data['phones']);

            return $user;
        });
    }

    public function updateUser(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {

            $user->update([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
            ]);

            $currentRole = $user->roles()
                ->whereNotIn('name', ['doctor'])
                ->first();

            if ($currentRole && $currentRole->name !== $data['role_name']) {
                $user->removeRole($currentRole->name);
                $user->assignRole($data['role_name']);
            }

            $user->phones()->delete();
            $user->phones()->createMany($data['phones']);

            return $user;
        });
    }

    public function deleteUser(User $user): void
    {
        DB::transaction(function () use ($user) {
            $user->phones()->delete();
            $user->delete();
        });
    }
}