<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TagsStoreRequest;
use App\Http\Resources\TagsResource;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

/**
 * Class TagsController
 * @package App\Http\Controllers
 */
class TagsController extends Controller
{

    public function index(): \Inertia\Response
    {
        return Inertia::render('Tags/TagsList',[
            'tags' => TagsResource::collection(Tag::paginate(50))
        ]);
    }

    public function store(TagsStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        $tag = Tag::create($request->toArray());

        switch (gettype($request->logo)) {
            case 'object':
                $tag->addMedia($request->logo)
                    ->toMediaCollection(Tag::IMAGE_COLLECTION_LOGO)
                ;
                break;
            case 'NULL':
                $tag->clearMediaCollection(Tag::IMAGE_COLLECTION_LOGO);
                break;
            case 'string':
                break;
        }

        return Redirect::route('tags.index')->with('success', 'Tag created.');
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Tags/TagsCreate');
    }

    public function show()
    {

    }

    public function update(TagsStoreRequest $request, Tag $tag): \Illuminate\Http\RedirectResponse
    {
        switch (gettype($request->logo)) {
            case 'object':
                $tag->addMedia($request->logo)
                    ->toMediaCollection(Tag::IMAGE_COLLECTION_LOGO)
                ;
                break;
            case 'NULL':
                $tag->clearMediaCollection(Tag::IMAGE_COLLECTION_LOGO);
                break;
            case 'string':
                break;
        }

        $tag->update($request->toArray());

        return Redirect::route('tags.index')->with('success', 'Update successful');
    }

    public function edit(Tag $tag): \Inertia\Response
    {
        return Inertia::render('Tags/TagsEdit', [
            'tag' => new TagsResource($tag),
        ]);
    }

    public function destroy($request)
    {
        $req = json_decode($request);
        $tags = [];
        is_array($req) ? $tags = array_merge($tags, $req) : array_push($tags , $req);

        Tag::whereIn('id',$tags)->get()->each->delete();

        return Redirect::route('tags.index')->with('success', 'Delete successful');
    }

}
