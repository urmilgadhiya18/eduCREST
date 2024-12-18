// // 'use client'

// // import React from 'react';
// // import { useState } from 'react'
// // // import { useParams } from 'next/navigation'
// // import dynamic from 'next/dynamic'
// // import { Play } from 'lucide-react'
// // import Link from 'next/link';

// // // Lazy load the video player component
// // const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
// //   loading: () => <p>Loading video player...</p>,
// //   ssr: false
// // })

// // const coursesData = {
// //   1: {
// //     title: 'Introduction to React',
// //     description: 'Learn the basics of React and build your first app',
// //     instructor: 'Jane Doe',
// //     videos: [
// //       { id: 1, title: 'React Fundamentals', url: 'https://res.cloudinary.com/drx7mkztw/video/upload/v1734249038/test_k7mrwk.mp4' },
// //       { id: 2, title: 'Components and Props', url: 'https://res.cloudinary.com/drx7mkztw/video/upload/v1734249038/test_k7mrwk.mp4' },
// //       { id: 3, title: 'State and Lifecycle', url: 'https://res.cloudinary.com/drx7mkztw/video/upload/v1734249038/test_k7mrwk.mp4' },
// //     ],
// //   },
// //   2: {
// //     title: 'Advanced JavaScript Concepts',
// //     description: 'Deep dive into advanced JavaScript features and patterns',
// //     instructor: 'John Smith',
// //     videos: [
// //       { id: 1, title: 'Closures and Scope', url: 'https://example.com/video4.mp4' },
// //       { id: 2, title: 'Prototypes and Inheritance', url: 'https://example.com/video5.mp4' },
// //       { id: 3, title: 'Async JavaScript', url: 'https://example.com/video6.mp4' },
// //     ],
// //   },
// // }

// // export default function Page({params}) {
    
// //     const resolvedParams = React.use(params);
// //     const { slug } = resolvedParams;
// //     const courseId = slug;
// //   const [selectedVideo, setSelectedVideo] = useState(null)
// // //   const [showTranscript, setShowTranscript] = useState(false)
// //   const course = coursesData[courseId]

// //   if (!course) {
// //     return <div>Course not found</div>
// //   }

// //   return (
// //     <div className="space-y-6 text-gray-800 dark:text-white">
// //       <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
// //       <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
// //       <p className="text-gray-600 dark:text-gray-300">Instructor: {course.instructor}</p>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <div className="md:col-span-2">
// //           {selectedVideo ? (
// //             <VideoPlayer url={selectedVideo.url} />
// //           ) : (
// //             <div>
// //             <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
// //               <p className="text-gray-500 dark:text-gray-400">Select a video to start watching</p>
// //             </div>
// //             {/* <Link
// //               href="/"
// //               className="bg-purple-600 text-white text-sm font-semibold py-2 px-3 rounded-full hover:bg-purple-700 transition duration-300 flex items-center justify-center w-[130px] my-3"
// //             >
// //               Show transcript
// //             </Link> */}
// //             </div>
// //           )}
// //         </div>
// //         <div className="space-y-4">
// //           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Content</h2>
// //           <ul className="space-y-2">
// //             {course.videos.map((video) => (
// //               <li key={video.id}>
// //                 <button
// //                   onClick={() => setSelectedVideo(video)}
// //                   className={`w-full text-left px-4 py-2 rounded-md transition duration-200 ${
// //                     selectedVideo && selectedVideo.id === video.id
// //                       ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
// //                       : 'hover:bg-gray-200 dark:hover:bg-gray-700'
// //                   }`}
// //                 >
// //                   <div className="flex items-center">
// //                     <Play className="w-4 h-4 mr-2" />
// //                     <span>{video.title}</span>
// //                   </div>
// //                 </button>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>      
// //     </div>
// //   )
// // }




'use client'

import React from 'react';
import { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Play, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react'
import Link from 'next/link';
import axios from 'axios';

// Lazy load the video player component
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  loading: () => <p>Loading video player...</p>,
  ssr: false
})

