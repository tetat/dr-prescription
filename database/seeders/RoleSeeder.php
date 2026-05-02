<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'Super Admin',
            'Admin',
            'Doctor',
            'Patient',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate([
                'label' => $role,
                'name' => Str::slug($role),
                'guard_name' => 'web',
            ]);
        }
    }
}
