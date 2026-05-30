<?php

namespace App\Services;

use App\Models\Degree;
use App\Models\Examination;
use App\Models\Hospital;
use App\Models\Institute;
use App\Models\MedForm;
use App\Models\Medicine;
use App\Models\MedicineGroup;
use App\Models\Speciality;
use App\Models\Test;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class SelectService
{
    /**
     * @param class-string<Model> $model
     */
    private function getOptions(string $model, string $label = 'name'): Collection
    {
        return $model::query()
            ->select('id', $label)
            ->orderBy($label)
            ->get();
    }

    private function getUsersByRole(string $role): Collection
    {
        return User::role($role)
            ->select(['id', 'name'])
            ->orderBy('name', 'asc')
            ->get();
    }

    public function getDoctors(): Collection
    {
        return $this->getUsersByRole('doctor');
    }

    public function getPatients(): Collection
    {
        return $this->getUsersByRole('patient');
    }

    public function getExaminations(): Collection
    {
        return $this->getOptions(Examination::class);
    }

    public function getTests(): Collection
    {
        return $this->getOptions(Test::class);
    }

    public function getHospitals(): Collection
    {
        return $this->getOptions(Hospital::class);
    }

    public function getInstitutes(): Collection
    {
        return $this->getOptions(Institute::class);
    }

    public function getDegrees(): Collection
    {
        return $this->getOptions(Degree::class);
    }

    public function getSpecialities(): Collection
    {
        return $this->getOptions(Speciality::class);
    }

    public function getMedicines(): Collection
    {
        $medicines = Medicine::query()
            ->with([
                'group:id,name',
                'forms:id,short_name,long_name',
            ])
            ->select('id', 'name', 'strength', 'medicine_group_id')
            ->orderBy('name')
            ->get();

        $medicines->each(function ($medicine) {
            $medicine->search_text =
                $medicine->name . ' ' .
                $medicine->strength . ' ' .
                optional($medicine->group)->name . ' ' .
                $medicine->forms->pluck('short_name')->implode(' ');
        });

        return $medicines;
    }

    public function getMedForms(): Collection
    {
        return $this->getOptions(MedForm::class, 'long_name');
    }

    public function getMedGroups(): Collection
    {
        return $this->getOptions(MedicineGroup::class);
    }
}