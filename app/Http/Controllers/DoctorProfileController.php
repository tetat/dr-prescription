<?php

namespace App\Http\Controllers;

use App\Services\DoctorProfileService;
use App\Models\DoctorProfile;
use App\Http\Requests\StoreDoctorProfileRequest;
use App\Http\Requests\UpdateDoctorProfileRequest;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;
use App\Models\Speciality;
use App\Models\Degree;
use App\Models\Institute;
use Illuminate\Support\Facades\DB;
use Exception;

class DoctorProfileController extends Controller
{
    public function __construct(
        private DoctorProfileService $doctorProfileService,
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $doctors = $this->doctorProfileService->getDoctorTableData($request);

        return inertia('doctors/index', [
            'doctors' => $doctors,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $degrees = Degree::all();
        $institutes = Institute::all();
        $specialities = Speciality::all();
        $roles = $this->doctorProfileService->getFilteredRoles();
        return inertia('doctors/create', [
            'degrees' => $degrees,
            'institutes' => $institutes,
            'specialities' => $specialities,
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorProfileRequest $request)
    {
        try {
            $this->doctorProfileService->createDoctor($request->validated());

            return redirect()->route('doctors.index')->with('success', 'Doctor created successfully.');
        } catch (Exception $e) {
            return redirect()->route('doctors.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $doctor)
    {
        $doctor->load([
            'phones',
            'specialities',
            'degrees',
            'doctorProfile',
        ]);

        $doctor->degrees->each(function ($degree) {
            $degree->pivot->institute = Institute::find(
                $degree->pivot->institute_id
            );
        });

        return inertia('doctors/show', [
            'doctor' => $doctor,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $doctor)
    {
        $doctor->load([
            'phones',
            'specialities',
            'degrees',
            'doctorProfile',
            'roles',
        ]);

        $doctor_data = [
            'id' => $doctor->id,
            'name' => $doctor->name,
            'email' => $doctor->email,
            'gender' => $doctor->gender,
            'blood_group' => $doctor->blood_group,
            'address' => $doctor->address,

            'title' => $doctor->doctorProfile?->title,
            'licence_no' => $doctor->doctorProfile?->licence_no,
            'bio' => $doctor->doctorProfile?->bio,

            'phones' => $doctor->phones->map(fn ($phone) => [
                'country_code' => $phone->country_code,
                'number' => $phone->number,
            ]),

            'speciality_ids' => $doctor->specialities
                ->pluck('id')
                ->map(fn ($id) => (string) $id)
                ->values(),

            'degrees' => $doctor->degrees->map(fn ($degree) => [
                'degree_id' => (string) $degree->id,
                'institute_id' => (string) $degree->pivot->institute_id,
                'passing_year' => $degree->pivot->passing_year,
            ]),

            'role_ids' => $doctor->roles
                ->pluck('name')
                ->map(fn ($name) => $name)
                ->values(),
        ];

        return inertia('doctors/edit', [
            'doctor' => $doctor_data,
            'degrees' => Degree::select('id', 'name')->get(),
            'institutes' => Institute::select('id', 'name')->get(),
            'specialities' => Speciality::select('id', 'name')->get(),
            'roles' => $this->doctorProfileService->getFilteredRoles(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorProfileRequest $request, User $doctor)
    {
        try {
            $this->doctorProfileService->updateDoctor($doctor, $request->validated());

            return redirect()->route('doctors.index')->with('success', 'Doctor updated successfully.');
        } catch (Exception $e) {
            return redirect()->route('doctors.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $doctor)
    {
        try {
            $this->doctorProfileService->deleteDoctor($doctor);
                
            return redirect()->route('doctors.index')->with('deleted', 'Doctor deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('doctors.index')->with('error', $e->getMessage());
        }
    }
}
