<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    /** @use HasFactory<\Database\Factories\TestFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function prescriptions()
    {
        return $this->belongsToMany(Prescription::class, 'prescription_tests')
            ->withPivot(['result', 'status']);
    }
}
