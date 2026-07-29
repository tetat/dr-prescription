<?php

namespace Database\Seeders;

use App\Models\Institute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstituteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $institutes = [
            [
                'name' => 'Dhaka Medical College',
                'locale_name' => 'ঢাকা মেডিকেল কলেজ',
                'abbreviation' => 'DMC',
                'locale_abbreviation' => 'ঢামেক',
            ],
            [
                'name' => 'Chattogram Medical College',
                'locale_name' => 'চট্টগ্রাম মেডিকেল কলেজ',
                'abbreviation' => 'CMC',
                'locale_abbreviation' => 'চমেক',
            ],
            [
                'name' => 'Sylhet Medical College',
                'locale_name' => 'সিলেট মেডিকেল কলেজ',
                'abbreviation' => 'SMC',
                'locale_abbreviation' => 'সিমেক',
            ],
            [
                'name' => 'University of Dhaka',
                'locale_name' => 'ঢাকা বিশ্ববিদ্যালয়',
                'abbreviation' => 'DU',
                'locale_abbreviation' => 'ঢাবি',
            ],
        ];

        foreach ($institutes as $institute) {
            Institute::create($institute);
        }
    }
}
