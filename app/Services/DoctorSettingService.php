<?php

namespace App\Services;

use App\Models\DoctorSetting;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\DB;

class DoctorSettingService
{
    public function getDoctorSettingData(string $doctor_id): DoctorSetting
    {
        return DoctorSetting::where('doctor_id', $doctor_id)->first();
    }

    public function createDoctorSetting(string $doctor_id): DoctorSetting
    {
        return DB::transaction(function() use ($doctor_id) {
            $doctorSetting = DoctorSetting::create([
                'doctor_id' => $doctor_id,
                'consultation_fee' => 500,
                'followup_discount' => 100,
                'emergency_fee' => 700,
                'followup_valid_days' => 14,
            ]);

            return $doctorSetting;
        });
    }

    public function updateDoctorSetting(array $data, DoctorSetting $doctorSetting): DoctorSetting
    {
        return DB::transaction(function() use ($data, $doctorSetting) {
            $doctorSetting->consultation_fee = $data['consultation_fee'];
            $doctorSetting->followup_discount = $data['followup_discount'];
            $doctorSetting->emergency_fee = $data['emergency_fee'];
            $doctorSetting->followup_valid_days = $data['followup_valid_days'];

            $doctorSetting->save();

            return $doctorSetting;
        });
    }
}