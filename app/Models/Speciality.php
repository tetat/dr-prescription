<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    /** @use HasFactory<\Database\Factories\SpecialityFactory> */
    use HasFactory;

    protected $fillable = ['title'];

    public function doctors()
    {
        return $this->belongsToMany(User::class, 'doctor_speciality', 'speciality_id', 'doctor_id');
    }
}
