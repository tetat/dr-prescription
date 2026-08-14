<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstituteController;
use App\Http\Controllers\ExaminationController;
use App\Http\Controllers\DegreeController;
use App\Http\Controllers\DoctorProfileController;
use App\Http\Controllers\DoctorSettingController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\HospitalController;
use App\Http\Controllers\MedFormController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MedicineGroupController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\PrintController;
use Illuminate\Support\Facades\Route;
// use Laravel\Fortify\Features;

// Route::inertia('/', 'welcome', [
//     'canRegister' => Features::enabled(Features::registration()),
//     // 'canRegister' => false,
// ])->name('home');

Route::get('/', fn () => auth()->check()
    ? redirect()->route('dashboard')
    : redirect()->route('login')
)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('dashboard', [DashboardController::class, 'dashboard'])
        ->name('dashboard');
    Route::get(
        'consultation-fee',
        [PrescriptionController::class, 'consultationFee']
    );

    Route::resource('doctors', DoctorProfileController::class)
        ->middlewareFor('index', 'can:viewAnyDoctors,App\Models\User')
        ->middlewareFor('show', 'can:viewDoctor,doctor')
        ->middlewareFor(['create', 'store'], 'can:createDoctor,App\Models\User')
        ->middlewareFor(['edit', 'update'], 'can:updateDoctor,doctor')
        ->middlewareFor('destroy', 'can:deleteDoctor,doctor');
    Route::resource('institutes', InstituteController::class)
        ->middlewareFor('index', 'permission:institute-access')
        ->middlewareFor('show', 'permission:show-institute')
        ->middlewareFor(['create', 'store'], 'permission:create-institute')
        ->middlewareFor(['edit', 'update'], 'permission:edit-institute')
        ->middlewareFor('destroy', 'permission:delete-institute');
    Route::resource('degrees', DegreeController::class)
        ->middlewareFor('index', 'permission:degree-access')
        ->middlewareFor('show', 'permission:show-degree')
        ->middlewareFor(['create', 'store'], 'permission:create-degree')
        ->middlewareFor(['edit', 'update'], 'permission:edit-degree')
        ->middlewareFor('destroy', 'permission:delete-degree');
    Route::resource('specialities', SpecialityController::class)
        ->middlewareFor('index', 'permission:speciality-access')
        ->middlewareFor('show', 'permission:show-speciality')
        ->middlewareFor(['create', 'store'], 'permission:create-speciality')
        ->middlewareFor(['edit', 'update'], 'permission:edit-speciality')
        ->middlewareFor('destroy', 'permission:delete-speciality');
    Route::resource('hospitals', HospitalController::class)
        ->middlewareFor('index', 'permission:hospital-access')
        ->middlewareFor('show', 'permission:show-hospital')
        ->middlewareFor(['create', 'store'], 'permission:create-hospital')
        ->middlewareFor(['edit', 'update'], 'permission:edit-hospital')
        ->middlewareFor('destroy', 'permission:delete-hospital');
    Route::resource('patients', PatientController::class)
        ->middlewareFor('index', 'permission:patient-access')
        ->middlewareFor('show', 'permission:show-patient')
        ->middlewareFor(['create', 'store'], 'permission:create-patient')
        ->middlewareFor(['edit', 'update'], 'permission:edit-patient')
        ->middlewareFor('destroy', 'permission:delete-patient');
    Route::resource('users', UserController::class)
        ->middlewareFor('index', 'can:viewAny,App\Models\User')
        ->middlewareFor('show', 'can:view,user')
        ->middlewareFor(['create', 'store'], 'can:create,App\Models\User')
        ->middlewareFor(['edit', 'update'], 'can:update,user')
        ->middlewareFor('destroy', 'can:delete,user');
    Route::resource('roles', RoleController::class)
        ->middlewareFor('index', 'permission:role-access')
        ->middlewareFor('show', 'permission:show-role')
        ->middlewareFor(['create', 'store'], 'permission:create-role')
        ->middlewareFor(['edit', 'update'], 'permission:edit-role')
        ->middlewareFor('destroy', 'permission:delete-role');
    Route::resource('permissions', PermissionController::class)->only('index')
        ->middlewareFor('index', 'permission:permission-access');
    Route::resource('tests', TestController::class)
        ->middlewareFor('index', 'permission:test-access')
        ->middlewareFor('show', 'permission:show-test')
        ->middlewareFor(['create', 'store'], 'permission:create-test')
        ->middlewareFor(['edit', 'update'], 'permission:edit-test')
        ->middlewareFor('destroy', 'permission:delete-test');
    Route::resource('examinations', ExaminationController::class)
        ->middlewareFor('index', 'permission:examination-access')
        ->middlewareFor('show', 'permission:show-examination')
        ->middlewareFor(['create', 'store'], 'permission:create-examination')
        ->middlewareFor(['edit', 'update'], 'permission:edit-examination')
        ->middlewareFor('destroy', 'permission:delete-examination');
    Route::resource('medicine-groups', MedicineGroupController::class)
        ->middlewareFor('index', 'permission:medicine-group-access')
        ->middlewareFor('show', 'permission:show-medicine-group')
        ->middlewareFor(['create', 'store'], 'permission:create-medicine-group')
        ->middlewareFor(['edit', 'update'], 'permission:edit-medicine-group')
        ->middlewareFor('destroy', 'permission:delete-medicine-group');
    Route::resource('med-forms', MedFormController::class)
        ->middlewareFor('index', 'permission:med-form-access')
        ->middlewareFor('show', 'permission:show-med-form')
        ->middlewareFor(['create', 'store'], 'permission:create-med-form')
        ->middlewareFor(['edit', 'update'], 'permission:edit-med-form')
        ->middlewareFor('destroy', 'permission:delete-med-form');
    Route::resource('medicines', MedicineController::class)
        ->middlewareFor('index', 'permission:medicine-access')
        ->middlewareFor('show', 'permission:show-medicine')
        ->middlewareFor(['create', 'store'], 'permission:create-medicine')
        ->middlewareFor(['edit', 'update'], 'permission:edit-medicine')
        ->middlewareFor('destroy', 'permission:delete-medicine');
    Route::resource('prescriptions', PrescriptionController::class)
        ->middleware('role:doctor');
    Route::get('print/prescription/{prescription_id}', [PrintController::class, 'prescription'])
        ->middleware('role:doctor')
        ->name('print.prescription');
    Route::resource('payments', PaymentController::class)
        ->middleware('role:doctor');
    Route::resource('doctor-settings', DoctorSettingController::class)
        ->only('edit', 'update');
});

require __DIR__ . '/settings.php';
