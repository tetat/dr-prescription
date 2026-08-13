<?php

namespace App\Policies;

use App\Models\Hospital;
use App\Models\User;

class HospitalPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('hospital-access');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Hospital $hospital): bool
    {
        return $user->hasPermissionTo('show-hospital');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-hospital');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Hospital $hospital): bool
    {
        return $user->hasPermissionTo('edit-hospital');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Hospital $hospital): bool
    {
        return $user->hasPermissionTo('delete-hospital');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Hospital $hospital): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Hospital $hospital): bool
    {
        return false;
    }
}
