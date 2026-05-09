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

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'gender' => $validated['gender'],
                'blood_group' => $validated['blood_group'],
                'address' => $validated['address'],
                'password' => $validated['email'],
            ]);

            $user->doctorSetting()->create([
                'consultation_fee' => 500,
                'followup_fee' => 400,
                'emergency_fee' => 700,
                'followup_valid_days' => 14,
                'allow_free_followup' => false,
            ]);

            $user->assignRole('doctor');

            $doctorProfile = $user->doctorProfile()->create([
                'title' => $validated['title'],
                'licence_no' => $validated['licence_no'],
                'bio' => $validated['bio'],
            ]);

            $user->specialities()->sync($validated['speciality_ids']);

            $user->degrees()->sync($validated['degrees']);

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
        $doctor->loads('phones');
        $doctor->loads('specialities');
        $doctor->loads('degrees');

        return inertia('doctors/show', [
            'doctor' => $doctor,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $doctor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorProfileRequest $request, User $doctor)
    {
        //
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
