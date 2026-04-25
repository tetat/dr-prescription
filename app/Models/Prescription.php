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

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    // 💊 medicines
    public function medicines()
    {
        return $this->belongsToMany(Medicine::class, 'prescription_medicines')
            ->withPivot([
                'dosage',
                'duration',
                'duration_type',
                'before_food',
                'first_dose',
                'second_dose',
                'third_dose',
                'fourth_dose',
                'instructions'
            ])
            ->withTimestamps();
    }

    // 🧪 tests
    public function tests()
    {
        return $this->belongsToMany(Test::class, 'prescription_tests')
            ->withPivot(['result', 'status'])
            ->withTimestamps();
    }

    // 🩺 examinations (vitals)
    public function examinations()
    {
        return $this->belongsToMany(Examination::class, 'prescription_examinations')
            ->withPivot(['result', 'interpretation'])
            ->withTimestamps();
    }

    // 💰 payments
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function prescriptionMedicines()
    {
        return $this->hasMany(PrescriptionMedicine::class);
    }
}
