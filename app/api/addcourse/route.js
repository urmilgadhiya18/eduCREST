// import { v2 as cloudinary } from 'cloudinary'
// import { NextResponse } from 'next/server'
// import connection from '@/lib/mongoose'
// import Course from '@/models/course';
// import { Readable } from 'stream'

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// })

// function bufferToStream(buffer) {
//     const readable = new Readable()
//     readable.push(buffer)
//     readable.push(null) // Signifies the end of the stream
//     return readable
// }

// export async function POST(req) {
//   try {
//     const formData = await req.formData()
//     const courseTitle = formData.get('courseTitle')
//     const courseDescription = formData.get('courseDescription')
//     const courseInstructor = formData.get('courseInstructor')
//     const courseDuration = formData.get('courseDuration')
//     const thumbnail = formData.get('thumbnail')
//     const videos = formData.getAll('videos')    
//     const videoTitles = formData.getAll('videoTitles')    


//     const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer())

//     // Upload thumbnail to Cloudinary
//     const thumbnailResult = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: 'course-thumbnails' },
//         (error, result) => {
//           if (error) reject(error)
//           resolve(result)
//         }
//       )
//       bufferToStream(thumbnailBuffer).pipe(stream)
//     })    

//     // Upload videos to Cloudinary
//     // const videoResults = await Promise.all(
//     //     videos.map(async (video) => {
//     //       const videoBuffer = Buffer.from(await video.arrayBuffer())
//     //       const cloudinaryResult = await new Promise((resolve, reject) => {
//     //         const stream = cloudinary.uploader.upload_stream(
//     //           { folder: 'course-videos', resource_type: 'video' },
//     //           (error, result) => {
//     //             if (error) reject(error)
//     //             resolve(result)
//     //           }
//     //         )
//     //         bufferToStream(videoBuffer).pipe(stream)
//     //       })
  
//     //       // Get transcript for the video
//     //       const transcript = await getTranscript(videoBuffer)
  
//     //       return {
//     //         ...cloudinaryResult,
//     //         transcript
//     //       }
//     //     })
//     //   )
//     const videoResults = await Promise.all(
//         videos.map(async (video) => {
//           const videoBuffer = Buffer.from(await video.arrayBuffer())
//           return new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { folder: 'course-videos', resource_type: 'video' },
//               (error, result) => {
//                 if (error) reject(error)
//                 resolve(result)
//               }
//             )
//             bufferToStream(videoBuffer).pipe(stream)
//           })
//         })
//       )

//     // Prepare course data for database
//     const courseData = {
//       title: courseTitle,
//       description: courseDescription,
//       instructor: courseInstructor,
//       duration: courseDuration,
//     //   students: 0,
//       image: thumbnailResult.secure_url,
//       videos: videoResults.map((result, index) => ({
//         id: result.asset_id,
//         title: videoTitles[index],
//         url: result.secure_url,
//         transcript: 
//       }))
//     }

//     await connection()

//     // Insert course data into database
//     const newCourse = new Course(courseData);
//     const result = await newCourse.save();

//     return NextResponse.json({ 
//       message: 'Course added successfully', 
//     //   courseId: result.insertedId 
//     }, { status: 201 })

//   } catch (error) {
//     console.error('Error adding course:', error)
//     return NextResponse.json({ error: 'Failed to add course' }, { status: 500 })
//   }
// }







import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import connection from '@/lib/mongoose'
import Course from '@/models/course'
import { Readable } from 'stream'
import axios from 'axios'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Configure AssemblyAI
const assemblyAI = axios.create({
  baseURL: 'https://api.assemblyai.com/v2',
  headers: {
    authorization: process.env.ASSEMBLYAI_API_KEY,
    'content-type': 'application/json',
  },
})

function bufferToStream(buffer) {
  const readable = new Readable()
  readable.push(buffer)
  readable.push(null) // Signifies the end of the stream
  return readable
}

async function getTranscript(audioUrl) {
  try {
    // Start transcription job
    const response = await assemblyAI.post('/transcript', {
      audio_url: audioUrl,
    })

    // Wait for transcription to complete
    const transcriptId = response.data.id
    let transcriptResult
    while (true) {
      transcriptResult = await assemblyAI.get(`/transcript/${transcriptId}`)
      if (transcriptResult.data.status === 'completed') {
        break
      } else if (transcriptResult.data.status === 'error') {
        throw new Error('Transcription failed')
      }
      await new Promise(resolve => setTimeout(resolve, 3000)) // Wait for 3 seconds before checking again
    }

    return transcriptResult.data.text
  } catch (error) {
    console.error('Error getting transcript:', error)
    return ''
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData()
    const courseTitle = formData.get('courseTitle')
    const courseDescription = formData.get('courseDescription')
    const courseInstructor = formData.get('courseInstructor')
    const courseDuration = formData.get('courseDuration')
    const thumbnail = formData.get('thumbnail')
    const videos = formData.getAll('videos')    
    const videoTitles = formData.getAll('videoTitles')    

    const thumbnailBuffer = Buffer.from(await thumbnail.arrayBuffer())

    // Upload thumbnail to Cloudinary
    const thumbnailResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'course-thumbnails' },
        (error, result) => {
          if (error) reject(error)
          resolve(result)
        }
      )
      bufferToStream(thumbnailBuffer).pipe(stream)
    })    

    // Upload videos to Cloudinary and get transcripts
    const videoResults = await Promise.all(
      videos.map(async (video) => {
        const videoBuffer = Buffer.from(await video.arrayBuffer())
        const cloudinaryResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'course-videos', resource_type: 'video' },
            (error, result) => {
              if (error) reject(error)
              resolve(result)
            }
          )
          bufferToStream(videoBuffer).pipe(stream)
        })

        // Get transcript for the video
        const transcript = await getTranscript(cloudinaryResult.secure_url)

        return {
          ...cloudinaryResult,
          transcript
        }
      })
    )

    // Prepare course data for database
    const courseData = {
      title: courseTitle,
      description: courseDescription,
      instructor: courseInstructor,
      duration: courseDuration,
      image: thumbnailResult.secure_url,
      videos: videoResults.map((result, index) => ({
        id: result.asset_id,
        title: videoTitles[index],
        url: result.secure_url,
        transcript: result.transcript
      }))
    }

    await connection()

    // Insert course data into database
    const newCourse = new Course(courseData)
    const result = await newCourse.save()

    return NextResponse.json({ 
      message: 'Course added successfully', 
    }, { status: 201 })

  } catch (error) {
    console.error('Error adding course:', error)
    return NextResponse.json({ error: 'Failed to add course' }, { status: 500 })
  }
}