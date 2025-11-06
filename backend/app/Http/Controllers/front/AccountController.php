<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User; // ✅ Import the User model
use Illuminate\Support\Facades\Hash; // ✅ For password hashing

use function Laravel\Prompts\password;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        // ✅ Step 1: Validate user input
        $validator = Validator::make($request->all(), [
            'name'  => 'required|min:5',             // Name is required and must be at least 5 characters
            'email' => 'required|email|unique:users,email', // Email is required, must be valid, and unique in users table
            'password' =>'Required|min:8'
        ]);

        // ✅ Step 2: Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors() // Return all validation error messages
            ], 400);
        }

        // ✅ Step 3: Create new user record
        $user = new User();
        $user->name = $request->name;   // Assign the user's name from the request
        $user->email = $request->email; // Assign the user's email from the request
        $user->password = Hash::make($request->password);     // ✅ Securely hash the password before saving
        $user->save();                  // Save the new user to the database

        // ✅ Step 4: Return success response
        return response()->json([
            'status' => 200,
            'message' => 'User registered successfully!',
            'user' => $user // Return the created user data for confirmation
        ], 200);
    }
   
}
