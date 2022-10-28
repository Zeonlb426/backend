<?php

use App\Http\Controllers\Admin\BuilderController;
use App\Http\Controllers\Admin\MailingController;
use App\Http\Controllers\Admin\MessagesController;
use App\Http\Controllers\Admin\PortfolioController;
use App\Http\Controllers\Admin\ProjectsController;
use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\Admin\TechnologiesController;
use Illuminate\Support\Facades\Route;

    require __DIR__.'/auth.php';

    Route::middleware(['auth'])->group(function () {

        Route::get('/', fn() => redirect()->route('projects.index') )->name('home');

        /**
         * GET         /projects ....................................... projects.index › Admin\ProjectsController@index
         * POST        /projects ....................................... projects.store › Admin\ProjectsController@store
         * GET         /projects/create .............................. projects.create › Admin\ProjectsController@create
         * GET         /projects/{project} ............................... projects.show › Admin\ProjectsController@show
         * PUT         /projects/{project} ........................... projects.update › Admin\ProjectsController@update
         * DELETE      /projects/{project} ......................... projects.destroy › Admin\ProjectsController@destroy
         * GET         /projects/{project}/edit .......................... projects.edit › Admin\ProjectsController@edit
         **/
        Route::resource('/projects', ProjectsController::class);

        /**
         * GET         /technologies ........................... technologies.index › Admin\TechnologiesController@index
         * POST        /technologies ........................... technologies.store › Admin\TechnologiesController@store
         * GET         /technologies/create .................. technologies.create › Admin\TechnologiesController@create
         * GET         /technologies/{technology} ................ technologies.show › Admin\TechnologiesController@show
         * PUT         /technologies/{technology} ............ technologies.update › Admin\TechnologiesController@update
         * DELETE      /technologies/{technology} ...........technologies.destroy › Admin\TechnologiesController@destroy
         * GET         /technologies/{technology}/edit ........... technologies.edit › Admin\TechnologiesController@edit
         **/
        Route::resource('/technologies', TechnologiesController::class);

        /**
         * GET         /tags ................................................... tags.index › Admin\TagsController@index
         * POST        /tags ................................................... tags.store › Admin\TagsController@store
         * GET         /tags/create .......................................... tags.create › Admin\TagsController@create
         * GET         /tags/{tag} ............................................... tags.show › Admin\TagsController@show
         * PUT         /tags/{tag} ........................................... tags.update › Admin\TagsController@update
         * DELETE      /tags/{tag} ......................................... tags.destroy › Admin\TagsController@destroy
         * GET         /tags/{tag}/edit .......................................... tags.edit › Admin\TagsController@edit
         **/
        Route::resource('/tags', TagsController::class);

        /**
        * GET          /portfolio .................................... portfolio.index › Admin\PortfolioController@index
        * POST         /portfolio .................................... portfolio.store › Admin\PortfolioController@store
        * GET          /portfolio/create ........................... portfolio.create › Admin\PortfolioController@create
        * GET          /portfolio/{portfolio} .......................... portfolio.show › Admin\PortfolioController@show
        * PUT          /portfolio/{portfolio} ...................... portfolio.update › Admin\PortfolioController@update
        * DELETE       /portfolio/{portfolio} .................... portfolio.destroy › Admin\PortfolioController@destroy
        * GET          /portfolio/{portfolio}/edit ..................... portfolio.edit › Admin\PortfolioController@edit
        **/
        Route::resource('/portfolio', PortfolioController::class);

        /**
        * GET          /message ......................................... message.index › Admin\MessagesController@index
        * GET          /message/{message} ................................. message.show › Admin\MessagesController@show
        * PUT          /message/{message} ............................. message.update › Admin\MessagesController@update
        * DELETE       /message/{message} ........................... message.destroy › Admin\MessagesController@destroy
        **/
        Route::resource('/messages', MessagesController::class)->only(['index', 'show', 'update', 'destroy']);

        /**
        * GET          /mailing .......................................... mailing.index › Admin\MailingController@index
        * POST         /mailing .......................................... mailing.store › Admin\MailingController@store
        * GET          /mailing/create ................................. mailing.create › Admin\MailingController@create
        * GET          /mailing/{mailing} .................................. mailing.show › Admin\MailingController@show
        * PUT          /mailing/{mailing} .............................. mailing.update › Admin\MailingController@update
        * DELETE       /mailing/{mailing} ............................ mailing.destroy › Admin\MailingController@destroy
        * GET          /mailing/{mailing}/edit ............................. mailing.edit › Admin\MailingController@edit
        **/
        Route::resource('/mailing', MailingController::class);

        Route::get('/builder', [BuilderController::class, 'builder'])->name('builder-pages');
    });
