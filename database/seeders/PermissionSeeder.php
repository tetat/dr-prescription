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
            ['label' => 'User Access', 'name' => 'user-access', 'group' => 'users'],
            ['label' => 'Create User', 'name' => 'create-user', 'group' => 'users'],
            ['label' => 'Show User', 'name' => 'show-user', 'group' => 'users'],
            ['label' => 'Edit User', 'name' => 'edit-user', 'group' => 'users'],
            ['label' => 'Delete User', 'name' => 'delete-user', 'group' => 'users'],
            ['label' => 'Permanent Delete User', 'name' => 'permanent-delete-user', 'group' => 'users'],
            ['label' => 'Restore User', 'name' => 'restore-user', 'group' => 'users'],
            // 🏥 HOSPITALS
            ['label' => 'Hospital Access', 'name' => 'hospital-access', 'group' => 'hospitals'],
            ['label' => 'Create Hospital', 'name' => 'create-hospital', 'group' => 'hospitals'],
            ['label' => 'Show Hospital', 'name' => 'show-hospital', 'group' => 'hospitals'],
            ['label' => 'Edit Hospital', 'name' => 'edit-hospital', 'group' => 'hospitals'],
            ['label' => 'Delete Hospital', 'name' => 'delete-hospital', 'group' => 'hospitals'],
            // 🛡 ROLES
            ['label' => 'Role Access', 'name' => 'role-access', 'group' => 'roles'],
            ['label' => 'Create Role', 'name' => 'create-role', 'group' => 'roles'],
            ['label' => 'Show Role', 'name' => 'show-role', 'group' => 'roles'],
            ['label' => 'Edit Role', 'name' => 'edit-role', 'group' => 'roles'],
            ['label' => 'Delete Role', 'name' => 'delete-role', 'group' => 'roles'],
            // 🔐 PERMISSIONS
            ['label' => 'Permission Access', 'name' => 'permission-access', 'group' => 'permissions'],
            ['label' => 'Create Permission', 'name' => 'create-permission', 'group' => 'permissions'],
            ['label' => 'Show Permission', 'name' => 'show-permission', 'group' => 'permissions'],
            ['label' => 'Edit Permission', 'name' => 'edit-permission', 'group' => 'permissions'],
            ['label' => 'Delete Permission', 'name' => 'delete-permission', 'group' => 'permissions'],
            // 🧪 TESTS
            ['label' => 'Test Access', 'name' => 'test-access', 'group' => 'tests'],
            ['label' => 'Create Test', 'name' => 'create-test', 'group' => 'tests'],
            ['label' => 'Show Test', 'name' => 'show-test', 'group' => 'tests'],
            ['label' => 'Edit Test', 'name' => 'edit-test', 'group' => 'tests'],
            ['label' => 'Delete Test', 'name' => 'delete-test', 'group' => 'tests'],
            // 🧾 EXAMINATIONS
            ['label' => 'Examination Access', 'name' => 'examination-access', 'group' => 'examinations'],
            ['label' => 'Create Examination', 'name' => 'create-examination', 'group' => 'examinations'],
            ['label' => 'Show Examination', 'name' => 'show-examination', 'group' => 'examinations'],
            ['label' => 'Edit Examination', 'name' => 'edit-examination', 'group' => 'examinations'],
            ['label' => 'Delete Examination', 'name' => 'delete-examination', 'group' => 'examinations'],
            // 🎓 DEGREES
            ['label' => 'Degree Access', 'name' => 'degree-access', 'group' => 'degrees'],
            ['label' => 'Create Degree', 'name' => 'create-degree', 'group' => 'degrees'],
            ['label' => 'Show Degree', 'name' => 'show-degree', 'group' => 'degrees'],
            ['label' => 'Edit Degree', 'name' => 'edit-degree', 'group' => 'degrees'],
            ['label' => 'Delete Degree', 'name' => 'delete-degree', 'group' => 'degrees'],
            // 🩺 DOCTOR PROFILES
            ['label' => 'Doctor Profile Access', 'name' => 'doctor-profile-access', 'group' => 'doctor_profiles'],
            ['label' => 'Create Doctor Profile', 'name' => 'create-doctor-profile', 'group' => 'doctor_profiles'],
            ['label' => 'Show Doctor Profile', 'name' => 'show-doctor-profile', 'group' => 'doctor_profiles'],
            ['label' => 'Edit Doctor Profile', 'name' => 'edit-doctor-profile', 'group' => 'doctor_profiles'],
            ['label' => 'Delete Doctor Profile', 'name' => 'delete-doctor-profile', 'group' => 'doctor_profiles'],
            // ⚙️ DOCTOR SETTINGS
            ['label' => 'Doctor Settings Access', 'name' => 'doctor-settings-access', 'group' => 'doctor_settings'],
            ['label' => 'Edit Doctor Settings', 'name' => 'edit-doctor-settings', 'group' => 'doctor_settings'],
            // 💊 MEDICINES
            ['label' => 'Medicine Access', 'name' => 'medicine-access', 'group' => 'medicines'],
            ['label' => 'Create Medicine', 'name' => 'create-medicine', 'group' => 'medicines'],
            ['label' => 'Show Medicine', 'name' => 'show-medicine', 'group' => 'medicines'],
            ['label' => 'Edit Medicine', 'name' => 'edit-medicine', 'group' => 'medicines'],
            ['label' => 'Delete Medicine', 'name' => 'delete-medicine', 'group' => 'medicines'],
            // 💳 PAYMENTS
            ['label' => 'Payment Access', 'name' => 'payment-access', 'group' => 'payments'],
            ['label' => 'Create Payment', 'name' => 'create-payment', 'group' => 'payments'],
            ['label' => 'Show Payment', 'name' => 'show-payment', 'group' => 'payments'],
            ['label' => 'Refund Payment', 'name' => 'refund-payment', 'group' => 'payments'],
            ['label' => 'Delete Payment', 'name' => 'delete-payment', 'group' => 'payments'],
            // 📞 PHONES
            ['label' => 'Phone Access', 'name' => 'phone-access', 'group' => 'phones'],
            ['label' => 'Create Phone', 'name' => 'create-phone', 'group' => 'phones'],
            ['label' => 'Edit Phone', 'name' => 'edit-phone', 'group' => 'phones'],
            ['label' => 'Delete Phone', 'name' => 'delete-phone', 'group' => 'phones'],
            // 📄 PRESCRIPTIONS
            ['label' => 'Prescription Access', 'name' => 'prescription-access', 'group' => 'prescriptions'],
            ['label' => 'Create Prescription', 'name' => 'create-prescription', 'group' => 'prescriptions'],
            ['label' => 'Show Prescription', 'name' => 'show-prescription', 'group' => 'prescriptions'],
            ['label' => 'Edit Prescription', 'name' => 'edit-prescription', 'group' => 'prescriptions'],
            ['label' => 'Delete Prescription', 'name' => 'delete-prescription', 'group' => 'prescriptions'],
            // 💊 PRESCRIPTION MEDICINES
            ['label' => 'Prescription Medicine Access', 'name' => 'prescription-medicine-access', 'group' => 'prescription_medicines'],
            ['label' => 'Create Prescription Medicine', 'name' => 'create-prescription-medicine', 'group' => 'prescription_medicines'],
            ['label' => 'Edit Prescription Medicine', 'name' => 'edit-prescription-medicine', 'group' => 'prescription_medicines'],
            ['label' => 'Delete Prescription Medicine', 'name' => 'delete-prescription-medicine', 'group' => 'prescription_medicines'],
            // 🧬 SPECIALITIES
            ['label' => 'Speciality Access', 'name' => 'speciality-access', 'group' => 'specialities'],
            ['label' => 'Create Speciality', 'name' => 'create-speciality', 'group' => 'specialities'],
            ['label' => 'Show Speciality', 'name' => 'show-speciality', 'group' => 'specialities'],
            ['label' => 'Edit Speciality', 'name' => 'edit-speciality', 'group' => 'specialities'],
            ['label' => 'Delete Speciality', 'name' => 'delete-speciality', 'group' => 'specialities'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                [
                    'label' => $permission['label'],
                    'name' => $permission['name'],
                    'guard_name' => 'web',
                    'group' => $permission['group'],
                ]
            );
        }
    }
}
