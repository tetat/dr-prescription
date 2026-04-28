<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            // 👤 USERS
            ['name' => 'User Access', 'slug' => 'user-access', 'group' => 'users'],
            ['name' => 'Create User', 'slug' => 'create-user', 'group' => 'users'],
            ['name' => 'Show User', 'slug' => 'show-user', 'group' => 'users'],
            ['name' => 'Edit User', 'slug' => 'edit-user', 'group' => 'users'],
            ['name' => 'Delete User', 'slug' => 'delete-user', 'group' => 'users'],
            ['name' => 'Permanent Delete User', 'slug' => 'permanent-delete-user', 'group' => 'users'],
            ['name' => 'Restore User', 'slug' => 'restore-user', 'gruop' => 'users'],
            // 🏥 HOSPITALS
            ['name' => 'Hospital Access', 'slug' => 'hospital-access', 'group' => 'hospitals'],
            ['name' => 'Create Hospital', 'slug' => 'create-hospital', 'group' => 'hospitals'],
            ['name' => 'Show Hospital', 'slug' => 'show-hospital', 'group' => 'hospitals'],
            ['name' => 'Edit Hospital', 'slug' => 'edit-hospital', 'group' => 'hospitals'],
            ['name' => 'Delete Hospital', 'slug' => 'delete-hospital', 'group' => 'hospitals'],
            // 🛡 ROLES
            ['name' => 'Role Access', 'slug' => 'role-access', 'group' => 'roles'],
            ['name' => 'Create Role', 'slug' => 'create-role', 'group' => 'roles'],
            ['name' => 'Show Role', 'slug' => 'show-role', 'group' => 'roles'],
            ['name' => 'Edit Role', 'slug' => 'edit-role', 'group' => 'roles'],
            ['name' => 'Delete Role', 'slug' => 'delete-role', 'group' => 'roles'],
            // 🔐 PERMISSIONS
            ['name' => 'Permission Access', 'slug' => 'permission-access', 'group' => 'permissions'],
            ['name' => 'Create Permission', 'slug' => 'create-permission', 'group' => 'permissions'],
            ['name' => 'Show Permission', 'slug' => 'show-permission', 'group' => 'permissions'],
            ['name' => 'Edit Permission', 'slug' => 'edit-permission', 'group' => 'permissions'],
            ['name' => 'Delete Permission', 'slug' => 'delete-permission', 'group' => 'permissions'],
            // 🧪 TESTS
            ['name' => 'Test Access', 'slug' => 'test-access', 'group' => 'tests'],
            ['name' => 'Create Test', 'slug' => 'create-test', 'group' => 'tests'],
            ['name' => 'Show Test', 'slug' => 'show-test', 'group' => 'tests'],
            ['name' => 'Edit Test', 'slug' => 'edit-test', 'group' => 'tests'],
            ['name' => 'Delete Test', 'slug' => 'delete-test', 'group' => 'tests'],
            // 🧾 EXAMINATIONS
            ['name' => 'Examination Access', 'slug' => 'examination-access', 'group' => 'examinations'],
            ['name' => 'Create Examination', 'slug' => 'create-examination', 'group' => 'examinations'],
            ['name' => 'Show Examination', 'slug' => 'show-examination', 'group' => 'examinations'],
            ['name' => 'Edit Examination', 'slug' => 'edit-examination', 'group' => 'examinations'],
            ['name' => 'Delete Examination', 'slug' => 'delete-examination', 'group' => 'examinations'],
            // 🎓 DEGREES
            ['name' => 'Degree Access', 'slug' => 'degree-access', 'group' => 'degrees'],
            ['name' => 'Create Degree', 'slug' => 'create-degree', 'group' => 'degrees'],
            ['name' => 'Show Degree', 'slug' => 'show-degree', 'group' => 'degrees'],
            ['name' => 'Edit Degree', 'slug' => 'edit-degree', 'group' => 'degrees'],
            ['name' => 'Delete Degree', 'slug' => 'delete-degree', 'group' => 'degrees'],
            // 🩺 DOCTOR PROFILES
            ['name' => 'Doctor Profile Access', 'slug' => 'doctor-profile-access', 'group' => 'doctor_profiles'],
            ['name' => 'Create Doctor Profile', 'slug' => 'create-doctor-profile', 'group' => 'doctor_profiles'],
            ['name' => 'Show Doctor Profile', 'slug' => 'show-doctor-profile', 'group' => 'doctor_profiles'],
            ['name' => 'Edit Doctor Profile', 'slug' => 'edit-doctor-profile', 'group' => 'doctor_profiles'],
            ['name' => 'Delete Doctor Profile', 'slug' => 'delete-doctor-profile', 'group' => 'doctor_profiles'],
            // ⚙️ DOCTOR SETTINGS
            ['name' => 'Doctor Settings Access', 'slug' => 'doctor-settings-access', 'group' => 'doctor_settings'],
            ['name' => 'Edit Doctor Settings', 'slug' => 'edit-doctor-settings', 'group' => 'doctor_settings'],
            // 💊 MEDICINES
            ['name' => 'Medicine Access', 'slug' => 'medicine-access', 'group' => 'medicines'],
            ['name' => 'Create Medicine', 'slug' => 'create-medicine', 'group' => 'medicines'],
            ['name' => 'Show Medicine', 'slug' => 'show-medicine', 'group' => 'medicines'],
            ['name' => 'Edit Medicine', 'slug' => 'edit-medicine', 'group' => 'medicines'],
            ['name' => 'Delete Medicine', 'slug' => 'delete-medicine', 'group' => 'medicines'],
            // 💳 PAYMENTS
            ['name' => 'Payment Access', 'slug' => 'payment-access', 'group' => 'payments'],
            ['name' => 'Create Payment', 'slug' => 'create-payment', 'group' => 'payments'],
            ['name' => 'Show Payment', 'slug' => 'show-payment', 'group' => 'payments'],
            ['name' => 'Refund Payment', 'slug' => 'refund-payment', 'group' => 'payments'],
            ['name' => 'Delete Payment', 'slug' => 'delete-payment', 'group' => 'payments'],
            // 📞 PHONES
            ['name' => 'Phone Access', 'slug' => 'phone-access', 'group' => 'phones'],
            ['name' => 'Create Phone', 'slug' => 'create-phone', 'group' => 'phones'],
            ['name' => 'Edit Phone', 'slug' => 'edit-phone', 'group' => 'phones'],
            ['name' => 'Delete Phone', 'slug' => 'delete-phone', 'group' => 'phones'],
            // 📄 PRESCRIPTIONS
            ['name' => 'Prescription Access', 'slug' => 'prescription-access', 'group' => 'prescriptions'],
            ['name' => 'Create Prescription', 'slug' => 'create-prescription', 'group' => 'prescriptions'],
            ['name' => 'Show Prescription', 'slug' => 'show-prescription', 'group' => 'prescriptions'],
            ['name' => 'Edit Prescription', 'slug' => 'edit-prescription', 'group' => 'prescriptions'],
            ['name' => 'Delete Prescription', 'slug' => 'delete-prescription', 'group' => 'prescriptions'],
            // 💊 PRESCRIPTION MEDICINES
            ['name' => 'Prescription Medicine Access', 'slug' => 'prescription-medicine-access', 'group' => 'prescription_medicines'],
            ['name' => 'Create Prescription Medicine', 'slug' => 'create-prescription-medicine', 'group' => 'prescription_medicines'],
            ['name' => 'Edit Prescription Medicine', 'slug' => 'edit-prescription-medicine', 'group' => 'prescription_medicines'],
            ['name' => 'Delete Prescription Medicine', 'slug' => 'delete-prescription-medicine', 'group' => 'prescription_medicines'],
            // 🧬 SPECIALITIES
            ['name' => 'Speciality Access', 'slug' => 'speciality-access', 'group' => 'specialities'],
            ['name' => 'Create Speciality', 'slug' => 'create-speciality', 'group' => 'specialities'],
            ['name' => 'Show Speciality', 'slug' => 'show-speciality', 'group' => 'specialities'],
            ['name' => 'Edit Speciality', 'slug' => 'edit-speciality', 'group' => 'specialities'],
            ['name' => 'Delete Speciality', 'slug' => 'delete-speciality', 'group' => 'specialities'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                [
                    'slug' => $permission['slug'],
                    'guard_name' => 'web',
                ],
                [
                    'name' => $permission['name'],
                    'group' => $permission['group'],
                ]
            );
        }
    }
}
