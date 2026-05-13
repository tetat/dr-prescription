<?php

namespace App\Http\Requests;

use App\Models\Phone;
use App\Models\Hospital;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreHospitalRequest extends FormRequest
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
            'full_name' => ['nullable', 'string', 'max:512'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'moto' => ['nullable', 'string', 'max:512'],
            'address' => ['nullable', 'string', 'max:512'],
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
                $exists = Phone::where('phoneable_type', Hospital::class)
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

    public function messages()
    {
        return [
            'phones.*.country_code.required' => 'Country code is required.',
            'phones.*.country_code.max' => 'Country code cannot exceed 10 characters.',
            'phones.*.country_code.regex' => 'Country code must be in the format +880, +966, etc.',
            'phones.*.number.required' => 'Phone number is required.',
            'phones.*.number.max' => 'Phone number cannot exceed 20 characters.',
            'phones.*.number.regex' => 'Phone number must contain only numbers and be between 6 and 15 digits long.',
        ];
    }
}
