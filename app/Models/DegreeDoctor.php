<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use App\Models\Degree;
use App\Models\Institution;
use App\Models\User;

class DegreeDoctor extends Pivot
{
    protected $table = 'degree_doctor';

    protected $fillable = [
        'doctor_id',
        'degree_id',
        'institution_id',
        'passing_year',
    ];

    public function degree()
    {
        return $this->belongsTo(Degree::class);
    }

    public function institute()
    {
        return $this->belongsTo(Institution::class);
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
