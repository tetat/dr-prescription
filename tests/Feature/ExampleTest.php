<?php

use App\Models\User;

// it('returns a successful response', function () {
//     // $response = $this->get('/');

//     // $response->assertStatus(200);
//     $response = $this->get('/');

//     $response->assertRedirect('/dashboard');
// });

it('redirects authenticated users to dashboard', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/')
        ->assertRedirect('/dashboard');
});

it('redirects guests to login', function () {
    $this->get('/')
        ->assertRedirect('/login');
});