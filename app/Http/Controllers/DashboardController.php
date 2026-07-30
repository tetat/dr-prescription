<?php

namespace App\Http\Controllers;

use App\Models\Prescription;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        if ($user->hasRole('doctor')) {
            $prescriptionQuery = Prescription::where('doctor_id', $user->id);
        } else {
            // Admin & Super Admin see all prescriptions
            $prescriptionQuery = Prescription::query();
        }

        $stats = [
            'patients' => (clone $prescriptionQuery)
                ->distinct('patient_id')
                ->count('patient_id'),

            'appointments' => (clone $prescriptionQuery)
                ->whereDate('created_at', today())
                ->count(),

            'prescriptions' => (clone $prescriptionQuery)
                ->whereYear('created_at', now()->year)
                ->whereMonth('created_at', now()->month)
                ->count(),
        ];

        $recentPatients = (clone $prescriptionQuery)
            ->with('patient')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($prescription) => [
                'id' => $prescription->patient?->id,
                'name' => $prescription->patient?->name ?? 'Unknown',
                'chief_complaint' => $prescription->chief_complaint,
                'date' => $prescription->created_at->diffForHumans(),
            ]);

        return inertia('dashboard', [
            'stats' => $stats,
            'recentPatients' => $recentPatients,
        ]);
    }
}