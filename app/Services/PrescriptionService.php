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
                // (days)
                'next_visit' => $data['next_visit'] ?? null,
            ]);

            /**
             * Medicines (pivot with extra fields will be handled later if needed)
             */
            $syncData = [];
            foreach ($data['medicines'] as $medicine) {
                $syncData[$medicine['medicine_id']] = [
                    'duration' => $medicine['duration'] ?? null,
                    'duration_type' => $medicine['duration_type'] ?? null,
                    'doses' => json_encode($medicine['doses'] ?? []),
                    'instructions' => $medicine['instructions'] ?? null,
                ];
            }
            $prescription->medicines()->sync($syncData);

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

    public function getShowData(Prescription $prescription): Prescription
    {
        $prescription->load(['doctor', 'patient', 'hospital', 'medicines', 'tests', 'examinations']);

        return $prescription;
    }

    public function getEditData(Prescription $prescription): Prescription
    {
        $prescription->load(['medicines', 'tests', 'examinations']);

        $prescription->medicines = $prescription->medicines->map(function ($pm) {
            $doses = $pm->doses;

            // If JSON string → decode
            if (is_string($doses) && str_starts_with(trim($doses), '[')) {
                $doses = json_decode($doses, true);
            }
            return [
                'prescription_id' => $pm->prescription_id,
                'medicine_id' => $pm->medicine_id,
                'medicine_name' => $pm->medicine?->name,
                'duration' => $pm->duration,
                'duration_type' => $pm->duration_type,
                'doses' => $doses,
                'instructions' => $pm->instructions,
            ];
        });

        $prescription->tests = $prescription->tests->map(function ($test) {
            return [
                'id' => $test->id,
                'name' => $test->name,
            ];
        });

        $prescription->examinations = $prescription->examinations->map(function ($examination) {
            return [
                'id' => $examination->id,
                'name' => $examination->name,
            ];
        });

        return $prescription;
    }

    public function updatePrescription(Prescription $prescription, array $data): Prescription
    {
        return DB::transaction(function () use ($prescription, $data) {

            $prescription->update([
                'doctor_id' => $data['doctor_id'],
                'patient_id' => $data['patient_id'],
                'hospital_id' => $data['hospital_id'],
                'chief_complaint' => $data['chief_complaint'],
                'patient_weight' => $data['patient_weight'] ?? null,
                'patient_height' => $data['patient_height'] ?? null,
                'consultation_fee' => $data['consultation_fee'] ?? null,
                'next_visit' => $data['next_visit'] ?? null,
            ]);

            // Medicines with pivot data
            $syncData = [];

            foreach ($data['medicines'] ?? [] as $medicine) {
                $syncData[$medicine['medicine_id']] = [
                    'duration' => $medicine['duration'] ?? null,
                    'duration_type' => $medicine['duration_type'] ?? null,
                    'doses' => json_encode($medicine['doses'] ?? []),
                    'instructions' => $medicine['instructions'] ?? null,
                ];
            }

            $prescription->medicines()->sync($syncData);

            // Tests
            $prescription->tests()->sync(
                $data['test_ids'] ?? []
            );

            // Examinations
            $prescription->examinations()->sync(
                $data['examination_ids'] ?? []
            );

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