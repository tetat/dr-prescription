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
        return false;
    }

    /**
     * Determine whether the user can view a specific user.
     */
    public function view(User $authUser, User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create users.
     */
    public function create(User $authUser): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update a user.
     */
    public function update(User $authUser, User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete a user.
     */
    public function delete(User $authUser, User $user): bool
    {
        return false;
    }

    /**
     * Restore (if using soft deletes)
     */
    public function restore(User $authUser, User $user): bool
    {
        return false;
    }

    /**
     * Permanently delete
     */
    public function forceDelete(User $authUser, User $user): bool
    {
        return false;
    }
}
