<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorSetting extends Model
{
    /** @use HasFactory<\Database\Factories\DoctorSettingFactory> */
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'consultation_fee',
        'followup_fee',
        'emergency_fee',
        'followup_valid_days',
        'allow_free_followup',
    ];
}
