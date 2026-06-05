<?php

namespace App\Http\Controllers;

use App\Models\DoctorSetting;
use App\Http\Requests\StoreDoctorSettingRequest;
use App\Http\Requests\UpdateDoctorSettingRequest;
use App\Services\DoctorSettingService;
use Exception;
use Illuminate\Support\Facades\DB;

class DoctorSettingController extends Controller
{
    public function __construct(
        private DoctorSettingService $doctorSettingService
    ){}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDoctorSettingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DoctorSetting $doctorSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DoctorSetting $doctorSetting)
    {
        return inertia('settings/doctor-setting', [
            'doctorSetting' => $doctorSetting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDoctorSettingRequest $request, DoctorSetting $doctorSetting)
    {
        try {
            $this->doctorSettingService->updateDoctorSetting($request->validated(), $doctorSetting);

            return back()->with('success', 'Setting updated successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DoctorSetting $doctorSetting)
    {
        //
    }
}
