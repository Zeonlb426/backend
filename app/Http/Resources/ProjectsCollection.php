<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Project;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Config;

class ProjectsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Support\Collection
     */
    public function toArray($request)
    {

        return $this->collection->map(function ($project, $key) {

            $imageCase = $project->getFirstMediaUrl(Project::IMAGE_COLLECTION_CASE);
            $imageProject = $project->getFirstMediaUrl(Project::IMAGE_COLLECTION_PROJECT);
            $imageAward = $project->getFirstMediaUrl(Project::IMAGE_COLLECTION_AWARD);

            if ($imageCase) {
                $imagePreview = $imageCase;
            }elseif ($imageProject) {
                $imagePreview = $imageProject;
            }elseif ($imageAward) {
                $imagePreview = $imageAward;
            }else{
                $imagePreview = Config::get('app.url').'/vendor/img/logo.svg';
            }

            return [
                'id' => $project->id,
                'nda' => $project->nda,
                'title' => $project->title,
                'sub_title' => $project->sub_title,
                'description' => $project->description,
                'short_description' => $project->short_description,
                'image_preview' => $imagePreview,
            ];
        });
    }
}
