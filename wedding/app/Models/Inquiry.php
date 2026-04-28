<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    protected $fillable = [
        'name', 'phone', 'email', 'event_date', 'guest_count',
        'venue_id', 'wedding_package_id', 'message', 'source',
        'status', 'handled_at',
    ];

    protected $casts = [
        'event_date' => 'date',
        'handled_at' => 'datetime',
        'guest_count' => 'integer',
    ];

    public function venue(): BelongsTo
    {
        return $this->belongsTo(Venue::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(WeddingPackage::class, 'wedding_package_id');
    }
}
