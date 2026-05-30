<?php

namespace App\Enums;

enum PrescriptionMedicineDurationType: string
{
    case DAY = 'Day';
    case DAYS = 'Days';
    case WEEK = 'Week';
    case WEEKS = 'Weeks';
    case MONTH = 'Month';
    case MONTHS = 'Months';
    case CONTINUE = 'Continue';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
