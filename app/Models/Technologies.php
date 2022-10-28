<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\File;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

final class Technologies extends Model implements HasMedia
{
    use HasFactory, HasSlug, InteractsWithMedia;

    public const IMAGE_COLLECTION_LOGO = 'logo';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'slug',
        'order',
        'bg_color',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate()
        ;
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection(self::IMAGE_COLLECTION_LOGO)
            ->acceptsFile(function (File $file) {
                return \str_contains($file->mimeType, 'image');
            })
            ->singleFile()
        ;
    }

    public function logoMedia()
    {
        return $this
            ->morphOne(Media::class, 'model')
            ->where('collection_name', '=', self::IMAGE_COLLECTION_LOGO)
        ;
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_technologies', 'technologies_id', 'project_id');
    }

    public function hasProject(): bool
    {
        return $this->projects()->exists();
    }
}
