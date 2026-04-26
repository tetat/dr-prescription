<?php

namespace App\Enums;

enum MedicineForm: string
{
    case TAB = 'tablet';
    case CAPS = 'capsule';
    case SYP = 'syrup';
    case INJ = 'injection';
    case INF = 'infusion';
    case ORS = 'ors';
    case SUPP = 'suppository';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return array_column(self::cases(), 'value', 'name');
    }
}
