<?php

namespace App\Http\Controllers;

use App\Models\DoctorSetting;
use App\Http\Requests\StoreDoctorSettingRequest;
use App\Http\Requests\UpdateDoctorSettingRequest;
use Exception;
use Illuminate\Support\Facades\DB;

class DoctorSettingController extends Controller
{
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
            DB::beginTransaction();

            $data = $request->validated();

            $doctorSetting->consultation_fee = $data['consultation_fee'];
            $doctorSetting->followup_discount = $data['followup_discount'];
            $doctorSetting->emergency_fee = $data['emergency_fee'];
            $doctorSetting->followup_valid_days = $data['followup_valid_days'];

            $doctorSetting->save();

            DB::commit();

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
