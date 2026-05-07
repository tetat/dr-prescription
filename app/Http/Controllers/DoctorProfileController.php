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
                        'gender' => $doctor->gender,
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
                'gender' => $doctor->gender,
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

            $user->assignRole('doctor');

            $doctorProfile = DoctorProfile::create([
                'user_id' => $user->id,
                'title' => $request->title,
                'licence_no' => $request->licence_no,
                'bio' => $request->bio,
            ]);

            $doctorProfile->specialities()->attach($request->specialities);

            $doctorProfile->degrees()->attach($request->degrees);

            if (!$user || !$doctorProfile) {
                throw new Exception("Unable to create doctor profile.");
            }

            DB::commit();

            return redirect()->route('doctors.index')
                ->with('success', 'Doctor created successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return redirect()->route('doctors.index')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(DoctorProfile $doctorProfile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DoctorProfile $doctorProfile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorProfileRequest $request, DoctorProfile $doctorProfile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DoctorProfile $doctorProfile)
    {
        //
    }
}
