//  TRANSCRIPT MALI JAY CHHE
//  TRANSCRIPT MALI JAY CHHE
//  TRANSCRIPT MALI JAY CHHE
//  TRANSCRIPT MALI JAY CHHE
// import { NextResponse } from 'next/server';
// import connection from '@/lib/mongoose';
// import Course from '@/models/course';

// export async function GET(request, { params }) {
//   const { slug, childslug } = await params;

//   try {
//     await connection();
//     const video = await Course.findOne(
//       { "videos.id": childslug },
//       { "videos.$": 1 }
//       // { _id: slug, "videos.id": childslug },
//       // { "videos.$": 1, title: 1 }
//     );
    
//     if (!video) {
//       return NextResponse.json({ error: 'Course or video not found' }, { status: 404 });
//     }

//     const videoData = video.videos[0];
//     console.log(videoData);
    
    
//     return NextResponse.json({ courseTitle: videoData.title, videoData });
//   } catch (error) {
//     console.error('Failed to generate quiz:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate quiz' },
//       { status: 500 }
//     );
//   }
// }



//  ZOD ERROR
//  ZOD ERROR
//  ZOD ERROR
//  ZOD ERROR
//  ZOD ERROR
// import { NextResponse } from 'next/server';
// import connection from '@/lib/mongoose';
// import Course from '@/models/course';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { generateText } from 'ai';

// // Initialize the Google Generative AI client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// // console.log(process.env.GEMINI_API_KEY);

// export async function GET(request, { params }) {
//   const { childslug } = await params;

//   try {
//     await connection();
//     const video = await Course.findOne(
//       { "videos.id": childslug },
//       { "videos.$": 1 }
//     );
    
//     if (!video || !video.videos || video.videos.length === 0) {
//       return NextResponse.json({ error: 'Course or video not found' }, { status: 404 });
//     }

//     const videoData = video.videos[0];

//     // Generate quiz using Gemini AI
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = `Based on the following transcript, generate a quiz with 5 multiple-choice questions. Format the response as a JSON array of objects, where each object has a 'question' field, an 'options' array with 4 choices, and a 'correctAnswer' field with the index of the correct option (0-based). Transcript: ${videoData.transcript}`;

//     const result = await generateText({
//       model: model,
//       prompt: prompt,
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     let quiz;
//     try {
//       quiz = JSON.parse(result.text);
//     } catch (error) {
//       console.error('Failed to parse quiz JSON:', error);
//       quiz = null;
//     }

//     console.log(quiz);
    
    
//     return NextResponse.json({ 
//       video: videoData,
//       quiz: quiz
//     });
//   } catch (error) {
//     console.error('Failed to fetch video or generate quiz:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch video or generate quiz' },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from 'next/server';
import connection from '@/lib/mongoose';
import Course from '@/models/course';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET(request, { params }) {
  const { childslug } = await params;

  try {
    await connection();
    const video = await Course.findOne(
      { "videos.id": childslug },
      { "videos.$": 1 }
    );
    
    if (!video || !video.videos || video.videos.length === 0) {
      return NextResponse.json({ error: 'Course or video not found' }, { status: 404 });
    }

    const videoData = video.videos[0];

    // Generate quiz using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Based on the following transcript, generate a quiz with 5 multiple-choice questions. Format the response as a JSON array of objects, where each object has a 'question' field, an 'options' array with 4 choices, and a 'correctAnswer' field with the index of the correct option (0-based). Transcript: ${videoData.transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/^```json/, '').replace(/```$/, '').trim();

    let quiz;
    try {
      quiz = JSON.parse(cleanedText);
    } catch (error) {
      console.error('Failed to parse quiz JSON:', error);
      quiz = null;
    }
    
    return NextResponse.json({ 
      video: videoData,
      quiz: quiz
    });
  } catch (error) {
    console.error('Failed to fetch video or generate quiz:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video or generate quiz' },
      { status: 500 }
    );
  }
}

