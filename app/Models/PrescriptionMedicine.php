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
        'first_dose',
        'second_dose',
        'third_dose',
        'fourth_dose',
        'instructions'
    ];

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }

    public function medicine()
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
