<?php

use App\Http\Controllers\InstituteController;
use App\Http\Controllers\ExaminationController;
use App\Http\Controllers\DegreeController;
use App\Http\Controllers\DoctorProfileController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedicineGroupController;
use App\Http\Controllers\MedicineController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
    // 'canRegister' => false,
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('doctors', DoctorProfileController::class);
    Route::resource('institutes', InstituteController::class);
    Route::resource('degrees', DegreeController::class);
    Route::resource('specialities', SpecialityController::class);
    Route::resource('hospitals', HospitalController::class);
    Route::resource('patients', PatientController::class);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class)->only('index');
    Route::resource('tests', TestController::class);
    Route::resource('examinations', ExaminationController::class);
    Route::resource('medicine-groups', MedicineGroupController::class);
    Route::resource('medicines', MedicineController::class);
});

require __DIR__.'/settings.php';
