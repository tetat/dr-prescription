<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    /** @use HasFactory<\Database\Factories\HospitalFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'full_name',
        'logo',
        'moto',
        'address'
    ];

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }

    public function phones()
    {
        return $this->morphMany(Phone::class, 'phoneable');
    }
}
