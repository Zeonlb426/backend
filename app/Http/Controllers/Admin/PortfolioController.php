<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Class PortfolioController
 * @package App\Http\Controllers
 */
class PortfolioController extends Controller
{

    public function index(): \Inertia\Response
    {
        return Inertia::render('Portfolio/PortfolioList', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

    public function store()
    {

    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Portfolio/PortfolioCreate', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

    public function show()
    {

    }

    public function update()
    {

    }

    public function edit(): \Inertia\Response
    {
        return Inertia::render('Portfolio/PortfolioEdit', [
            'canLogin' => Route::has('login'),
            'data' => 'something',
            'prefix' => \config('app.prefix'),
            'status' => session('status'),
        ]);
    }

    public function destroy()
    {

    }

}
