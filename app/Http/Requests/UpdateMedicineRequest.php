<?php

namespace App\Http\Requests;

use App\Models\MedicineGroup;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMedicineRequest extends FormRequest
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
            'generic_name' => ['nullable', 'string', 'max:512'],
            'form' => ['required', 'string', 'max:255'],
            'strength' => ['required', 'string', 'max:255'],
            'medicine_group_id' => ['required', Rule::in(MedicineGroup::all()->pluck('id'))],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Medicine name is required.',
            'form.required' => 'Medicine form is required.',
            'strength.required' => 'Medicine strength is required.',
            'medicine_group_id.required' => 'Medicine group is required.',
            'medicine_group_id.in' => 'Medicine group is invalid.',
        ];
    }
}
