<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory ;

    protected $fillable = [

        'user_id',
        'car_id' ,
        'start_date' ,
        'end_date' ,
        'total_price' ,
    ] ;

    public function user(){
        return $this->belongsTo(User::class) ;
    }

    public function car(){
        return $this->belongsTo(Car::class) ;
    }
}
