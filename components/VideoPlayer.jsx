// 'use client'

// import { useEffect, useRef } from 'react'

// export default function VideoPlayer({ url }) {
//   const videoRef = useRef(null)

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.load()
//     }
//   }, [url])

//   return (
//     <div className="aspect-video bg-black">
//       <video ref={videoRef} controls className="w-full h-full" controlsList="nodownload">
//         <source src={url} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   )
// }




'use client'

import { useEffect, useRef } from 'react'

export default function VideoPlayer({ url }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()

      // Prevent right-click context menu
      const videoElement = videoRef.current;
      videoElement.addEventListener('contextmenu', (e) => e.preventDefault());  // Disable right-click

      // Prevent double-click to trigger the download
      videoElement.addEventListener('dblclick', (e) => e.preventDefault()); // Disable double-click download
    }

    return () => {
      if (videoRef.current) {
        const videoElement = videoRef.current;
        videoElement.removeEventListener('contextmenu', (e) => e.preventDefault());
        videoElement.removeEventListener('dblclick', (e) => e.preventDefault());
      }
    }
  }, [url]);

  return (
    <div className="aspect-video bg-black">
      <video 
        ref={videoRef} 
        controls 
        className="w-full h-full" 
        controlsList="nodownload" // Disable the download option
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
