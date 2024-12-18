// import { NextResponse } from 'next/server';
// import connection from '@/lib/mongoose';
// import { User } from '@/models/user';
// import Course from '@/models/course';

// export async function POST(req) {
//   try {
//     await connection();
//     const { email } = await req.json();
//     const user = await User.find({email});



//     return NextResponse.json(courses);
//   } catch (error) {
//     console.error('Failed to fetch courses:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch courses' },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import { User } from '@/models/user';
import Course from '@/models/course';

export async function POST(request) {
  try {
    // Connect to the database
    await connection();

    // Get the email from the request body
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Find the user by email and populate the 'myCourses' field
    const user = await User.findOne({ email }).populate({
      path: 'mycourses',
      strictPopulate: false, // Allow populating non-strict paths
    });
    // const user = await User.findOne({ email }).populate('myCourses');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // The 'myCourses' field should now contain the user's courses
    const userCourses = user.mycourses;

    // If the user doesn't have any courses
    if (userCourses.length === 0) {
      return NextResponse.json(
        { message: 'No courses found for this user' },
        { status: 404 }
      );
    }
    
    // Return the user's courses as the response
    return NextResponse.json({ courses: userCourses });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
