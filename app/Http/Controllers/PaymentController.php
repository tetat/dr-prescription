<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\Prescription;
use App\Services\PaymentService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function __construct(private PaymentService $paymentService){}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $payments = $this->paymentService->getPaymentTableData($request);

        return inertia('payments/index', [
            'payments' => $payments,
            'filters' => $request->only('search', 'perPage'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $prescriptions = Prescription::query()
            ->where('doctor_id', Auth::id())
            ->select('id', 'code', 'consultation_fee')
            ->latest()
            ->get();

        return inertia('payments/create', [
            'prescriptions' => $prescriptions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        try {
            $this->paymentService->createPayment($request->validated());

            return redirect()->route('payments.index')->with('success', 'Payment created successfully.');
        } catch (Exception $e) {
            dd($e->getMessage());
            return redirect()->route('payments.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return inertia('payments/show', [
            'payment' => $this->paymentService->showPayment($payment),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $prescriptions = Prescription::query()
            ->where('doctor_id', Auth::id())
            ->select('id', 'code', 'consultation_fee')
            ->latest()
            ->get();

        $payment->load('prescription');

        return inertia('payments/edit', [
            'payment' => [
                'id' => $payment->id,
                'prescription_id' => $payment->prescription_id,
                'amount' => $payment->amount,
                'method' => $payment->method?->value,
                'status' => $payment->status?->value,
                'paid_at' => $payment->paid_at?->format('Y-m-d\TH:i'),
            ],

            'prescriptions' => $prescriptions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdatePaymentRequest $request,
        Payment $payment
    ) {
        try {
            $this->paymentService->updatePayment(
                $payment,
                $request->validated()
            );

            return redirect()
                ->route('payments.index')
                ->with('success', 'Payment updated successfully.');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        try {
            $this->paymentService->deletePayment($payment);

            return redirect()->route('payments.index')->with('deleted', 'Payment deleted successfully.');
        } catch (Exception $e) {
            return redirect()->route('payments.index')->with('error', $e->getMessage());
        }
    }
}
