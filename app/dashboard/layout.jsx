// 'use client'
// import { useState, useEffect } from 'react'
// import { usePathname } from 'next/navigation'
// import Link from 'next/link'
// import { BookOpen, Users, BarChart, LogOut, Menu, X, Zap, Moon, Sun } from 'lucide-react'

// const navItems = [
//   { name: 'Dashboard', href: '/dashboard', icon: BookOpen },
//   { name: 'Leaderboard', href: '/leaderboard', icon: Users },
//   { name: 'Analytics', href: '/analytics', icon: BarChart },
// ]

// export default function AuthenticatedLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [isDarkMode, setIsDarkMode] = useState(false)
//   const pathname = usePathname()

//   useEffect(() => {
//     setIsSidebarOpen(false)
//   }, [pathname])

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark')
//     } else {
//       document.documentElement.classList.remove('dark')
//     }
//   }, [isDarkMode])

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode)
//   }

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
//       {/* Sidebar */}
//       <aside
//         className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 shadow-lg`}
//       >
//         <nav>
//           <div className="flex items-center justify-between mb-6 px-4">
//             <div className="flex items-center">
//               <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
//               <span className="ml-2 text-2xl font-bold">EduCREST</span>
//             </div>
//             <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
//                 pathname === item.href
//                   ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
//                   : 'hover:bg-gray-200 dark:hover:bg-gray-700'
//               }`}
//             >
//               <item.icon className="h-5 w-5" />
//               <span>{item.name}</span>
//             </Link>
//           ))}
//           <button
//             onClick={toggleDarkMode}
//             className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 w-full mt-4"
//           >
//             {isDarkMode ? (
//               <Sun className="h-5 w-5 text-yellow-500" />
//             ) : (
//               <Moon className="h-5 w-5 text-gray-500" />
//             )}
//             <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top bar */}
//         <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
//           <div className="flex items-center justify-between p-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-gray-500 dark:text-gray-400 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 md:hidden"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//             <div className="flex items-center">
//               <span className="text-gray-700 dark:text-gray-300 text-sm mr-4">Welcome, User</span>
//               <Link
//                 href="/"
//                 className="bg-purple-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 flex items-center"
//               >
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Sign Out
//               </Link>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
//           <div className="container mx-auto px-6 py-8">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }




'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, BookOpen, CalendarPlus, Users, BarChart, LogOut, Menu, X, Zap, Moon, Sun } from 'lucide-react'

// const auth = JSON.parse(localStorage.getItem('auth'));

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: GraduationCap },
  { name: 'My Courses', href: '/dashboard/mycourses', icon: BookOpen },
  { name: 'Add Course', href: '/dashboard/addcourse', icon: CalendarPlus },
  { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
]

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth))
    }
  }, [])

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-64 flex flex-col justify-between py-10 px-2 absolute inset-y-0 left-0 transform pb-3 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 shadow-lg`}
      >
        <div>
          <div className="flex items-center justify-between mb-6 px-4">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <span className="ml-2 text-2xl font-bold">EduCREST</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              (auth?.role=="learner" && item.name=="Add Course")
              ?""
              :
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
                  pathname === item.href
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 w-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500" />
            )}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Welcome, {auth?.name}</p>
            <Link
              href="/"
              className="bg-purple-600 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 flex items-center justify-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden p-4 bg-white dark:bg-gray-800 shadow-md">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 dark:text-gray-400 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

