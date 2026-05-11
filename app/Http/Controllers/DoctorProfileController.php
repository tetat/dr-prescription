<?php

namespace App\Http\Controllers;

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
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $doctorQuery = User::role('doctor');

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
                        'title' => $doctor->doctorProfile->title ?? 'Not Given',
                        'email' => $doctor->email,
                        'gender' => ucfirst($doctor->gender->value),
                        'licence_no' => $doctor->doctorProfile->licence_no,
                        'address' => $doctor->address ?? 'Not Given',
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
                'title' => $doctor->doctorProfile->title ?? 'Not Given',
                'email' => $doctor->email,
                'gender' => ucfirst($doctor->gender->value),
                'licence_no' => $doctor->doctorProfile->licence_no,
                'address' => $doctor->address ?? 'Not Given',
            ]);
        }

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
        return inertia('doctors/create', [
            'degrees' => $degrees,
            'institutes' => $institutes,
            'specialities' => $specialities,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorProfileRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            $doctor = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'gender' => $validated['gender'],
                'blood_group' => $validated['blood_group'],
                'address' => $validated['address'],
                'password' => $validated['email'],
            ]);

            $doctor->assignRole('doctor');

            $doctor->doctorSetting()->create([
                'consultation_fee' => 500,
                'followup_fee' => 400,
                'emergency_fee' => 700,
                'followup_valid_days' => 14,
                'allow_free_followup' => false,
            ]);

            // phones
            $doctor->phones()->createMany($validated['phones']);

            $doctorProfile = $doctor->doctorProfile()->create([
                'title' => $validated['title'],
                'licence_no' => $validated['licence_no'],
                'bio' => $validated['bio'],
            ]);

            // specialities
            $doctor->specialities()->sync($validated['speciality_ids']);

            // degrees
            $degrees = [];
            foreach ($validated['degrees'] as $degree) {
                $degrees[$degree['degree_id']] = [
                    'institute_id' => $degree['institute_id'],
                    'passing_year' => $degree['passing_year'],
                ];
            }
            $doctor->degrees()->sync($degrees);

            DB::commit();

            return redirect()
                ->route('doctors.index')
                ->with('success', 'Doctor created successfully.');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->route('doctors.index')
                ->with('error', $e->getMessage());
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
        ];

        return inertia('doctors/edit', [
            'doctor' => $doctor_data,
            'degrees' => Degree::select('id', 'name')->get(),
            'institutes' => Institute::select('id', 'name')->get(),
            'specialities' => Speciality::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorProfileRequest $request, User $doctor)
    {
        DB::beginTransaction();

        try {

            $validated = $request->validated();

            $doctor->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'gender' => $validated['gender'],
                'blood_group' => $validated['blood_group'],
                'address' => $validated['address'],
            ]);

            $doctor->doctorProfile()->update([
                'title' => $validated['title'],
                'licence_no' => $validated['licence_no'],
                'bio' => $validated['bio'],
            ]);

            // phones
            $doctor->phones()->delete();
            $doctor->phones()->createMany($validated['phones']);

            // specialities
            $doctor->specialities()->sync($validated['speciality_ids']);

            // degrees
            $degrees = [];
            foreach ($validated['degrees'] as $degree) {
                $degrees[$degree['degree_id']] = [
                    'institute_id' => $degree['institute_id'],
                    'passing_year' => $degree['passing_year'],
                ];
            }
            $doctor->degrees()->sync($degrees);

            DB::commit();

            return redirect()
                ->route('doctors.index')
                ->with('success', 'Doctor updated successfully.');

        } catch (Exception $e) {
            DB::rollBack();

            return redirect()
                ->back()
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $doctor)
    {
        try {
            if ($doctor) {
                $doctor->specialities()->detach();
                $doctor->degrees()->detach();
                $doctor->doctorProfile()->delete();
                $doctor->delete();
                
                return redirect()->route('doctors.index')->with('deleted', 'Doctor deleted successfully.');
            }

            throw new Exception('Unable to delete doctor.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
