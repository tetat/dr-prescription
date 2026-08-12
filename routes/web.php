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
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
    // 'canRegister' => false,
])->name('home');

// Route::get('/test-doctor-permissions/{doctor}', function (
//     \App\Models\DoctorProfile $doctor
// ) {
//     $user = auth()->user();

//     return [
//         'viewAny' => $user->can('viewAny', \App\Models\DoctorProfile::class),
//         'view' => $user->can('view', $doctor),
//         'update' => $user->can('update', $doctor),
//         'delete' => $user->can('delete', $doctor),

//         'show_permission' => $user->hasPermissionTo('show-doctor-profile'),
//         'edit_permission' => $user->hasPermissionTo('edit-doctor-profile'),
//         'delete_permission' => $user->hasPermissionTo('delete-doctor-profile'),
//     ];
// });

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
    Route::resource('institutes', InstituteController::class);
    Route::resource('degrees', DegreeController::class)
        ->middlewareFor(['index'], 'can:viewAny,App\Models\Degree')
        ->middlewareFor(['show'], 'can:view,degree')
        ->middlewareFor(['create', 'store'], 'can:create,App\Models\Degree')
        ->middlewareFor(['edit', 'update'], 'can:update,degree')
        ->middlewareFor(['destroy'], 'can:delete,degree');
    Route::resource('specialities', SpecialityController::class);
    Route::resource('hospitals', HospitalController::class);
    Route::resource('patients', PatientController::class);
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('permissions', PermissionController::class)->only('index');
    Route::resource('tests', TestController::class);
    Route::resource('examinations', ExaminationController::class);
    Route::resource('medicine-groups', MedicineGroupController::class);
    Route::resource('med-forms', MedFormController::class);
    Route::resource('medicines', MedicineController::class);
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
