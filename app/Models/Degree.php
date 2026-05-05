<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Degree extends Model
{
    /** @use HasFactory<\Database\Factories\DegreeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
    ];

    public function doctors()
    {
        return $this->belongsToMany(User::class, 'degree_doctor', 'degree_id', 'doctor_id')
            ->withPivot('institute_id', 'passing_year')
            ->withTimestamps();
    }
}
