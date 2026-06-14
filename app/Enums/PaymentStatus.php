<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case PAID = 'Paid';
    case PARTIAL = 'Partial';
    case PENDING = 'Pending';
    case REFUNDED = 'Refunded';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
