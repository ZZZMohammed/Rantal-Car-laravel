<?php

namespace App\Http\Controllers\Api;

use App\Models\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $query = Car::query();

        if ($request->has('is_available')) {
            $isAvailable = filter_var(
                $request->query('is_available'),
                FILTER_VALIDATE_BOOLEAN,
                FILTER_NULL_ON_FAILURE
            );
            if (!is_null($isAvailable)) {
                $query->where('is_available', $isAvailable);
            }
        }

        $cars = $query->get()->map(function ($car) {
            if ($car->image) {
                $car->image = asset('storage/cars/' . $car->image);
            }
            return $car;
        });

        return response()->json($cars);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'brand' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|integer',
            'price_per_day' => 'required|numeric',
            'is_available' => 'boolean',
            'image' => 'nullable|string', // store relative path e.g. "cars/car4.jpeg"
        ]);

        $car = Car::create($request->all());

        if ($car->image) {
            $car->image = asset('storage/cars/' . $car->image);
        }

        return response()->json([
            'message' => 'Car created successfully',
            'car' => $car
        ], 201);
    }

    public function show($id)
    {
        $car = Car::findOrFail($id);

        if ($car->image) {
            $car->image = asset('storage/' . $car->image);
        }

        return response()->json($car);
    }

    public function update(Request $request, $id)
    {
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

        if ($car->image) {
            $car->image = asset('storage/' . $car->image);
        }

        return response()->json($car);
    }

    public function destroy($id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        Car::destroy($id);

        return response()->json(['message' => 'Car was deleted successfully']);
    }
}
