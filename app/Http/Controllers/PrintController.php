<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Http\Request;

class PrintController extends Controller
{
    public function prescription(string $prescription_id)
    {
        $prescription = Prescription::with([
            'doctor.doctorProfile',
            'doctor.degrees',
            'doctor.specialities',
            'patient',
            'hospital',
            'medicines',
            'tests',
            'examinations',
            'payments',
        ])->findOrFail($prescription_id);

        return inertia('prints/prescription', [
            'prescription' => $prescription,
        ]);
    }
}
