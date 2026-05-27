<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;

class SelectService
{
    public function getDoctors(): Collection
    {
        return User::role('doctor')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }
}