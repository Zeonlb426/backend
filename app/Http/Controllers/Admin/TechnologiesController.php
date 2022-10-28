<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TechnologiesStoreRequest;
use App\Http\Resources\TechnologiesResource;
use App\Models\Technologies;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


/**
 * Class TechnologiesController
 * @package App\Http\Controllers
 */
class TechnologiesController extends Controller
{

    public function index(): \Inertia\Response
    {
        return Inertia::render('Technologies/TechnologiesList',[
            'technologies' => TechnologiesResource::collection(Technologies::paginate(50))
        ]);
    }

    public function store(TechnologiesStoreRequest $request): \Illuminate\Http\RedirectResponse
    {
        $technology = Technologies::create($request->toArray());

        switch (gettype($request->logo)) {
            case 'object':
                $technology->addMedia($request->logo)
                    ->toMediaCollection(Technologies::IMAGE_COLLECTION_LOGO)
                ;
                break;
            case 'NULL':
                $technology->clearMediaCollection(Technologies::IMAGE_COLLECTION_LOGO);
                break;
            case 'string':
                break;
        }

        return Redirect::route('technologies.index')->with('success', 'Technology created.');
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Technologies/TechnologiesCreate');
    }

    public function show()
    {

    }

    public function update(TechnologiesStoreRequest $request, Technologies $technology): \Illuminate\Http\RedirectResponse
    {
        switch (gettype($request->logo)) {
            case 'object':
                $technology->addMedia($request->logo)
                    ->toMediaCollection(Technologies::IMAGE_COLLECTION_LOGO)
                ;
                break;
            case 'NULL':
                $technology->clearMediaCollection(Technologies::IMAGE_COLLECTION_LOGO);
                break;
            case 'string':
                break;
        }

        $technology->update($request->toArray());

        return Redirect::route('technologies.index')->with('success', 'Update successful');
    }

    public function edit(Technologies $technology): \Inertia\Response
    {
        return Inertia::render('Technologies/TechnologiesEdit', [
            'technology' => new TechnologiesResource($technology),
        ]);
    }

    public function destroy($request)
    {
        $req = json_decode($request);
        $technologies = [];
        is_array($req) ? $technologies = array_merge($technologies, $req) : array_push($technologies , $req);

        Technologies::whereIn('id',$technologies)->get()->each->delete();

        return Redirect::route('technologies.index')->with('success', 'Delete successful');
    }

}
