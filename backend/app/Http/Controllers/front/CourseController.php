<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function store(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:5'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ]);
        }

        try {
            $course = new Course();
            $course->title = $request->title;
            $course->status = 0;
            $course->user_id = $request->user()->id;
            $course->save();

            return response()->json([
                'status' => 200,
                'message' => 'Course created successfully!',
                'data' => $course
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Something went wrong while creating course',
                'error' => $e->getMessage()
            ]);
        }
    }
}
