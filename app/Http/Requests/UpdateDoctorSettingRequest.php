<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDoctorSettingRequest extends FormRequest
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
            'consultation_fee' => ['required', 'numeric', 'min:1'],
            'followup_discount' => ['required', 'numeric', 'min:0', 'lte:consultation_fee',],
            'emergency_fee' => ['required', 'numeric', 'min:0'],
            'followup_valid_days' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'consultation_fee.required' => 'Consultation fee is required.',
            'consultation_fee.numeric' => 'Consultation fee must be a number.',
            'consultation_fee.min' => 'Consultation fee must be at least 1.',

            'followup_discount.required' => 'Follow-up discount is required.',
            'followup_discount.numeric' => 'Follow-up discount must be a number.',
            'followup_discount.min' => 'Follow-up discount cannot be negative.',
            'followup_discount.lte' => 'Follow-up discount cannot be greater than consultation fee.',

            'emergency_fee.required' => 'Emergency fee is required.',
            'emergency_fee.numeric' => 'Emergency fee must be a number.',
            'emergency_fee.min' => 'Emergency fee cannot be negative.',

            'followup_valid_days.required' => 'Follow-up valid days is required.',
            'followup_valid_days.numeric' => 'Follow-up valid days must be a number.',
            'followup_valid_days.min' => 'Follow-up valid days cannot be negative.',
        ];
    }
}
