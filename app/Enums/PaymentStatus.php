<?php

namespace App\Enums\Enums;

enum PaymentStatus: string
{
    case PAID = 'paid';
    case PARTIAL = 'partial';
    case PENDING = 'pending';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }
}
