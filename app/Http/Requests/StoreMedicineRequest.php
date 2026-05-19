<?php

namespace App\Http\Requests;

use App\Models\MedForm;
use App\Models\MedicineGroup;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMedicineRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:512'],
            'form_ids' => ['required', 'array', 'min:1'],
            'form_ids.*' => ['integer', Rule::exists('med_forms', 'id')],
            'strength' => ['required', 'string', 'max:255'],
            'medicine_group_id' => ['required', Rule::exists('medicine_groups', 'id')],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Medicine name is required.',
            'form_ids' => 'Form is required.',
            'form_ids.*' => 'Form is not valid.',
            'strength.required' => 'Medicine strength is required.',
            'medicine_group_id.required' => 'Medicine group is required.',
            'medicine_group_id.exists' => 'Medicine group is invalid.',
        ];
    }
}
