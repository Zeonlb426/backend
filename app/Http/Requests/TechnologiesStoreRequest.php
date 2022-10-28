<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TechnologiesStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'name' => ['required', 'string'],
            'order' => ['integer', 'min:0', 'max:1000'],
            'bg_color' => ['string'],
        ];
        if (request()->hasFile('logo') && request()->file('logo')->isValid()) {
            $rules['logo'] = 'image|mimes:jpg,png,jpeg,gif,svg,webp|max:10000';
        }else{
            $rules['logo'] = 'nullable|string';
        }

        return $rules;
    }
}

