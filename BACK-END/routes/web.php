<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ContactController;

Route::get('/', function () {
    return view('welcome');
});


// API Routes
Route::prefix('api')->group(function () {
    
    Route::post('/register', [UserController::class, 'register']); 
    Route::post('/login', [UserController::class, 'login']); 
    
   
  


    
    Route::middleware('auth:sanctum')->group(function () {
    
        Route::post('/logout', [UserController::class, 'logout']); 
        Route::get('/profile', [UserController::class, 'profile']); 
        Route::apiResource('/bookings', BookingController::class); 
        Route::apiResource('/cars', CarController::class); 
        Route::post('/contacts', [ContactController::class, 'store']); 
    });
});



