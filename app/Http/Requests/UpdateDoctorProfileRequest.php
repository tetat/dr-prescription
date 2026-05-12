<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Phone;
use App\Models\User;

class UpdateDoctorProfileRequest extends FormRequest
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
            'email' => ['required', 'email', 'max:255'],
            'gender' => ['required', Rule::in(['male', 'female', 'other'])],
            'blood_group' => ['nullable', 'string', 'max:5'],
            'address' => ['nullable', 'string'],

            'title' => ['required', 'string', 'max:50'],
            'licence_no' => ['required', 'string', 'max:100'],
            'bio' => ['nullable', 'string'],

            'role_ids' => ['required', 'array'],
            'role_ids.*' => [
                                'required', 
                                Rule::in(['super-admin', 'doctor']),
                                Rule::exists('roles', 'name')->where('guard_name', 'web'),
                            ],

            'speciality_ids' => ['nullable', 'array'],
            'speciality_ids.*' => ['integer', 'exists:specialities,id'],

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

            'degrees' => ['required', 'array', 'min:1'],
            'degrees.*.degree_id' => ['required', 'integer', 'exists:degrees,id'],
            'degrees.*.institute_id' => ['required', 'integer', 'exists:institutes,id'],
            'degrees.*.passing_year' => ['required', 'string', 'max:4'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            $phones = $this->input('phones', []);
            $seen = [];
            $userId = $this->route('doctor')->id;

            foreach ($phones as $phone) {

                $key = $phone['country_code'].'-'.$phone['number'];

                // duplicate in request
                if (in_array($key, $seen)) {
                    $validator->errors()->add('phones', 'Duplicate phone in request.');
                    return;
                }

                $seen[] = $key;

                // DB check (exclude current user)
                $exists = Phone::where('phoneable_type', User::class)
                    ->where('phoneable_id', '!=', $userId)
                    ->where('country_code', $phone['country_code'])
                    ->where('number', $phone['number'])
                    ->exists();

                if ($exists) {
                    $validator->errors()->add('phones', "Phone {$phone['country_code']}{$phone['number']} already exists.");
                    return;
                }
            }
        });
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Invalid email format.',
            'email.unique' => 'Email already exists.',
            'gender.required' => 'Gender is required.',
            'gender.in' => 'Invalid gender.',
            'blood_group.required' => 'Blood group is required.',
            'blood_group.in' => 'Invalid blood group.',
            'address.required' => 'Address is required.',
            'address.max' => 'Address must be at most 1000 characters.',
            'phones.required' => 'Phones are required.',
            'phones.array' => 'Phones must be an array.',
            'phones.min' => 'Phones must have at least 1 element.',
            'phones.*.country_code.required' => 'Country code is required.',
            'phones.*.country_code.string' => 'Country code must be a string.',
            'phones.*.country_code.max' => 'Country code must be at most 10 characters.',
            'phones.*.country_code.regex' => 'Invalid country code format.',
            'phones.*.number.required' => 'Phone number is required.',
            'phones.*.number.string' => 'Phone number must be a string.',
            'phones.*.number.max' => 'Phone number must be at most 20 characters.',
            'phones.*.number.regex' => 'Invalid phone number format.',
            'phones.*.number.unique' => 'Phone number already exists.',
            'phones.distinct' => 'Phone numbers must be unique.',
            'degrees.required' => 'Degrees are required.',
            'degrees.array' => 'Degrees must be an array.',
            'degrees.min' => 'Degrees must have at least 1 element.',
            'degrees.*.degree_id.required' => 'Degree is required.',
            'degrees.*.degree_id.integer' => 'Degree must be an integer.',
            'degrees.*.degree_id.exists' => 'Degree must exist.',
            'degrees.*.institute_id.required' => 'Institute is required.',
            'degrees.*.institute_id.integer' => 'Institute must be an integer.',
            'degrees.*.institute_id.exists' => 'Institute must exist.',
            'degrees.*.passing_year.required' => 'Passing year is required.',
            'degrees.*.passing_year.string' => 'Passing year must be a string.',
            'degrees.*.passing_year.max' => 'Passing year must be at most 4 characters.',
            'role_ids.required' => 'Role is required.',
            'role_ids.min' => 'Role must have at least 1 element.',
            'role_ids.*.exists' => 'Role not exist in our records.',
        ];
    }
}
