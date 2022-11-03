<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Project;
use App\Models\Technologies;
use Illuminate\Http\Resources\Json\JsonResource;
use JetBrains\PhpStorm\ArrayShape;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request): array
    {
        $gallery = $this->getMedia(Project::IMAGE_COLLECTION_GALLERY);
        $arr = [];
        foreach ($gallery as $item) {
            $arr[] = [
                'id' => $item->id,
                'sort' => $item->getCustomProperty('sort'),
                'type' => $item->getCustomProperty('type'),
                'video' => $item->getCustomProperty('video'),
                'thumbnail' => $item->getCustomProperty('thumbnail'),
                'image' => $item->getUrl(),
            ];
        }
        usort($arr, function($a,$b){
            return ($a['sort']-$b['sort']);
        });
        return [
            'id' => $this->id,
            'nda' => $this->nda,
            'title' => $this->title,
            'sub_title' => $this->sub_title,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'award' => $this->award,
            'feature' => $this->feature,
            'team' => $this->team,
            'term' => $this->term,
            'show_case' => $this->show_case,
            'image_case' => $this->getFirstMediaUrl(Project::IMAGE_COLLECTION_CASE),
            'sort_case' => $this->sort_case,
            'show_award' => $this->show_award,
            'image_award' => $this->getFirstMediaUrl(Project::IMAGE_COLLECTION_AWARD),
            'sort_award' => $this->sort_award,
            'aspect_ratio' => $this->aspect_ratio,
            'show_project' => $this->show_project,
            'image_project' => $this->getFirstMediaUrl(Project::IMAGE_COLLECTION_PROJECT),
            'sort_project' => $this->sort_project,
            'url_web' => $this->url_web,
            'url_ios' => $this->url_ios,
            'url_android' => $this->url_android,
            'technologies' => TechnologiesResource::collection($this->technologies),
            'tags' => TagsResource::collection($this->tags),
            'gallery' => $arr,
        ];
    }
}
