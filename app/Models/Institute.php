<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Institute extends Model
{
    /** @use HasFactory<\Database\Factories\InstituteFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
    ];

    public function doctors()
    {
        return $this->belongsToMany(User::class, 'degree_doctor', 'institute_id', 'doctor_id')
            ->withPivot('degree_id', 'passing_year')
            ->withTimestamps();
    }
}
