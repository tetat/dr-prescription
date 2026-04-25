<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserGender;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'gender',
        'dob',
        'blood_group',
        'address',
        'password',
    ];

    public function doctorProfile()
    {
        return $this->hasOne(DoctorProfile::class);
    }

    public function doctorSetting()
    {
        return $this->hasOne(DoctorSetting::class, 'doctor_id');
    }

    // as doctor
    public function prescriptionsGiven()
    {
        return $this->hasMany(Prescription::class, 'doctor_id');
    }

    // as patient
    public function prescriptionsTaken()
    {
        return $this->hasMany(Prescription::class, 'patient_id');
    }

    // polymorphic phones
    public function phones()
    {
        return $this->morphMany(Phone::class, 'phoneable');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'gender' => UserGender::class,
        ];
    }
}
