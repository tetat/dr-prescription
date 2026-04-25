<?php

namespace App\Enums;

enum PrescriptionMedicineDurationType: string
{
    case DAY = 'day';
    case WEEK = 'week';
    case MONTH = 'month';
    case CONTINUE = 'continue';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }
}
