<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Class MessagesController
 * @package App\Http\Controllers
 */
class MessagesController extends Controller
{

    public function index(): \Inertia\Response
    {
        return Inertia::render('Messages/MessagesList', [
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

    public function destroy()
    {

    }

}
