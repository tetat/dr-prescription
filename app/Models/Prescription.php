<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Prescription extends Model
{
    /** @use HasFactory<\Database\Factories\PrescriptionFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'patient_id',
        'doctor_id',
        'hospital_id',
        'chief_complaint',
        'patient_weight',
        'patient_height',
        'next_visit',
        'consultation_fee',
        'is_emergency',
    ];

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function patient(): BelongsTo
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function hospital(): BelongsTo
    {
        return $this->belongsTo(Hospital::class);
    }

    // 💊 medicines
    public function medicines(): BelongsToMany
    {
        return $this->belongsToMany(Medicine::class, 'prescription_medicines')
            ->withPivot([
                'duration',
                'duration_type',
                'doses',
                'instructions'
            ])
            ->withTimestamps();
    }

    // 🧪 tests
    public function tests(): BelongsToMany
    {
        return $this->belongsToMany(Test::class, 'prescription_tests')
            ->withPivot(['result'])
            ->withTimestamps();
    }

    // 🩺 examinations (vitals)
    public function examinations(): BelongsToMany
    {
        return $this->belongsToMany(Examination::class, 'prescription_examinations')
            ->withPivot(['result', 'interpretation'])
            ->withTimestamps();
    }

    // 💰 payments
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function getRemainingFeeAttribute()
    {
        $paid = $this->relationLoaded('payments')
            ? $this->payments->sum('amount')
            : $this->payments()->sum('amount');

        return max(0, $this->consultation_fee - $paid);
    }

    public function prescriptionMedicines(): HasMany
    {
        return $this->hasMany(PrescriptionMedicine::class);
    }

    protected static function booted()
    {
        static::created(function ($p) {
            $p->forceFill([
                'code' => 'P-' . str_pad($p->id, 6, '0', STR_PAD_LEFT),
            ])->saveQuietly();
        });
    }
}
