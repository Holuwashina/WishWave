<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckOnboarding
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $user = auth()->user();
            
            // Check if user has completed onboarding
            if (!$user->onboarding_completed_at) {
                // If not on onboarding page, redirect to onboarding
                if (!$request->is('onboarding')) {
                    return redirect()->route('onboarding');
                }
            } else {
                // If onboarding is complete and user tries to access onboarding page
                if ($request->is('onboarding')) {
                    return redirect()->route('dashboard');
                }
            }
        }

        return $next($request);
    }
} 