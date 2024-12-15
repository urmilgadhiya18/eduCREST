import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import Course from '@/models/course'

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    await connection();
    const course = await Course.findById(slug);    

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Failed to fetch course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}