<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    /** @use HasFactory<\Database\Factories\DegreeFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'institute',
        'passing_year'
    ];

    public function doctors()
    {
        return $this->belongsToMany(User::class, 'degree_doctor', 'degree_id', 'doctor_id');
    }
}
