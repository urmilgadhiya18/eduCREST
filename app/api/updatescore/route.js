import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import { User } from '@/models/user';

export async function POST(req) {
  try {
    await connection();

    const { email, score } = await req.json();

    if (typeof score !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const old_score = user.score
    user.score = score + old_score

    await user.save();

    return NextResponse.json({ message: 'Score updated successfully' });
  } catch (error) {
    console.error('Failed to submit quiz:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

