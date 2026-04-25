<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    /** @use HasFactory<\Database\Factories\PrescriptionFactory> */
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'hospital_id',
        'chief_complaint',
        'patient_weight',
        'patient_height',
        'next_visit',
        'consultation_fee'
    ];
}
