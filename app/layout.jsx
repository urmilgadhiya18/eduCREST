import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'EduCREST - Elevate Your Learning',
  description: 'Unlock your potential with EduCREST, the cutting-edge E-learning platform. Start your journey to success today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}


// import './globals.css'
// import { Inter } from 'next/font/google'
// import Sidebar from '../components/Sidebar'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'EduCREST - Elevate Your Learning',
//   description: 'Unlock your potential with EduCREST, the cutting-edge E-learning platform. Start your journey to success today!',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <main>
//         <Sidebar />
//           {children}
//         </main>
//         </body>
//     </html>
//   )
// }




// import './globals.css'
// import { Inter } from 'next/font/google'
// import Sidebar from '../components/Sidebar'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'EduCREST - Elevate Your Learning',
//   description: 'Unlock your potential with EduCREST, the cutting-edge E-learning platform. Start your journey to success today!',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Sidebar />
//         <div className="flex min-h-screen bg-gray-100">
//           <main className="flex-1 p-0 md:p-0">{children}</main>
//         </div>
//       </body>
//     </html>
//   )
// }

