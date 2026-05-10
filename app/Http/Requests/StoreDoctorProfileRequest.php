<?php

namespace App\Http\Requests;

use App\Enums\BloodGroup;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDoctorProfileRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'gender' => ['required', 'string'],
            'blood_group' => ['nullable', 'string', Rule::in(BloodGroup::options())],
            'licence_no' => ['required', 'string', 'unique:doctor_profiles,licence_no', 'regex:/^[A-Z]-[0-9]{6}$/',],
            'address' => ['nullable', 'string'],
            'bio' => ['nullable', 'string'],
            'phones' => ['required', 'array', 'min:1'],
            'phones.*.country_code' => ['required', 'string'],
            'phones.*.number' => ['required', 'string'],
            'degrees' => ['required', 'array', 'min:1'],
            'degrees.*.degree_id' => ['required'],
            'degrees.*.institute_id' => ['nullable'],
            'degrees.*.passing_year' => ['nullable', 'digits:4', 'integer', 'between:1971,' . now()->year],
            'speciality_ids' => ['nullable', 'array'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Enter a valid email address.',

            'gender.required' => 'Gender is required.',

            'licence_no.required' => 'Licence number is required.',
            'licence_no.regex' => 'Licence number format must be like A-123456.',

            'phones.required' => 'At least one phone number is required.',
            'phones.*.country_code.required' => 'Country code is required.',
            'phones.*.number.required' => 'Phone number is required.',
            'phones.*.number.regex' => 'Phone number must contain only digits.',

            'degrees.required' => 'At least one degree is required.',
            'degrees.*.degree_id.required' => 'Degree is required.',

            'degrees.*.passing_year.digits' => 'Passing year must be 4 digits.',
        ];
    }
}
