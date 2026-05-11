<?php

namespace App\Http\Requests;

use App\Models\Phone;
use App\Models\User;
use App\Enums\BloodGroup;
use App\Enums\UserGender;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'role_name' => ['required', Rule::exists('roles', 'name')],
            'gender' => ['required', Rule::in(UserGender::options())],

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

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            $phones = $this->input('phones', []);
            $seen = [];

            foreach ($phones as $phone) {

                $key = $phone['country_code'].'-'.$phone['number'];

                // duplicate in request
                if (in_array($key, $seen)) {
                    $validator->errors()->add('phones', 'Duplicate phone in request.');
                    return;
                }

                $seen[] = $key;

                // DB check
                $exists = Phone::where('phoneable_type', User::class)
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
            'phones.*.country_code.required' => 'Country code is required.',
            'phones.*.number.required' => 'Phone number is required.',
            'phones.*.number.regex' => 'Invalid phone number format.',
            'phones.*.number.unique' => 'Phone number already exists.',
            'phones.distinct' => 'Phone numbers must be unique.',
        ];
    }
}
