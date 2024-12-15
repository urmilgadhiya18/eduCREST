// import { Course } from "@/models/course";
// import connection from "@/lib/mongoose";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Connect to the database
//     await connection();

//     // Fetch all courses
//     const courses = await Course.find({});
//     console.log(courses);
    

//     // Return the courses as JSON
//     return NextResponse.json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     // Handle errors
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message || "Failed to fetch courses.",
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import Course from '@/models/course';

export async function GET() {
  try {
    await connection();
    const courses = await Course.find({});
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

