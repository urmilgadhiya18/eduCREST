'use client';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import { Book, Clock, Users, CalendarPlus } from 'lucide-react'

// const courses = [
//   {
//     id: 1,
//     title: 'Introduction to React',
//     description: 'Learn the basics of React and build your first app',
//     instructor: 'Jane Doe',
//     duration: '4 weeks',
//     students: 1234,
//     image: '/webDev.jpg',
//   },
//   {
//     id: 2,
//     title: 'Advanced JavaScript Concepts',
//     description: 'Deep dive into advanced JavaScript features and patterns',
//     instructor: 'John Smith',
//     duration: '6 weeks',
//     students: 987,
//     image: '/Cover.png',
//   },
//   {
//     id: 3,
//     title: 'CSS Mastery',
//     description: 'Master CSS layouts, animations, and responsive design',
//     instructor: 'Emily Chen',
//     duration: '5 weeks',
//     students: 1567,
//     image: '/ds.jpg',
//   },
//   {
//     id: 4,
//     title: 'Node.js Backend Development',
//     description: 'Build scalable backend applications with Node.js',
//     instructor: 'Michael Johnson',
//     duration: '8 weeks',
//     students: 2345,
//     image: '/Cover.png',
//   },
// ]

export default function Mycourses() {

  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const email = auth?.email;
        const response = await axios.post('/api/mycourses', {email});        
        setCourses(response.data.courses);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Courses</h1>
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
              <Link
                href={`/dashboard/mycourses/${course._id}`}
                className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
              >
                View Course
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8">
        <Link
          href="/dashboard/addcourse"
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
      </div>

    </div>
  )
}

