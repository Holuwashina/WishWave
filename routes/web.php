<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\OnboardingController;
use App\Http\Middleware\CheckOnboarding;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Onboarding routes - not protected by CheckOnboarding
Route::middleware(['auth'])->group(function () {
    Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding');
    Route::post('/onboarding', [OnboardingController::class, 'store']);
});

// Main app routes - protected by CheckOnboarding middleware directly
Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware([CheckOnboarding::class])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::get('messages', [MessageController::class, 'index'])->name('messages');
        Route::get('messages/{message}', [MessageController::class, 'show'])->name('messages.show');
        Route::post('messages/{message}/resend', [MessageController::class, 'resend'])->name('messages.resend');
        Route::get('messages/{message}/recipients', [MessageController::class, 'recipients'])->name('messages.recipients');

        Route::get('contacts', [ContactController::class, 'index'])->name('contacts');

        Route::get('templates', [TemplateController::class, 'index'])->name('templates');

        Route::get('schedule', [ScheduleController::class, 'index'])->name('schedule');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
