<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Class BuilderController
 * @package App\Http\Controllers
 */
class BuilderController extends Controller
{

    public function builder(): \Inertia\Response
    {
        return Inertia::render('Builder/BuilderPages', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

}
