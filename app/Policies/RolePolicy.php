<?php

namespace App\Policies;

use App\Models\User;
use Spatie\Permission\Models\Role;

class RolePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['super-admin', 'admin', 'doctor']);
    }

    public function view(User $user, Role $role): bool
    {
        return $this->canManage($user, $role);
    }

    public function create(User $user): bool
    {
        return $user->hasAnyRole(['super-admin', 'admin']);
    }

    public function update(User $user, Role $role): bool
    {
        return $this->canManage($user, $role);
    }

    public function delete(User $user, Role $role): bool
    {
        return $this->canManage($user, $role);
    }

    public function restore(User $user, Role $role): bool
    {
        return false;
    }

    public function forceDelete(User $user, Role $role): bool
    {
        return false;
    }

    protected function canManage(User $user, Role $role): bool
    {
        // Super Admin can manage all roles
        if ($user->hasRole('super-admin')) {
            return true;
        }

        // Admin cannot manage Super Admin role
        if ($user->hasRole('admin')) {
            return $role->name !== 'super-admin';
        }

        // Doctor cannot manage Super Admin or Admin roles
        if ($user->hasRole('doctor')) {
            return ! in_array($role->name, ['super-admin', 'admin']);
        }

        return false;
    }
}