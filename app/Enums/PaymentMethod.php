<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case CASH = 'cash';
    case BKASH = 'bkash';
    case NAGAD = 'nagad';
    case BANK = 'bank';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }
}
