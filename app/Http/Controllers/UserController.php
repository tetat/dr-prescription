<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Database\Eloquent\Builder;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
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
                        'blood_group' => $user->blood_group ?? 'Not Given',
                        'address' => $user->address ?? 'Not Given',
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
                'blood_group' => $user->blood_group ?? 'Not Given',
                'address' => $user->address ?? 'Not Given',
            ]);
        }

        return inertia('users/index', [
            'users' => $users,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roleQuery = $this->getRoleQuery();

        $roles = $roleQuery->get()->map(fn($role) => [
                'id' => $role->id,
                'name' => $role->name,
                'label' => $role->label,
            ]);

        return inertia('users/create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();
            
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
                'password' => $data['name'],
            ]);

            $user->assignRole($data['role_name']);

            $user->phones()->createMany($data['phones']);

            DB::commit();
            
            return redirect()
                ->route('users.index')
                ->with('success', 'User created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('users.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('phones');

        return inertia('users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('phones');
        $user['role_name'] = $user->roles()->whereNotIn('name', ['doctor'])->first()->name;

        $roles = Role::whereNotIn('name', ['super-admin', 'doctor', 'patient'])
            ->get()
            ->map(fn($role) => [
                'id' => $role->id,
                'name' => $role->name,
                'label' => $role->label,
            ]);

        return inertia('users/edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();

            // update user
            $user->update([
                'name' => $data['name'],
                'email' => $data['email'] ?? null,
                'gender' => $data['gender'],
                'blood_group' => $data['blood_group'] ?? null,
                'address' => $data['address'] ?? null,
            ]);

            // update role
            $roleName = $user->roles()->whereNotIn('name', ['doctor'])->first()->name;
            if ($roleName !== $data['role_name']) {
                $user->removeRole($roleName);
                $user->assignRole($data['role_name']);
            }

            // replace phones
            $user->phones()->delete();
            $user->phones()->createMany($data['phones']);

            DB::commit();

            return redirect()
                ->route('users.index')
                ->with('success', 'User updated successfully.');

        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('users.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->phones()->delete();
            $user->delete();
            
            return redirect()->route('users.index')->with('deleted', 'User deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    private function getUserQuery(): Builder
    {
        $userQuery = User::with('roles');
        $authUser = auth()->user();

        if ($authUser->hasRole('admin')) {
            $userQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin']);
            });
        } else if ($authUser->hasRole('doctor')) {
            $userQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin', 'admin']);
            });
        } else if (!$authUser->hasRole('super-admin')) {
            $userQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin', 'admin', 'doctor']);
            });
        }

        return $userQuery;
    }

    private function getRoleQuery(): Builder
    {
        $roleQuery = Role::query();
        $authUser = auth()->user();

        if ($authUser->hasRole('admin')) {
            $roleQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin']);
            });
        } else if ($authUser->hasRole('doctor')) {
            $roleQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin', 'admin']);
            });
        } else if (!$authUser->hasRole('super-admin')) {
            $roleQuery->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['super-admin', 'admin', 'doctor']);
            });
        }

        return $roleQuery;
    }
}
