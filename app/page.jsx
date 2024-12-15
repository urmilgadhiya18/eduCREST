// "use client";

// export default function Page() {
//   return (
//     <div className="container mx-auto">
//       <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
//       <p className="text-gray-600">Welcome to your dashboard!</p>
//     </div>

//   );
// }


import Image from 'next/image'
import { ArrowRight, BookOpen, Users, Award, Zap } from 'lucide-react'
import Cover from '../public/Cover.png'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-purple-600" />
            <span className="ml-2 text-2xl font-bold text-gray-800">EduCREST</span>
          </div>
          <div className="flex items-center">
            <Link href="/signin" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 mr-4">
              Sign In
            </Link>
            <Link href="/signup" className="bg-transparent text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl font-extrabold mb-4 md:text-5xl lg:text-6xl leading-tight">
              Elevate Your Learning with EduCREST
            </h1>
            <p className="text-xl mb-8 md:pr-12">
              Unlock your potential with our cutting-edge E-learning platform. Start your journey to success today!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Get Started
              </button>
              <button className="bg-transparent text-white font-bold py-3 px-6 rounded-full border-2 border-white hover:bg-white hover:text-purple-600 transition duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <Image
              src={Cover}
              // src="/placeholder.svg?height=400&width=600"
              alt="EduCREST learning illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduCREST?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="w-12 h-12 text-purple-600" />}
              title="Extensive Course Library"
              description="Access thousands of courses across various subjects and skill levels, tailored to your learning needs."
            />
            <FeatureCard 
              icon={<Users className="w-12 h-12 text-purple-600" />}
              title="Expert Instructors"
              description="Learn from industry professionals and experienced educators who are passionate about your success."
            />
            <FeatureCard 
              icon={<Award className="w-12 h-12 text-purple-600" />}
              title="Recognized Certifications"
              description="Earn certificates that are valued by employers worldwide, boosting your career prospects."
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="Web Developer"
              content="EduCREST transformed my career. The courses were comprehensive and the instructors were incredibly supportive."
            />
            <TestimonialCard
              name="Michael Chen"
              role="Data Scientist"
              content="The data science track on EduCREST was exactly what I needed to transition into my dream job. Highly recommended!"
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="UX Designer"
              content="The practical projects and feedback from industry experts on EduCREST helped me build a stunning portfolio."
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Skills?</h2>
          <p className="text-xl mb-8">Join thousands of students already learning and growing with EduCREST.</p>
          <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300 inline-flex items-center transform hover:scale-105">
            Start Learning Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start">
                <Zap className="h-6 w-6 mr-2" />
                EduCREST
              </h3>
              <p className="mt-2">Empowering learners worldwide</p>
            </div>
            <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-400 transition duration-300">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition duration-300">Courses</a></li>
                <li><a href="#" className="hover:text-purple-400 transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 text-center md:text-right">
              <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a href="#" className="hover:text-purple-400 transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="hover:text-purple-400 transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="hover:text-purple-400 transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2023 EduCREST. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  )
}

function TestimonialCard({ name, role, content }) {
  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
      <p className="mb-4 italic">"{content}"</p>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-600">{role}</div>
    </div>
  )
}

