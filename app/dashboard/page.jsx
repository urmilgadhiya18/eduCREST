'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { Book, Clock, Users, Plus, CalendarPlus } from 'lucide-react'

export default function Dashboard() {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/dashboard')
        setCourses(response.data)
        setIsLoading(false)
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred while fetching courses')
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleSubmit = async (courseId) => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const email = auth?.email;
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

  return (
    <div className="relative min-h-screen pb-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <Image
              src={course.image}
              alt={course.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">{course.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 truncate">{course.description}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Book className="w-4 h-4 mr-1" />
                <span>{course.instructor}</span>
              </div>
              <div className='flex justify-between flex-wrap gap-y-2'>
                <Link
                  href={`/dashboard/${course._id}`}
                  className="block w-[46%] min-w-[110px] text-center border border-purple-600 text-purple-600 py-2 px-2 rounded-full hover:bg-purple-600 hover:text-white transition duration-300"
                >
                  View Details
                </Link>
                <button
                  // href={`/dashboard/courses/${course._id}`}
                  onClick={() => handleSubmit(course._id)}
                  className="block w-[46%] min-w-[110px] text-center bg-purple-600 text-white py-2 px-2 rounded-full hover:bg-purple-700 transition duration-300"
                >
                  Enroll Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="fixed bottom-8 right-8">
        <Link
          href="/dashboard/courses/new"
          className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300"
        >
          <Plus className="w-8 h-8" />
        </Link>
      </div> */}

      {/* <div className="fixed bottom-8 right-8">
        <Link
          href="#"
          className="group relative flex items-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg overflow-hidden hover:w-48 transition-all duration-300"
        >
          <span
            className="pl-3 absolute left-6 opacity-0 group-hover:opacity-100 group-hover:left-16 transition-all duration-300 font-medium whitespace-nowrap"
          >
            Add Course
          </span>
          <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full group-hover:bg-green-600 transition-colors duration-300">
            <CalendarPlus className="w-8 h-8" />
          </div>
        </Link>
      </div> */}

    </div>
  )
}

