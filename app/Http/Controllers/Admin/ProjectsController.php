<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectsStoreRequest;
use App\Http\Resources\ProjectsCollection;
use App\Http\Resources\TagsResource;
use App\Http\Resources\TechnologiesResource;
use App\Models\Project;
use App\Models\Tag;
use App\Models\Technologies;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

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
dd($request);
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


//        image_case:  null,
//        image_award:  null,
//        image_project:  null,
//        gallery:

//        $project = Project::create($request->all());

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
        return Inertia::render('Projects/TechnologiesList', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

    public function update(): \Inertia\Response
    {
        return Inertia::render('Projects/TechnologiesList', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

    public function edit(): \Inertia\Response
    {
        return Inertia::render('Projects/TechnologiesList', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

    public function destroy(): \Inertia\Response
    {
        return Inertia::render('Projects/TechnologiesList', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

}
