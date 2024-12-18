import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import { User } from '@/models/user';

export async function GET() {
  try {
    await connection();

    // Fetch required fields, sort by score in descending order
    const leaderboard = await User.find()
      .sort({ score: -1 }) // Sort in descending order by score
      .select('name score') // Only include required fields
      .lean(); // Improve performance by returning plain JS objects
    
    // Add rank dynamically based on position in the sorted list
    const rankedData = leaderboard.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      score: user.score,
    }));

    return NextResponse.json(rankedData);
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard data' },
      { status: 500 }
    );
  }
}
