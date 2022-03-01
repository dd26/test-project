<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
        // buscar usuario por email y password
        $user = User::where('email', $request->email)->where('password', $request->password)->first();
        if ($user) {
            $user->api_token = Str::random(60);
            $user->save();
            return response()->json(['user' => $user, 'token' => $user->api_token]);
        } else {
            return response()->json([
                'user' => $user
            ]);
        }
    }
}
