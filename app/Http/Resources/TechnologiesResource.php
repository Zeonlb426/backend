<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Technologies;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;

class TechnologiesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    #[ArrayShape([
        'id' => "integer",
        'name' => "string",
        'slug' => "string",
        'bg_color' => "string",
        'logo' => "null|string"
    ])]
    public function toArray($request): array
    {
        $logo = $this->getFirstMediaUrl(Technologies::IMAGE_COLLECTION_LOGO);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'bg_color' => $this->bg_color,
            'logo' => $logo,
        ];
    }
}
