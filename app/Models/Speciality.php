<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Speciality extends Model
{
    /** @use HasFactory<\Database\Factories\SpecialityFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'locale_name',
        'abbreviation',
        'locale_abbreviation',
    ];

    public function doctors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'doctor_speciality', 'speciality_id', 'doctor_id');
    }
}
