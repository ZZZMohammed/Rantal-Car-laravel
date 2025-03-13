<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        // Add CORS middleware to the global middleware stack
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
        $middleware->append(\App\Http\Middleware\CorsMiddleware::class);

        // CSRF protection exclusion for API routes
        $middleware->validateCsrfTokens([
            'api/*', // Exclude all API routes from CSRF protection
        ]);

        // Add Sanctum middleware to the 'api' group
        $middleware->api([
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        // Other middleware configurations (if any)...
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
