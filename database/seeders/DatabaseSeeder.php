<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Database\Seeder;
use Database\Seeders\DegreeSeeder;
use Database\Seeders\SpecialitySeeder;
use Database\Seeders\ExaminationSeeder;
use Database\Seeders\InstituteSeeder;
use Database\Seeders\HospitalSeeder;
use Database\Seeders\TestSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!User::first()) {
           $this->call([
               RoleSeeder::class,
               PermissionSeeder::class,
               DegreeSeeder::class,
               SpecialitySeeder::class,
               ExaminationSeeder::class,
               InstituteSeeder::class,
               HospitalSeeder::class,
               TestSeeder::class,
           ]);

            $user = User::create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'gender' => 'male',
                'password' => 'admin123',
            ]);

            $role_sp = Role::where('name', 'super-admin')->first();
            $permissions = Permission::all();

            if ($role_sp) {
                $user->assignRole($role_sp);

                $role_sp->syncPermissions($permissions);
            }
        }
    }
}
