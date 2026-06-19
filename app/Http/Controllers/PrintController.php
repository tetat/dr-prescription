<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrintController extends Controller
{
    public function prescription(string $prescription_id)
    {
        return dd($prescription_id);
    }
}
