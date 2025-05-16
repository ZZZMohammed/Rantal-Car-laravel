<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(){
        $user = Auth::user();
        
        if ($user->role === 'admin') {
            
            $bookings = Booking::with(['user', 'car'])->get();
        } else {
           
            $bookings = Booking::with(['car'])
                ->where('user_id', $user->id)
                ->get();
        }
        
        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'total_price' => 'required|numeric',
        ]);

        $booking = Booking::create($request->all());
        return response()->json($booking, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::with(['user', 'car'])->findOrFail($id);
        return response()->json($booking);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'user_id' => 'exists:users,id',
            'car_id' => 'exists:cars,id',
            'start_date' => 'date',
            'end_date' => 'date|after:start_date',
            'total_price' => 'numeric',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update($request->all());
        return response()->json($booking);
    }

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(string $id){

        $booking = Booking::findOrFail($id);
        $user = Auth::user();
        
        if(!($user->role === 'admin' || $booking->user_id === $user->id)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking->delete();
        return response()->json(['message' => 'Booking was deleted']);  
        
}
}
