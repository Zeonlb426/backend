<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\File;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Project extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    public const IMAGE_COLLECTION_CASE = 'case';
    public const IMAGE_COLLECTION_AWARD = 'award';
    public const IMAGE_COLLECTION_PROJECT = 'project';
    public const IMAGE_COLLECTION_GALLERY = 'gallery';

    protected $casts = [
        'nda' => 'boolean',
        'show_case' => 'boolean',
        'show_award' => 'boolean',
        'show_project' => 'boolean',
    ];

    protected $fillable = [
        'nda',
        'title',
        'sub_title',
        'description',
        'short_description',
        'award',
        'feature',
        'team',
        'term',
        'image_case',
        'show_case',
        'sort_case',
        'image_award',
        'show_award',
        'sort_award',
        'aspect_ratio',
        'image_project',
        'show_project',
        'sort_project',
        'url_web',
        'url_ios',
        'url_android',
        'technologies',
        'tags',
        'gallery',
    ];

    protected $guarded = [];

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection(self::IMAGE_COLLECTION_CASE)
            ->acceptsFile(function (File $file) {
                return \str_contains($file->mimeType, 'image');
            })
            ->singleFile()
        ;

        $this
            ->addMediaCollection(self::IMAGE_COLLECTION_AWARD)
            ->acceptsFile(function (File $file) {
                return \str_contains($file->mimeType, 'image');
            })
            ->singleFile()
        ;

        $this
            ->addMediaCollection(self::IMAGE_COLLECTION_PROJECT)
            ->acceptsFile(function (File $file) {
                return \str_contains($file->mimeType, 'image');
            })
            ->singleFile()
        ;

        $this
            ->addMediaCollection(self::IMAGE_COLLECTION_GALLERY)
            ->useFallbackUrl(Config::get('app.url').'/vendor/img/logo.svg')
            ->acceptsFile(function (File $file) {
                return \str_contains($file->mimeType, 'image');
            })
            ->onlyKeepLatest(10);
        ;
    }

    public function technologies()
    {
        return $this->belongsToMany(Technologies::class, 'project_technologies', 'project_id', 'technologies_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'project_tags', 'project_id', 'tag_id');
    }

   public function imageCaseMedia()
   {
       return $this
           ->morphOne(Media::class, 'model')
           ->where('collection_name', '=', self::IMAGE_COLLECTION_CASE)
       ;
   }

   public function imageAwardMedia()
   {
       return $this
           ->morphOne(Media::class, 'model')
           ->where('collection_name', '=', self::IMAGE_COLLECTION_AWARD)
       ;
   }

   public function imageProjectMedia()
   {
       return $this
           ->morphOne(Media::class, 'model')
           ->where('collection_name', '=', self::IMAGE_COLLECTION_PROJECT)
       ;
   }



    protected function award(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value),
            set: function($array) {
                $awardArray = [];
                foreach ($array as $item) {
                    $award = [];
                    foreach ($item as $key => $value) {
                        $award[$key] = $value === null ? '' : $value;
                    }
                    $awardArray[] = $award;
                }
                return json_encode($awardArray);
            }
        );
    }

    protected function aspectRatio(): Attribute
    {
        return Attribute::make(
            // get: fn ($value) => $value,
            set: function($value) {
                list($column, $row) = explode("X", $value);
                return [
                    'row' => (int)$row,
                    'column' => (int)$column,
                    'aspect_ratio' => $value
                ];
            }
        );
    }
    protected function term(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value),
            set: function($array) {
                $term = [];
                foreach ($array as $item) {
                    if ($item === null || $item === '') continue;
                    $term[] = $item;
                }
                return json_encode($term);
            }
        );
    }

    protected function team(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value),
            set: function($array) {
                $team = [];
                foreach ($array as $item) {
                    if ($item === null) continue;
                    $team[] = $item;
                }
                return json_encode($team);
            }
        );
    }

    protected function feature(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value),
            set: function($array) {
                $feature = [];
                foreach ($array as $item) {
                    if ($item === null) continue;
                    $feature[] = $item;
                }
                return json_encode($feature);
            }
        );
    }
//    public function scopeFilter($query, array $filters)
//    {
//        $query->when($filters['search'] ?? null, function ($query, $search) {
//            $query->where('title', 'ilike', '%'.$search.'%');
//        })->when($filters['technologies'] ?? null, function ($query, $technologies) {
//            $query->whereHas('technologie', function ($q) use($technologies) {
//                $q->where('slug', '=', $technologies);
//            });
//        })->when($filters['tags'] ?? null, function ($query, $tags) {
//            $query->whereHas('tag', function ($q) use($tags) {
//                $q->where('slug', '=', $tags);
//            });
//        })->when($filters['nda'] ?? null, function ($query, $nda) {
//            $query->where('nda', '=', $nda);
//        });
//    }
}
