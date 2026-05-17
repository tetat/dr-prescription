<?php

namespace App\Enums;

enum AgeType: string
{
    case DAY = 'Day';
    case DAYS = 'Days';
    case MONTH = 'Month';
    case MONTHS = 'Months';
    case YEAR = 'Year';
    case YEARS = 'Years';

    public function label(): string
    {
        return $this->value;
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
