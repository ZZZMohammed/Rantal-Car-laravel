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
    // Public routes (no authentication required)
    Route::post('/register', [UserController::class, 'register']); // User registration
    Route::post('/login', [UserController::class, 'login']); // User login
    Route::apiResource('cars', CarController::class); // Cars routes
    Route::apiResource('bookings', BookingController::class); // Bookings routes
    Route::post('/contacts', [ContactController::class, 'store']); // Only store method for contacts


    // Protected routes (require authentication)
    Route::middleware('auth:sanctum')->group(function () {
    
        Route::post('/logout', [UserController::class, 'logout']); // User logout
        Route::get('/profile', [UserController::class, 'profile']); // User profile
    });
});




// loca;ization

Route::get('/change-lang/{lang}', function ($lang) {
    session(['locale' => $lang]);
    return back();
});