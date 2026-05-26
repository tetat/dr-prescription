<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Medicine;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MedForm extends Model
{
    /** @use HasFactory<\Database\Factories\MedFormFactory> */
    use HasFactory;

    protected $fillable = [
        'short_name',
        'long_name',
    ];

    public function medicines(): BelongsToMany
    {
        return $this->belongsToMany(Medicine::class, 'med_form_medicine', 'med_form_id', 'medicine_id');
    }
}
