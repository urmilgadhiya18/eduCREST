// 'use client'

// import React from 'react'
// import { useState, useEffect } from 'react'
// // import { useParams, useRouter } from 'next/navigation'
// import Image from 'next/image'
// import Link from 'next/link'
// import axios from 'axios'
// import { Book, Clock, Users, PlayCircle, ChevronDown, ChevronUp } from 'lucide-react'

// export default function CourseDetails({params}) {
//   const resolvedParams = React.use(params);
//   const { slug } = resolvedParams;
//   const courseId = slug;
// //   const { courseId } = useParams()
// //   const router = useRouter()
//   const [course, setCourse] = useState(null)
//   const [expandedModules, setExpandedModules] = useState({})
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await axios.get(`/api/courses/${courseId}`)
//         setCourse(response.data)
//         setIsLoading(false)
//       } catch (err) {
//         setError(err.response?.data?.error || 'An error occurred while fetching course details')
//         setIsLoading(false)
//       }
//     }

//     fetchCourseDetails()
//   }, [courseId])

//   const toggleModule = (moduleId) => {
//     setExpandedModules(prev => ({
//       ...prev,
//       [moduleId]: !prev[moduleId]
//     }))
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500">
//         <h2 className="text-2xl font-bold mb-4">Error</h2>
//         <p>{error}</p>
//       </div>
//     )
//   }

//   if (!course) {
//     return <div>Course not found</div>
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//         <Image
//           src={course.image}
//           alt={course.title}
//           width={1200}
//           height={400}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6 space-y-4">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
//           <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
//           <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
//             <div className="flex items-center">
//               <Book className="w-4 h-4 mr-1" />
//               <span>Instructor: {course.instructor}</span>
//             </div>
//             <div className="flex items-center">
//               <Clock className="w-4 h-4 mr-1" />
//               <span>{course.duration}</span>
//             </div>
//             <div className="flex items-center">
//               <Users className="w-4 h-4 mr-1" />
//               <span>{course.students} students</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Content</h2>
//         {course.modules.map((module, index) => (
//           <div key={module.id} className="mb-4">
//             <button
//               onClick={() => toggleModule(module.id)}
//               className="flex justify-between items-center w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
//             >
//               <span className="font-semibold text-gray-900 dark:text-white">
//                 Module {index + 1}: {module.title}
//               </span>
//               {expandedModules[module.id] ? (
//                 <ChevronUp className="w-5 h-5" />
//               ) : (
//                 <ChevronDown className="w-5 h-5" />
//               )}
//             </button>
//             {expandedModules[module.id] && (
//               <div className="mt-2 ml-4 space-y-2">
//                 {module.lessons.map((lesson) => (
//                   <Link
//                     key={lesson.id}
//                     href={`/dashboard/courses/${courseId}/${lesson.id}`}
//                     className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
//                   >
//                     <PlayCircle className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
//                     <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-end">
//         <Link
//           href={`/dashboard/courses/${courseId}/enroll`}
//           className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
//         >
//           Enroll in Course
//         </Link>
//       </div>
//     </div>
//   )
// }



'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Book, Clock, Users, PlayCircle, LockKeyhole, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CourseDetails({params}) {
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;
  const courseId = slug;
  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/mycourses/${courseId}`)
        setCourse(response.data)
        setIsLoading(false)
      } catch (err) {
        setError('An error occurred while fetching course details')
        setIsLoading(false)
      }
    }

    fetchCourseDetails()
  }, [courseId])

  const handleSubmit = async () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const email = auth?.email;

    try {
      const response = await axios.post('/api/enroll', {
        email: email,
        courseId: courseId
      })
      alert(response.data.message)
    } catch (error) {
      console.error('Error enrolling in course:', error)
      alert('Failed to enroll in course.')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (!course) {
    return <div className="text-center p-4">Course not found</div>
  }  

  return (
    <div className="container mx-auto lg:px-4 lg:py-8">
      <Card className="mb-8">
        <CardContent className="p-0">
          <Image
            src={course.image}
            alt={course.title}
            width={1200}
            height={400}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </CardContent>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{course.title}</CardTitle>
          <CardDescription className="text-lg">{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <Book className="w-4 h-4 mr-1" />
              <span>Instructor: {course.instructor}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{course.students} students</span>
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">Enroll in Course</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {course.videos.map((video, index) => (
              <AccordionItem value={video.id} key={video.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center">
                    <PlayCircle className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    <span>{video.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2">
                    {index === 0 ?(
                        activeVideo === video.id ? (
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                            src={video.url}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            ></iframe>
                        </div>
                        ) : (
                        <Button 
                            onClick={() => setActiveVideo(video.id)}
                            className="w-full"
                        >
                            Watch Video
                        </Button>
                        )) : (
                            <Button 
                            disabled
                            // onClick={() => setActiveVideo(video.id)}
                            className="w-full"
                        >
                            <LockKeyhole />
                            Watch Video
                        </Button>
                    )}
                    {video.transcript && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Transcript:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{video.transcript}</p>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

