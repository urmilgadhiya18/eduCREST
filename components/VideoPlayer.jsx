'use client'

import { useEffect, useRef } from 'react'

export default function VideoPlayer({ url }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [url])

  return (
    <div className="aspect-video bg-black">
      <video ref={videoRef} controls className="w-full h-full">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

