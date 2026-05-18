<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MedForm;

class Medicine extends Model
{
    /** @use HasFactory<\Database\Factories\MedicineFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'strength',
        'medicine_group_id'
    ];

    public function group()
    {
        return $this->belongsTo(MedicineGroup::class, 'medicine_group_id');
    }

    public function forms()
    {
        return $this->belongsToMany(MedForm::class);
    }

    public function prescriptionMedicines()
    {
        return $this->hasMany(PrescriptionMedicine::class);
    }
}
