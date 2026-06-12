<?php

namespace App\Services;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PaymentService
{
    private function transformPayment(Payment $payment): array
    {
        return [
            'id' => $payment->id,
            'doctor' => $payment->doctor?->name,
            'patient' => $payment->prescription?->patient?->name,
            'hospital' => $payment->prescription?->hospital?->name,
            'amount' => $payment->amount,
            'method' => $payment->method?->value,
            'status' => $payment->status?->value,
            'paid_at' => $payment->paid_at?->format('Y-m-d H:i:s'),
        ];
    }

    public function getPaymentQuery(): Builder
    {
        return Payment::with([
            'doctor',
            'prescription.patient',
            'prescription.hospital',
        ]);
    }

    public function getPaymentTableData(Request $request)
    {
        $perPage = (int) ($request->input('perPage', 10));

        $paymentQuery = $this->getPaymentQuery()->latest();

        if ($request->filled('search')) {
            $search = trim($request->search);

            $paymentQuery->where(function ($query) use ($search) {
                $query->whereHas('doctor', function ($doctor) use ($search) {
                    $doctor->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('prescription.patient', function ($patient) use ($search) {
                    $patient->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('prescription.hospital', function ($hospital) use ($search) {
                    $hospital->where('name', 'like', "%{$search}%");
                });
            });
        }

        $totalCount = (clone $paymentQuery)->count();

        if ($perPage === -1) {
            $allPayments = $paymentQuery
                ->get()
                ->map(fn (Payment $payment) => $this->transformPayment($payment));

            return [
                'data' => $allPayments,
                'total' => $totalCount,
                'from' => 1,
                'to' => $totalCount,
                'links' => [],
            ];
        }

        $payments = $paymentQuery
            ->paginate($perPage)
            ->withQueryString();

        $payments->getCollection()->transform(
            fn (Payment $payment) => $this->transformPayment($payment)
        );

        return $payments;
    }
}