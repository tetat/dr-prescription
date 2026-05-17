<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case CASH = 'Cash';
    case BKASH = 'bKash';
    case NAGAD = 'Nagad';
    case BANK = 'Bank';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
