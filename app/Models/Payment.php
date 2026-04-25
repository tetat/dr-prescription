<?php

namespace App\Models;

use App\Enums\Enums\PaymentMethod;
use App\Enums\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;

    protected $fillable = [
        'prescription_id',
        'amount',
        'method',
        'status',
        'paid_at'
    ];

    protected function casts(): array
    {
        return [
            'method' => PaymentMethod::class,
            'status' => PaymentStatus::class,
        ];
    }
}
