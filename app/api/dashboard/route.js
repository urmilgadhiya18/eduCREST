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