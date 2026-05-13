<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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

    protected static function booted()
    {
        static::deleted(function ($hospital) {
            if (
                $hospital->logo &&
                Storage::disk('public')->exists($hospital->logo)
            ) {
                Storage::disk('public')->delete($hospital->logo);
            }
        });

        static::updated(function ($hospital) {
            if ($hospital->isDirty('logo')) {
                $oldLogo = $hospital->getOriginal('logo');
                if ($oldLogo && Storage::disk('public')->exists($oldLogo)) {
                    Storage::disk('public')->delete($oldLogo);
                }
            }
        });
    }

    public function getLogoUrlAttribute()
    {
        return $this->logo
            ? asset('storage/' . $this->logo)
            : null;
    }
}
