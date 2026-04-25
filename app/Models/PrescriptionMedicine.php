<?php

namespace App\Models;

use App\Enums\PrescriptionMedicineDurationType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrescriptionMedicine extends Model
{
    /** @use HasFactory<\Database\Factories\PrescriptionMedicineFactory> */
    use HasFactory;

    protected $fillable = [
        'prescription_id',
        'medicine_id',
        'dosage',
        'duration',
        'duration_type',
        'before_food',
        'morning',
        'noon',
        'night',
        'instructions'
    ];

    protected function casts(): array
    {
        return [
            'duration_type' => PrescriptionMedicineDurationType::class,
        ];
    }
}
