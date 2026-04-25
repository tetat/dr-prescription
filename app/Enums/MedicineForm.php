<?php

namespace App\Enums;

enum MedicineForm: string
{
    case TABLET = 'tablet';
    case CAPSULE = 'capsule';
    case SYRUP = 'syrup';

    case INJECTION = 'injection';
    case INFUSION = 'infusion';

    case ORS = 'ors';
}
