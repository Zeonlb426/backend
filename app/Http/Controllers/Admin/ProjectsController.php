<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectsStoreRequest;
use App\Http\Resources\ProjectsCollection;
use App\Http\Resources\TagsResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TechnologiesResource;
use App\Models\Project;
use App\Models\Tag;
use App\Models\Technologies;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Support\Collection;

/**
 * Class ProjectsController
 * @package App\Http\Controllers
 */
class ProjectsController extends Controller
{

    public function index(): \Inertia\Response
    {
        return Inertia::render('Projects/ProjectsList',[
//            'filters' => Request::all('search', 'technologies', 'tags', 'nda'),
            'projects' => new ProjectsCollection(
                Project::orderBy('sort_project')
//                    ->filter(Request::only('search', 'technologies', 'tags', 'nda'))
                    ->paginate(30)
                    ->appends(Request::all())
            ),
            'technologiesList' => Technologies::all()->toArray(),
            'tagsList' => Tag::all()->toArray(),
        ]);
    }

    public function store(ProjectsStoreRequest $request): \Illuminate\Http\RedirectResponse
    {

        $data = $request->validated();

        $project = new Project();
        $project->nda = $data['nda'];
        $project->title = $data['title'];
        $project->sub_title = $data['sub_title'];
        $project->description = $data['description'];
        $project->short_description = $data['short_description'];
        $project->award = $data['award'];
        $project->feature = $data['feature'];
        $project->team = $data['team'];
        $project->term = $data['term'];
        $project->show_case = $data['show_case'];
        $project->sort_case = $data['sort_case'];
        $project->show_award = $data['show_award'];
        $project->sort_award = $data['sort_award'];
        $project->aspect_ratio = $data['aspect_ratio'];
        $project->show_project = $data['show_project'];
        $project->sort_project = $data['sort_project'];
        $project->url_web = $data['url_web'];
        $project->url_ios = $data['url_ios'];
        $project->url_android = $data['url_android'];
        $project->sort_project = $data['sort_project'];
        $project->save();

        $technologies = $request->technologies;
        $tags = $request->tags;

        if(!empty($request->technologies)) {
            $arr=[];
            foreach ($request->technologies as $technology) {
                $arr[] = $technology['id'];
            }
            $technologies = $arr;
        }

        if(!empty($request->tags)) {
            $arr=[];
            foreach ($request->tags as $tag) {
                $arr[] = $tag['id'];
            }
            $tags = $arr;
        }

        $project->technologies()->sync($technologies);
        $project->tag()->sync($tags);


        //        $project = Project::create($request->validated());
        //        $project->technologie()->sync($request->technologies);
        //        $project->tag()->sync($request->tags);

        switch (gettype($request->image_case)) {
            case 'object':
                $project->addMedia($request->image_case)
                    ->toMediaCollection(Project::IMAGE_COLLECTION_CASE)
                ;
                break;
            case 'NULL':
                $project->clearMediaCollection(Project::IMAGE_COLLECTION_CASE);
                break;
            case 'string':
                break;
        }

        switch (gettype($request->image_award)) {
            case 'object':
                $project->addMedia($request->image_award)
                    ->toMediaCollection(Project::IMAGE_COLLECTION_AWARD)
                ;
                break;
            case 'NULL':
                $project->clearMediaCollection(Project::IMAGE_COLLECTION_AWARD);
                break;
            case 'string':
                break;
        }

        switch (gettype($request->image_project)) {
            case 'object':
                $project->addMedia($request->image_project)
                    ->toMediaCollection(Project::IMAGE_COLLECTION_PROJECT)
                ;
                break;
            case 'NULL':
                $project->clearMediaCollection(Project::IMAGE_COLLECTION_PROJECT);
                break;
            case 'string':
                break;
        }

        if (empty($request->gallery)) {
            $project->clearMediaCollection(Project::IMAGE_COLLECTION_GALLERY);
        }else{
            $mediaCollection = new Collection();
            foreach ($request->gallery as $file) {
                if (is_array($file) && array_key_exists('id', $file)) {
                    $mediaItem = Media::find($file['id']);
                    $mediaCollection->push($mediaItem);
                }
            }
            if ($mediaCollection->isNotEmpty()) {
                $project->clearMediaCollectionExcept(Project::IMAGE_COLLECTION_GALLERY, $mediaCollection);
            }
            foreach ($request->gallery as $index => $file) {
                switch (gettype($file)) {
                    case 'object':
                        $project->addMedia($file)
                            ->withCustomProperties(['sort' => $index, 'type' => 'image'])
                            ->toMediaCollection(Project::IMAGE_COLLECTION_GALLERY)
                        ;
                        break;
                    case 'array':
                        if (array_key_exists('id', $file)) {
                            $mediaItem = Media::find($file['id']);
                            $mediaItem->setCustomProperty('sort', $index);
                            $mediaItem->save();
                        }else{
                            $project->addMediaFromUrl($file['image'])
                                ->withCustomProperties(['sort' => $index, 'type' => 'video', 'video' => $file['video'], 'thumbnail' => $file['thumbnail']])
                                ->toMediaCollection(Project::IMAGE_COLLECTION_GALLERY)
                            ;
                        }
                        break;
                }
            }
        }

        return Redirect::route('projects.index')->with('success', 'Project created.');
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Projects/ProjectsCreate', [
            'technologiesList' => TechnologiesResource::collection(Technologies::all()),
            'tagsList' => TagsResource::collection(Tag::all()),
        ]);
    }

    public function show(): \Inertia\Response
    {
        return Inertia::render('Projects/ProjectsList', [
            'projects' => new ProjectsCollection(
                Project::orderBy('sort_project')
                    ->paginate(30)
                    ->appends(Request::all())
            ),
            'technologiesList' => Technologies::all()->toArray(),
            'tagsList' => Tag::all()->toArray(),
        ]);
    }

    public function update(ProjectsStoreRequest $request, Project $project): \Illuminate\Http\RedirectResponse
    {
        $data = $request->validated();

        $project->nda = $data['nda'];
        $project->title = $data['title'];
        $project->sub_title = $data['sub_title'];
        $project->description = $data['description'];
        $project->short_description = $data['short_description'];
        $project->award = $data['award'];
        $project->feature = $data['feature'];
        $project->team = $data['team'];
        $project->term = $data['term'];
        $project->show_case = $data['show_case'];
        $project->sort_case = $data['sort_case'];
        $project->show_award = $data['show_award'];
        $project->sort_award = $data['sort_award'];
        $project->aspect_ratio = $data['aspect_ratio'];
        $project->show_project = $data['show_project'];
        $project->sort_project = $data['sort_project'];
        $project->url_web = $data['url_web'];
        $project->url_ios = $data['url_ios'];
        $project->url_android = $data['url_android'];
        $project->sort_project = $data['sort_project'];
        $project->save();

        $technologies = $request->technologies;
        $tags = $request->tags;

        if(!empty($request->technologies)) {
            $technologies=[];
            foreach ($request->technologies as $technology) {
                $technologies[] = $technology['id'];
            }
        }

        if(!empty($request->tags)) {
            $tags=[];
            foreach ($request->tags as $tag) {
                $tags[] = $tag['id'];
            }
        }
        $project->technologies()->sync($technologies);
        $project->tags()->sync($tags);
        // $project->update($request->toArray());

        switch (gettype($request->image_case)) {
            case 'object':
                $project->addMedia($request->image_case)
                    ->toMediaCollection(Project::IMAGE_COLLECTION_CASE)
                ;
                break;
            case 'NULL':
                $project->clearMediaCollection(Project::IMAGE_COLLECTION_CASE);
                break;
            case 'string':
                break;
        }

        switch (gettype($request->image_award)) {
            case 'object':
                $project->addMedia($request->image_award)
                    ->toMediaCollection(Project::IMAGE_COLLECTION_AWARD)
                ;
                break;
            case 'NULL':
                $project->clearMediaCollection(Project::IMAGE_COLLECTION_AWARD);
                break;
            case 'string':
                break;
        }

        switch (gettype($request->image_project)) {
            case 'object':
                $project->addMedia($request->image_project)
                    ->toMediaCollection(Project::IMAGE_COLLECTION_PROJECT)
                ;
                break;
            case 'NULL':
                $project->clearMediaCollection(Project::IMAGE_COLLECTION_PROJECT);
                break;
            case 'string':
                break;
        }

        if (empty($request->gallery)) {
            $project->clearMediaCollection(Project::IMAGE_COLLECTION_GALLERY);
        }else{
            $mediaCollection = new Collection();
            foreach ($request->gallery as $file) {
                if (is_array($file) && array_key_exists('id', $file)) {
                    $mediaItem = Media::find($file['id']);
                    $mediaCollection->push($mediaItem);
                }
            }
            if ($mediaCollection->isNotEmpty()) {
                $project->clearMediaCollectionExcept(Project::IMAGE_COLLECTION_GALLERY, $mediaCollection);
            }
            foreach ($request->gallery as $index => $file) {
                switch (gettype($file)) {
                    case 'object':
                        $project->addMedia($file)
                            ->withCustomProperties(['sort' => $index, 'type' => 'image'])
                            ->toMediaCollection(Project::IMAGE_COLLECTION_GALLERY)
                        ;
                        break;
                    case 'array':
                        if (array_key_exists('id', $file)) {
                            $mediaItem = Media::find($file['id']);
                            $mediaItem->setCustomProperty('sort', $index);
                            $mediaItem->save();
                        }else{
                            $project->addMediaFromUrl($file['image'])
                                ->withCustomProperties(['sort' => $index, 'type' => 'video', 'video' => $file['video'], 'thumbnail' => $file['thumbnail']])
                                ->toMediaCollection(Project::IMAGE_COLLECTION_GALLERY)
                            ;
                        }
                        break;
                }
            }
        }

        return Redirect::route('projects.index')->with('success', 'Project update.');
    }

    public function edit(Project $project): \Inertia\Response
    {
        return Inertia::render('Projects/ProjectsEdit', [
            'project' => new ProjectResource($project),
            'technologiesList' => TechnologiesResource::collection(Technologies::all()),
            'tagsList' => TagsResource::collection(Tag::all()),
        ]);
    }

    public function destroy($request): \Illuminate\Http\RedirectResponse
    {
        $req = json_decode($request);
        $tags = [];
        is_array($req) ? $tags = array_merge($tags, $req) : array_push($tags , $req);

        Project::whereIn('id',$tags)->get()->each->delete();

        return Redirect::route('projects.index')->with('success', 'Delete successful');
    }

}
