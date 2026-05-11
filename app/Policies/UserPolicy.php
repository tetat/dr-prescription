<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any users.
     */
    public function viewAny(User $authUser): bool
    {
        return $authUser->can('user-access');
    }

    /**
     * Determine whether the user can view a specific user.
     */
    public function view(User $authUser, User $user): bool
    {
        return $authUser->can('show-user');
    }

    /**
     * Determine whether the user can create users.
     */
    public function create(User $authUser): bool
    {
        return $authUser->can('create-user');
    }

    /**
     * Determine whether the user can update a user.
     */
    public function update(User $authUser, User $user): bool
    {
        if (
            $user->hasRole('super-admin') &&
            !$authUser->hasRole('super-admin')
        ) {
            return false;
        }

        return $authUser->can('edit-user');
    }

    /**
     * Determine whether the user can delete a user.
     */
    public function delete(User $authUser, User $user): bool
    {
        // prevent self delete
        if ($authUser->id === $user->id) {
            return false;
        }

        // protect super-admin
        if (
            $user->hasRole('super-admin') &&
            !$authUser->hasRole('super-admin')
        ) {
            return false;
        }

        return $authUser->can('delete-user');
    }

    /**
     * Restore (if using soft deletes)
     */
    public function restore(User $authUser, User $user): bool
    {
        return $authUser->can('restore-user');
    }

    /**
     * Permanently delete
     */
    public function forceDelete(User $authUser, User $user): bool
    {
        return $authUser->can('permanent-delete-user');
    }
}
