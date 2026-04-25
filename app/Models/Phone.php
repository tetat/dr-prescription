<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    /** @use HasFactory<\Database\Factories\PhoneFactory> */
    use HasFactory;

    protected $fillable = [
        'phoneable_id',
        'phoneable_type',
        'country_code',
        'number',
    ];

    public function phoneable()
    {
        return $this->morphTo();
    }
}
