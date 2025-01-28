<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PaymentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/users', [UserController::class, 'index'])->name('users.index');
    // Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    // Route::post('/users', [UserController::class, 'store'])->name('users.store');
    // Route::get('users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    // Route::put('users/{id}', [UserController::class, 'update'])->name('users.update');
    // Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::resource('/users', UserController::class);
    Route::resource('/customers', CustomerController::class);
    Route::resource('/projects', ProjectController::class);
    Route::resource('/payments', PaymentController::class);
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
