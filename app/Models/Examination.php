<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examination extends Model
{
    /** @use HasFactory<\Database\Factories\ExaminationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
        'unit'
    ];

    public function prescriptions()
    {
        return $this->belongsToMany(Prescription::class, 'prescription_examinations')
            ->withPivot(['result', 'interpretation']);
    }
}
