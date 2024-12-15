// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useState } from 'react'
// import { Home, Users, Settings, Menu, X } from 'lucide-react'

// const navItems = [
//   { name: 'Dashboard', href: '/', icon: Home },
//   { name: 'Users', href: '/users', icon: Users },
//   { name: 'Settings', href: '/settings', icon: Settings },
// ]

// export default function Sidebar() {
//   const pathname = usePathname()
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <>
//       <button
//         className="fixed top-4 left-4 z-40 md:hidden"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X /> : <Menu />}
//       </button>

//       <div
//         className={`fixed top-0 left-0 z-30 h-screen w-64 transform bg-white p-5 shadow-lg transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:relative md:translate-x-0`}
//       >
//         <nav className="mt-8">
//           <ul className="space-y-2">
//             {navItems.map((item) => (
//               <li key={item.name}>
//                 <Link
//                   href={item.href}
//                   className={`flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 ${
//                     pathname === item.href ? 'bg-gray-100' : ''
//                   }`}
//                 >
//                   <item.icon className="h-6 w-6 text-gray-500" />
//                   <span className="ml-3">{item.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </>
//   )
// }

