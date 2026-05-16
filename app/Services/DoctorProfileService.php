<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Services\RoleService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class DoctorProfileService
{
    public function __construct(
        private RoleService $roleService,
    ) {}

    public function getDoctorQuery(): Builder
    {
        $userQuery = User::role('doctor');

        return $userQuery;
    }

    public function getDoctorTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $doctorQuery = $this->getDoctorQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $doctorQuery->where(fn($query) => 
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('doctorProfile', function ($q) use ($search) {
                        $q->where('licence_no', 'like', "{$search}%");
                    })
            );
        }

        $totalCount = $doctorQuery->count();

        if ($perPage === -1) {
            $allDoctors = $doctorQuery->latest()
                ->get()
                ->map(fn($doctor) => [
                        'id' => $doctor->id,
                        'name' => $doctor->name,
                        'title' => $doctor->doctorProfile->title ?? 'N/A',
                        'email' => $doctor->email,
                        'gender' => ucfirst($doctor->gender->value),
                        'licence_no' => $doctor->doctorProfile->licence_no,
                        'roles' => $doctor->roles->pluck('label')->toArray(),
                    ]
                );
            $doctors = [
                'data' => $allDoctors,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $doctors = $doctorQuery->latest()->paginate($perPage)->withQueryString();

            $doctors->getCollection()->transform(fn($doctor) => [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'title' => $doctor->doctorProfile->title ?? 'N/A',
                'email' => $doctor->email,
                'gender' => ucfirst($doctor->gender->value),
                'licence_no' => $doctor->doctorProfile->licence_no,
                'roles' => $doctor->roles->pluck('label')->toArray(),
            ]);
        }

        return $doctors;
    }

    public function getFilteredRoles(): Collection
    {
        return $this->roleService
            ->getAllRoles()
            ->whereIn('name', ['doctor', 'super-admin'])
            ->values();
    }

    public function createDoctor(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $doctor = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'gender' => $data['gender'],
                'blood_group' => $data['blood_group'],
                'address' => $data['address'],
                'password' => $data['email'],
            ]);

            $doctor->assignRole($data['role_ids']);

            $doctor->doctorSetting()->create([
                'consultation_fee' => 500,
                'followup_fee' => 400,
                'emergency_fee' => 700,
                'followup_valid_days' => 14,
                'allow_free_followup' => false,
            ]);

            // phones
            $doctor->phones()->createMany($data['phones']);

            $doctorProfile = $doctor->doctorProfile()->create([
                'title' => $data['title'],
                'licence_no' => $data['licence_no'],
                'bio' => $data['bio'],
            ]);

            // specialities
            if (!empty($data['speciality_ids'])) {
                $doctor->specialities()->sync($data['speciality_ids']);
            }

            // degrees
            $degrees = [];
            foreach ($data['degrees'] as $degree) {
                $degrees[$degree['degree_id']] = [
                    'institute_id' => $degree['institute_id'],
                    'passing_year' => $degree['passing_year'],
                ];
            }
            $doctor->degrees()->sync($degrees);

            return $doctor;
        });
    }

    public function updateDoctor(User $doctor, array $data): User
    {
        return DB::transaction(function () use ($doctor, $data) {
            $doctor->update([
                'name' => $data['name'],
                'email' => $data['email'],
                'gender' => $data['gender'],
                'blood_group' => $data['blood_group'],
                'address' => $data['address'],
            ]);

            $doctor->syncRoles($data['role_ids']);

            $doctor->doctorSetting()->update([
                'consultation_fee' => 500,
                'followup_fee' => 400,
                'emergency_fee' => 700,
                'followup_valid_days' => 14,
                'allow_free_followup' => false,
            ]);

            // phones
            $doctor->phones()->delete();
            $doctor->phones()->createMany($data['phones']);

            $doctorProfile = $doctor->doctorProfile()->update([
                'title' => $data['title'],
                'licence_no' => $data['licence_no'],
                'bio' => $data['bio'],
            ]);

            // specialities
            if (!empty($data['speciality_ids'])) {
                $doctor->specialities()->sync($data['speciality_ids']);
            }

            // degrees
            $degrees = [];
            foreach ($data['degrees'] as $degree) {
                $degrees[$degree['degree_id']] = [
                    'institute_id' => $degree['institute_id'],
                    'passing_year' => $degree['passing_year'],
                ];
            }
            $doctor->degrees()->sync($degrees);

            return $doctor;
        });
    }

    public function deleteDoctor(User $doctor): void
    {
        DB::transaction(function () use ($doctor) {
            $doctor->specialities()->detach();
            $doctor->degrees()->detach();
            $doctor->doctorProfile()->delete();
            $doctor->delete();
        });
    }
}