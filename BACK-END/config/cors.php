<?php


return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Paths to apply CORS to
    'allowed_methods' => ['*'], // Allow all HTTP methods
    'allowed_origins' => [
    'http://localhost:5173' ], 
    'allowed_origins_patterns' => [], // Regex patterns for allowed origins
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [], // Headers to expose to the client
    'max_age' => 0, // Max age for preflight requests
    'supports_credentials' => true, // Set to true if using cookies or sessions
];