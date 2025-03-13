<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::all() ;
        return response()->json($cars) ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'brand'=>'required|string',
            'model'=>'required|string',
            'year'=>'required|integer',
            'price_per_day' => 'required|numeric',
            'is_available' => 'boolean',
            'image' => 'nullable|string',
        ]);

        $car = Car::create($request->all()) ;
        return response()->json(['message' => 'car created successfully', 'book' => $car], 201) ;
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        $car = Car::findOrFail($id) ;
        return response()->json($car) ;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'brand'=>'string',
            'model'=>'string',
            'year'=>'integer',
            'price_per_day' => 'numeric',
            'is_available' => 'boolean',
            'image' => 'nullable|string',
        ]);

        $car = Car::findOrFail($id) ;
        $car->update($request->all()) ;
        return response()->json($car);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        Car::destroy($id) ;
        return response()->json("car was deleted");

    }
}