// const coursesData = {
//   1: {
//     title: 'Introduction to React',
//     description: 'Learn the basics of React and build your first app',
//     instructor: 'Jane Doe',
//     videos: [
//       { 
//         id: 1, 
//         title: 'React Fundamentals', 
//         url: 'https://res.cloudinary.com/drx7mkztw/video/upload/v1734249038/test_k7mrwk.mp4',
//         transcript: "Welcome to React Fundamentals. In this video, we'll cover the core concepts of React, including components, props, and state. Let's start by understanding what React is and why it's so popular in modern web development..."
//       },
//       { 
//         id: 2, 
//         title: 'Components and Props', 
//         url: 'https://example.com/video2.mp4',
//         transcript: "In this lesson, we'll dive deep into React components and props. Components are the building blocks of React applications, and props allow us to pass data between these components. We'll start by creating a simple component..."
//       },
//       { 
//         id: 3, 
//         title: 'State and Lifecycle', 
//         url: 'https://res.cloudinary.com/drx7mkztw/video/upload/v1734249038/test_k7mrwk.mp4',
//         transcript: "Today, we're going to explore state and lifecycle in React. State is a way to store and manage data within a component, while lifecycle methods allow us to hook into different stages of a component's existence. Let's begin by discussing why we need state..."
//       },
//     ],
//   },
//   2: {
//     title: 'Advanced JavaScript Concepts',
//     description: 'Deep dive into advanced JavaScript features and patterns',
//     instructor: 'John Smith',
//     videos: [
//       { 
//         id: 1, 
//         title: 'Closures and Scope', 
//         url: 'https://example.com/video4.mp4',
//         transcript: "Welcome to our lesson on closures and scope in JavaScript. These concepts are fundamental to understanding how JavaScript works under the hood. We'll start by explaining what scope is and how it affects variable accessibility..."
//       },
//       { 
//         id: 2, 
//         title: 'Prototypes and Inheritance', 
//         url: 'https://example.com/video5.mp4',
//         transcript: "In this video, we'll explore prototypes and inheritance in JavaScript. These concepts form the basis of object-oriented programming in JavaScript. We'll begin by discussing what prototypes are and how they relate to objects..."
//       },
//       { 
//         id: 3, 
//         title: 'Async JavaScript', 
//         url: 'https://example.com/video6.mp4',
//         transcript: "Today's topic is asynchronous JavaScript. We'll cover callbacks, promises, and async/await syntax. Understanding these concepts is crucial for handling operations that take time to complete, such as fetching data from a server. Let's start with callbacks..."
//       },
//     ],
//   },
// }

