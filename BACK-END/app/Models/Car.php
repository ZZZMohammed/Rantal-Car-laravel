<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Car extends Model
{
    use HasFactory ;
    protected $fillable = [
        'image',
        'brand',
        'model',
        'year',
        'price_per_day',
        'is_available',
    ] ;

    public function bookings(){

        return $this->hasMnay(Booking::class) ;
    }
}
