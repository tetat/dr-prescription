<?php

namespace App\Models;

use App\Enums\MedicineForm;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    /** @use HasFactory<\Database\Factories\MedicineFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'generic_name',
        'form',
        'strength',
        'medicine_group_id'
    ];

    public function group()
    {
        return $this->belongsTo(MedicineGroup::class, 'medicine_group_id');
    }

    public function prescriptionMedicines()
    {
        return $this->hasMany(PrescriptionMedicine::class);
    }

    protected function casts(): array {
        return [
            'form' => MedicineForm::class,
        ];
    }
}
