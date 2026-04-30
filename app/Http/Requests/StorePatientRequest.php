<?php

namespace App\Http\Requests;

use App\Enums\BloodGroup;
use App\Enums\UserGender;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePatientRequest extends FormRequest
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
            'email' => ['nullable', 'email', 'max:255', 'unique:users,email'],
            'gender' => ['required', Rule::in(UserGender::options())],

            'dob' => ['required', 'date', 'before:today'],

            'blood_group' => [
                'nullable',
                Rule::in(BloodGroup::options()),
            ],

            'address' => ['nullable', 'string', 'max:1000'],

            // phones array
            'phones' => ['required', 'array'],

            'phones.*.country_code' => [
                'required',
                'string',
                'max:10',
                'regex:/^\+\d{1,4}$/',
            ],

            'phones.*.number' => [
                'required',
                'string',
                'max:20',
                'regex:/^[0-9]{6,15}$/',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'phones.*.country_code.required' => 'Country code is required.',
            'phones.*.number.required' => 'Phone number is required.',
            'phones.*.number.regex' => 'Invalid phone number format.',
        ];
    }
}
