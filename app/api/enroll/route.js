import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import { User } from '@/models/user';

export async function POST(req) {
  try {
    await connection();

    const { email, courseId } = await req.json();
    
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.mycourses.includes(courseId)) {
      return NextResponse.json({ message: 'You are already enrolled in this course!' });
    }

    user.mycourses.push(courseId);

    await user.save();

    return NextResponse.json({ message: 'You enrolled in course successfully!' });
  } catch (error) {
    console.error('Failed to enroll the course:', error);
    return NextResponse.json(
      { error: 'Failed to enroll the course' },
      { status: 500 }
    );
  }
}

