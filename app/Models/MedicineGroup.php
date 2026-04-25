<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineGroup extends Model
{
    /** @use HasFactory<\Database\Factories\MedicineGroupFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];
}
