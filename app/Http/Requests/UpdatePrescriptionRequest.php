<?php

namespace App\Http\Requests;

use App\Enums\PrescriptionMedicineDurationType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePrescriptionRequest extends FormRequest
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
            'doctor_id' => ['required', 'integer', Rule::exists('users', 'id')],
            'patient_id' => ['required', 'integer', Rule::exists('users', 'id')],
            'hospital_id' => ['required', 'integer', Rule::exists('hospitals', 'id')],
            'chief_complaint' => ['required', 'string', 'max:5000'],
            'patient_weight' => ['nullable', 'numeric', 'min:1', 'max:500'],
            'patient_height' => ['nullable', 'numeric', 'min:1', 'max:300'],
            'consultation_fee' => ['nullable', 'numeric', 'min:0'],
            'is_emergency' => ['required', 'boolean'],
            'next_visit' => ['nullable', 'integer', 'min:1'],
            'test_ids' => ['nullable', 'array'],
            'test_ids.*' => ['integer', Rule::exists('tests', 'id')],
            'examination_ids' => ['nullable', 'array'],
            'examination_ids.*' => ['integer', Rule::exists('examinations', 'id')],

            // Prescription Medicines
            'medicines' => ['required', 'array', 'min:1', 'max:6'],
            'medicines.*.medicine_id' => ['required', 'integer', Rule::exists('medicines', 'id')],
            'medicines.*.duration' => ['required', 'integer', 'min:1'],
            'medicines.*.duration_type' => ['required', Rule::in(PrescriptionMedicineDurationType::options())],
            'medicines.*.doses' => [
                'required',
                'array',
                function ($attribute, $value, $fail) {
                    if (
                        ! collect($value)
                            ->contains(fn ($dose) => (bool) $dose)
                    ) {
                        $fail('At least one dose must be selected.');
                    }
                },
            ],
            'medicines.*.doses.*' => ['required', 'integer', 'min:0'],
            'medicines.*.instructions' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'doctor_id.required' => 'Doctor is required.',
            'doctor_id.exists' => 'Selected doctor is invalid.',
            'patient_id.required' => 'Patient is required.',
            'patient_id.exists' => 'Selected patient is invalid.',
            'hospital_id.required' => 'Hospital is required.',
            'hospital_id.exists' => 'Selected hospital is invalid.',
            'chief_complaint.required' => 'Chief complaint is required.',
            'next_visit.after_or_equal' => 'Next visit date cannot be in the past.',
            'medicines.*.medicine_id.required' => 'Medicine is required.',
            'medicines.*.medicine_id.exists' => 'Selected medicine is invalid.',
            'medicines.*.doses.required' => 'Doses is required.',
            'medicines.*.duration.required' => 'Duration is required.',
            'medicines.*.duration.integer' => 'Duration must be type of Integer.',
            'medicines.*.duration_type.required' => 'Duration type is required.',
            'medicines.*.duration_type.in' => 'Duration type is Invalid.',
        ];
    }
}
