<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeddingPackage extends Model
{
    protected $fillable = [
        'venue_id', 'name', 'slug', 'price_per_table', 'min_tables',
        'highlights', 'description', 'cover_image', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'price_per_table' => 'integer',
        'min_tables' => 'integer',
        'sort_order' => 'integer',
    ];

    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }
}
