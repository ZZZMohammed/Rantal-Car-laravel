<?php

namespace Database\Factories;

use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => 'cars/' . Arr::random(['car2.jpeg']),
            'brand' => $this->faker->randomElement(['Toyota', 'Honda', 'Ford', 'BMW', 'Audi']),
            'model' => $this->faker->word(),
            'year' => $this->faker->numberBetween(2010, 2023),
            'price_per_day' => $this->faker->randomFloat(2, 50, 200),
            'is_available' => $this->faker->boolean(),
        ];
        
    }
}
