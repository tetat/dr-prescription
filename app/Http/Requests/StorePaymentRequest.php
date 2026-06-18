<?php

namespace App\Http\Requests;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'prescription_id' => [
                'required', Rule::exists('prescriptions', 'id'),
            ],

            'amount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'method' => [
                'required', Rule::in(PaymentMethod::options()),
            ],

            'status' => [
                'required', Rule::in(PaymentStatus::options()),
            ],

            'paid_at' => [
                'nullable',
                'date',
            ],
            'from' => ['nullable', 'string']
        ];
    }
}
