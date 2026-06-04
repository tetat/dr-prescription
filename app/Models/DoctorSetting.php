<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DoctorSetting extends Model
{
    /** @use HasFactory<\Database\Factories\DoctorSettingFactory> */
    use HasFactory;

    protected $fillable = [
        'doctor_id',
        'consultation_fee',
        'followup_discount',
        'emergency_fee',
        'followup_valid_days',
    ];

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
