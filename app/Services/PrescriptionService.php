<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\Prescription;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class PrescriptionService
{
    public function getPrescriptionQuery(): Builder
    {
        $query = Prescription::with([
            'doctor',
            'patient',
            'hospital',
            'medicines',
            'tests',
            'examinations',
            'payments'
        ]);

        return $query;
    }

    public function getPrescriptionTableData(Request $request)
    {
        $perPage = (int) ($request->perPage ?? "10");
        $prescriptionQuery = $this->getPrescriptionQuery();

        if ($request->filled('search')) {
            $search = $request->search;

            $prescriptionQuery->where(function ($q) use ($search) {

                $q->whereHas('doctor', function ($doctor) use ($search) {
                    $doctor->where('name', 'like', "%{$search}%");
                })

                ->orWhereHas('patient', function ($patient) use ($search) {
                    $patient->where('name', 'like', "%{$search}%");
                });
            });
        }

        $totalCount = $prescriptionQuery->count();

        if ($perPage === -1) {
            $allPrescriptions = $prescriptionQuery->latest()
                ->get()
                ->map(fn($prescription) => [
                    'id' => $prescription->id,
                    'doctor' => $prescription->doctor->name,
                    'patient' => $prescription->patient->name,
                    'hospital' => $prescription->hospital->name,
                    'next_visit' => $prescription->next_visit ?? 'N/A',
                ]);
            $prescriptions = [
                'data' => $allPrescriptions,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        } else {
            $prescriptions = $prescriptionQuery->paginate($perPage)->withQueryString();

            $prescriptions->getCollection()->transform(fn($prescription) => [
                'id' => $prescription->id,
                'doctor' => $prescription->doctor->name,
                'patient' => $prescription->patient->name,
                'hospital' => $prescription->hospital->name,
                'next_visit' => $prescription->next_visit ?? 'N/A',
            ]);
        }

        return $prescriptions;
    }

    public function createPrescription(array $data): Prescription
    {
        return DB::transaction(function () use ($data) {

            $prescription = Prescription::create([
                'doctor_id' => $data['doctor_id'],
                'patient_id' => $data['patient_id'],
                'hospital_id' => $data['hospital_id'],

                'chief_complaint' => $data['chief_complaint'],

                'patient_weight' => $data['patient_weight'] ?? null,
                'patient_height' => $data['patient_height'] ?? null,

                'consultation_fee' => $data['consultation_fee'] ?? null,

                // now integer (days)
                'next_visit' => $data['next_visit'] ?? null,
            ]);

            /**
             * Medicines (pivot with extra fields will be handled later if needed)
             */
            if (!empty($data['medicine_ids'])) {
                $prescription->medicines()->sync($data['medicine_ids']);
            }

            /**
             * Tests
             */
            if (!empty($data['test_ids'])) {
                $prescription->tests()->sync($data['test_ids']);
            }

            /**
             * Examinations
             */
            if (!empty($data['examination_ids'])) {
                $prescription->examinations()->sync($data['examination_ids']);
            }

            return $prescription;
        });
    }

    public function updatePrescription(Prescription $prescription, array $data): Prescription
    {
        return DB::transaction(function () use ($prescription, $data) {
            $prescription->doctor_id = $data['doctor_id'];
            $prescription->patient_id = $data['patient_id'];
            $prescription->hospital_id = $data['hospital_id'];
            $prescription->chief_complaint = $data['chief_complaint'];
            $prescription->patient_weight = $data['patient_weight'] ?? null;
            $prescription->patient_height = $data['patient_height'] ?? null;
            $prescription->consultation_fee = $data['consultation_fee'] ?? null;
            $prescription->next_visit = $data['next_visit'] ?? null;

            $prescription->update();

            // Medicines (many-to-many)
            if (!empty($data['medicine_ids'])) {
                $prescription->medicines()->sync($data['medicine_ids']);
            } else {
                $prescription->medicines()->detach();
            }

            // Tests (many-to-many)
            if (!empty($data['test_ids'])) {
                $prescription->tests()->sync($data['test_ids']);
            } else {
                $prescription->tests()->detach();
            }

            // Examinations (many-to-many)
            if (!empty($data['examination_ids'])) {
                $prescription->examinations()->sync($data['examination_ids']);
            } else {
                $prescription->examinations()->detach();
            }

            return $prescription->fresh([
                'doctor',
                'patient',
                'hospital',
                'medicines',
                'tests',
                'examinations',
            ]);
        });
    }

    public function deletePrescription(Prescription $prescription): void
    {
        DB::transaction(function () use ($prescription) {
            $prescription->medicines()->detach();
            $prescription->tests()->detach();
            $prescription->examinations()->detach();
            $prescription->delete();
        });
    }
}