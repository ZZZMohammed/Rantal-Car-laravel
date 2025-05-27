<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    $query = Car::query();

    // Check if is_available filter exists in query parameters
    if ($request->has('is_available')) {
        $isAvailable = filter_var($request->query('is_available'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if (!is_null($isAvailable)) {
            $query->where('is_available', $isAvailable);
        }
    }

    $cars = $query->get();

    return response()->json($cars);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Check if user is admin
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'brand' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|integer',
            'price_per_day' => 'required|numeric',
            'is_available' => 'boolean',
            'image' => 'nullable|string',
        ]);

        $car = Car::create($request->all());
        return response()->json(['message' => 'Car created successfully', 'car' => $car], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Allow all authenticated users to view single car
        $car = Car::findOrFail($id);
        return response()->json($car);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Check if user is admin
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'brand' => 'string',
            'model' => 'string',
            'year' => 'integer',
            'price_per_day' => 'numeric',
            'is_available' => 'boolean',
            'image' => 'nullable|string',
        ]);

        $car = Car::findOrFail($id);
        $car->update($request->all());
        return response()->json($car);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Check if user is admin
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        Car::destroy($id);
        return response()->json(['message' => 'Car was deleted successfully']);
    }
}