<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->boolean('nda')->default(false);
            $table->string('title');
            $table->string('sub_title')->nullable();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->jsonb('team')->nullable();
            $table->jsonb('term')->nullable();
            $table->jsonb('feature')->nullable();
            $table->boolean('show_case')->default(true);
            $table->integer('sort_case')->default(0);
            $table->boolean('show_award')->default(false);
            $table->integer('sort_award')->default(0);
            $table->jsonb('award')->nullable();
            $table->string('url_web', 255)->nullable();
            $table->string('url_ios', 255)->nullable();
            $table->string('url_android', 255)->nullable();
            $table->boolean('show_project')->default(true);
            $table->string('aspect_ratio')->nullable();
            $table->integer('sort_project')->default(0);
            $table->integer('row')->nullable();
            $table->integer('column')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
