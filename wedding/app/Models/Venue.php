<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Venue extends Model
{
    protected $fillable = [
        'name', 'slug', 'location', 'capacity',
        'description', 'cover_image', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'capacity' => 'integer',
        'sort_order' => 'integer',
    ];

    public function packages(): HasMany
    {
        return $this->hasMany(WeddingPackage::class);
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }
}
