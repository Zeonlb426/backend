<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectsStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $rules = [
            'nda' => ['boolean'],
            'title' => ['required', 'string'],
            'sub_title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'short_description' => ['string','nullable'],
            'award' => ['array','nullable'],
            'feature' => ['array','nullable'],
            'team' => ['array','nullable'],
            'term' => ['array','nullable'],
            'show_case' => ['boolean'],
            'sort_case' => ['integer', 'min:0', 'max:1000'],
            'show_award' => ['boolean'],
            'sort_award' => ['integer', 'min:0', 'max:1000'],
            'show_project' => ['boolean'],
            'sort_project' => ['integer', 'min:0', 'max:1000'],
            'aspect_ratio' => ['string','nullable'],
            'url_web' => ['string','nullable'],
            'url_ios' => ['string','nullable'],
            'url_android' => ['string','nullable'],
            'technologies' => ['array','nullable'],
            'tags' => ['array','nullable'],
            'gallery' => ['array','nullable'],
        ];
        if (request()->hasFile('image_case') && request()->file('image_case')->isValid()) {
            $rules['image_case'] = 'image|mimes:jpg,png,jpeg,gif,svg,webp|max:10000';
        }else{
            $rules['image_case'] = 'nullable|string';
        }
        if (request()->hasFile('image_award') && request()->file('image_award')->isValid()) {
            $rules['image_award'] = 'image|mimes:jpg,png,jpeg,gif,svg,webp|max:10000';
        }else{
            $rules['image_award'] = 'nullable|string';
        }
        if (request()->hasFile('image_project') && request()->file('image_project')->isValid()) {
            $rules['image_project'] = 'image|mimes:jpg,png,jpeg,gif,svg,webp|max:10000';
        }else{
            $rules['image_project'] = 'nullable|string';
        }

        return $rules;
    }
}

