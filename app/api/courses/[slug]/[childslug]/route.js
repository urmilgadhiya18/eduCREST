import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import Course from '@/models/course';

export async function GET(request, { params }) {
  const { slug, childslug } = await params;

// VIDEOS._ID DAR VAKHTE BADLAY CHHE ATLE APDE KAIK UNIQUE ID APVI PADSE
// VIDEOS._ID DAR VAKHTE BADLAY CHHE ATLE APDE KAIK UNIQUE ID APVI PADSE
// VIDEOS._ID DAR VAKHTE BADLAY CHHE ATLE APDE KAIK UNIQUE ID APVI PADSE
// VIDEOS._ID DAR VAKHTE BADLAY CHHE ATLE APDE KAIK UNIQUE ID APVI PADSE

  try {
    await connection();
    const course = await Course.findOne(
      { _id: slug, "videos._id": childslug },
      { "videos.$": 1, title: 1 }
    );
    

    if (!course) {
      return NextResponse.json({ error: 'Course or video not found' }, { status: 404 });
    }

    const video = course.videos[0];
    return NextResponse.json({ courseTitle: course.title, video });
  } catch (error) {
    console.error('Failed to fetch video:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}

