<?php

namespace App\Services;

use App\Models\Examination;
use App\Models\Hospital;
use App\Models\Test;
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

    public function getPatients(): Collection
    {
        return User::role('patient')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    public function getExaminations(): Collection
    {
        return Examination::select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    public function getTests(): Collection
    {
        return Test::select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    public function getHospitals(): Collection
    {
        return Hospital::select('id', 'name')
            ->orderBy('name')
            ->get();
    }
}