<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institute extends Model
{
    /** @use HasFactory<\Database\Factories\InstituteFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
    ];

    public function doctors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'doctor_institute', 'institute_id', 'doctor_id');
    }
}