export default function Course({params}) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const courseId = slug;    

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showTranscript, setShowTranscript] = useState(false)
//   const course = coursesData[courseId]

  const [course, setCourse] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/mycourses/${courseId}`)
        setCourse(response.data)
        setIsLoading(false)
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred while fetching the course')
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (!course) {
    return <div>Course not found</div>
  }  

  return (
    <div className="space-y-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
      <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
      <p className="text-gray-600 dark:text-gray-300">Instructor: {course.instructor}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {selectedVideo ? (
            <>
              <VideoPlayer url={selectedVideo.url} />
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center justify-center w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
              >
                {showTranscript ? 'Hide' : 'Show'} Transcript
                {showTranscript ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </button>
              {showTranscript && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md max-h-60 overflow-y-auto">
                  <p className="text-gray-800 dark:text-gray-200">{selectedVideo.transcript}</p>
                </div>
              )}
            </>
          ) : (
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Select a video to start watching</p>
            </div>
          )}
          {/* <Link
            href={`/dashboard/courses/${courseId}/${selectedVideo?.id}`}
            // href={`/dashboard/courses/${courseId}/quiz`}
            className="flex items-center justify-center w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            <ClipboardList className="mr-2 h-5 w-5" />
            Take Quiz
          </Link> */}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Content</h2>
          <ul className="space-y-2">
            {course.videos.map((video) => (
              <li key={video.id}>
                <button
                  onClick={() => {
                    setSelectedVideo(video)
                    setShowTranscript(false)
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md transition duration-200 ${
                    selectedVideo && selectedVideo.id === video.id
                      ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    <span>{video.title}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* QUIZ BUTTON */}
      {selectedVideo &&
        <Link
            href={`/dashboard/mycourses/${courseId}/${selectedVideo?.id}`}
            className="fixed bottom-5 right-5 flex items-end justify-end w-max rounded-full py-2 px-4 bg-green-600 text-white hover:bg-green-700 transition duration-300"
            >
            <ClipboardList className="mr-2 h-5 w-5" />
            Generate Quiz
        </Link>
      }
    </div>
  )
}



// 'use client'
// import React from 'react'
// import { useState } from 'react'
// import Link from 'next/link'
// import dynamic from 'next/dynamic'
// import { Play, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react'

// // Lazy load the video player component
// const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
//   loading: () => <p>Loading video player...</p>,
//   ssr: false
// })

// const coursesData = {
//   1: {
//     title: 'Introduction to React',
//     description: 'Learn the basics of React and build your first app',
//     instructor: 'Jane Doe',
//     videos: [
//       { 
//         id: 1, 
//         title: 'React Fundamentals', 
//         url: 'https://example.com/video1.mp4',
//         transcript: "Welcome to React Fundamentals. In this video, we'll cover the core concepts of React, including components, props, and state. Let's start by understanding what React is and why it's so popular in modern web development..."
//       },
//       { 
//         id: 2, 
//         title: 'Components and Props', 
//         url: 'https://example.com/video2.mp4',
//         transcript: "In this lesson, we'll dive deep into React components and props. Components are the building blocks of React applications, and props allow us to pass data between these components. We'll start by creating a simple component..."
//       },
//       { 
//         id: 3, 
//         title: 'State and Lifecycle', 
//         url: 'https://example.com/video3.mp4',
//         transcript: "Today, we're going to explore state and lifecycle in React. State is a way to store and manage data within a component, while lifecycle methods allow us to hook into different stages of a component's existence. Let's begin by discussing why we need state..."
//       },
//     ],
//   },
//   2: {
//     title: 'Advanced JavaScript Concepts',
//     description: 'Deep dive into advanced JavaScript features and patterns',
//     instructor: 'John Smith',
//     videos: [
//       { 
//         id: 1, 
//         title: 'Closures and Scope', 
//         url: 'https://example.com/video4.mp4',
//         transcript: "Welcome to our lesson on closures and scope in JavaScript. These concepts are fundamental to understanding how JavaScript works under the hood. We'll start by explaining what scope is and how it affects variable accessibility..."
//       },
//       { 
//         id: 2, 
//         title: 'Prototypes and Inheritance', 
//         url: 'https://example.com/video5.mp4',
//         transcript: "In this video, we'll explore prototypes and inheritance in JavaScript. These concepts form the basis of object-oriented programming in JavaScript. We'll begin by discussing what prototypes are and how they relate to objects..."
//       },
//       { 
//         id: 3, 
//         title: 'Async JavaScript', 
//         url: 'https://example.com/video6.mp4',
//         transcript: "Today's topic is asynchronous JavaScript. We'll cover callbacks, promises, and async/await syntax. Understanding these concepts is crucial for handling operations that take time to complete, such as fetching data from a server. Let's start with callbacks..."
//       },
//     ],
//   },
// }

// export default function Course({params}) {
//     const resolvedParams = React.use(params);
//     const { slug } = resolvedParams;
//     const courseId = slug;
//   const [selectedVideo, setSelectedVideo] = useState(null)
//   const [showTranscript, setShowTranscript] = useState(false)
//   const course = coursesData[courseId]

//   if (!course) {
//     return <div>Course not found</div>
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
//       <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
//       <p className="text-gray-600 dark:text-gray-300">Instructor: {course.instructor}</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 space-y-4">
//           {selectedVideo ? (
//             <>
//               <VideoPlayer url={selectedVideo.url} />
//               <button
//                 onClick={() => setShowTranscript(!showTranscript)}
//                 className="flex items-center justify-center w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
//               >
//                 {showTranscript ? 'Hide' : 'Show'} Transcript
//                 {showTranscript ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
//               </button>
//               {showTranscript && (
//                 <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md max-h-60 overflow-y-auto">
//                   <p className="text-gray-800 dark:text-gray-200">{selectedVideo.transcript}</p>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//               <p className="text-gray-500 dark:text-gray-400">Select a video to start watching</p>
//             </div>
//           )}
//           <Link
//             href={`/dashboard/courses/${courseId}/quiz`}
//             className="flex items-center justify-center w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//           >
//             <ClipboardList className="mr-2 h-5 w-5" />
//             Take Quiz
//           </Link>
//         </div>
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Content</h2>
//           <ul className="space-y-2">
//             {course.videos.map((video) => (
//               <li key={video.id}>
//                 <button
//                   onClick={() => {
//                     setSelectedVideo(video)
//                     setShowTranscript(false)
//                   }}
//                   className={`w-full text-left px-4 py-2 rounded-md transition duration-200 ${
//                     selectedVideo && selectedVideo.id === video.id
//                       ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
//                       : 'hover:bg-gray-100 dark:hover:bg-gray-800'
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <Play className="w-4 h-4 mr-2" />
//                     <span>{video.title}</span>
//                   </div>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

