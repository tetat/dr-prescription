<?php

namespace App\Models;

use App\Enums\PrescriptionMedicineDurationType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrescriptionMedicine extends Model
{
    /** @use HasFactory<\Database\Factories\PrescriptionMedicineFactory> */
    use HasFactory;

    protected $fillable = [
        'prescription_id',
        'medicine_id',
        'duration',
        'duration_type',
        'doses',
        'instructions'
    ];

    public function prescription(): BelongsTo
    {
        return $this->belongsTo(Prescription::class);
    }

    public function medicine(): BelongsTo
    {
        return $this->belongsTo(Medicine::class);
    }

    protected function casts(): array
    {
        return [
            'duration_type' => PrescriptionMedicineDurationType::class,
        ];
    }
}
