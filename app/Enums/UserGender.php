<?php

namespace App\Enums;

enum UserGender: string
{
    case MALE = 'male';
    case FEMALE = 'female';
    case OTHER = 'other';

    public static function  values() : array {
        return array_column(self::cases(), 'value');
    }
}
