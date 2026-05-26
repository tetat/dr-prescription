<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DoctorProfile extends Model
{
    /** @use HasFactory<\Database\Factories\DoctorProfileFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'locale_title',
        'licence_no',
        'bio'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
