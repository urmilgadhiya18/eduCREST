// 'use client'

// import { useState } from 'react'
// import { Upload, X, Plus, Save } from 'lucide-react'

// export default function AddCourse() {
//   const [courseTitle, setCourseTitle] = useState('')
//   const [courseDescription, setCourseDescription] = useState('')
//   const [courseDuration, setCourseDuration] = useState('')
//   const [thumbnail, setThumbnail] = useState(null)
//   const [videos, setVideos] = useState([{ title: '', file: null }])

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setThumbnail(file)
//     }
//   }

//   const handleVideoChange = (index, field, value) => {
//     const updatedVideos = [...videos]
//     updatedVideos[index][field] = value
//     setVideos(updatedVideos)
//   }

//   const addVideoField = () => {
//     setVideos([...videos, { title: '', file: null }])
//   }

//   const removeVideoField = (index) => {
//     const updatedVideos = videos.filter((_, i) => i !== index)
//     setVideos(updatedVideos)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Here you would typically send the data to your backend
//     console.log({ courseTitle, courseDescription, courseDuration, thumbnail, videos })
//     // Reset form or redirect user after successful submission
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">Add New Course</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">Course Title</label>
//           <input
//             type="text"
//             id="courseTitle"
//             value={courseTitle}
//             onChange={(e) => setCourseTitle(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">Course Description</label>
//           <textarea
//             id="courseDescription"
//             value={courseDescription}
//             onChange={(e) => setCourseDescription(e.target.value)}
//             rows="4"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             required
//           ></textarea>
//         </div>

//         <div>
//           <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">Course Duration (in hours)</label>
//           <input
//             type="number"
//             id="courseDuration"
//             value={courseDuration}
//             onChange={(e) => setCourseDuration(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
//           <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//             <div className="space-y-1 text-center">
//               {thumbnail ? (
//                 <div className="flex flex-col items-center">
//                   <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail preview" className="h-32 object-cover" />
//                   <button
//                     type="button"
//                     onClick={() => setThumbnail(null)}
//                     className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label htmlFor="thumbnail" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
//                       <span>Upload a file</span>
//                       <input id="thumbnail" name="thumbnail" type="file" className="sr-only" onChange={handleThumbnailChange} accept="image/*" />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700">Course Videos</label>
//           {videos.map((video, index) => (
//             <div key={index} className="flex items-center space-x-4">
//               <input
//                 type="text"
//                 placeholder="Video Title"
//                 value={video.title}
//                 onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
//                 className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
//                 required
//               />
//               <label className="flex-shrink-0 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
//                 {video.file ? 'Change Video' : 'Upload Video'}
//                 <input
//                   type="file"
//                   className="sr-only"
//                   onChange={(e) => handleVideoChange(index, 'file', e.target.files[0])}
//                   accept="video/*"
//                 />
//               </label>
//               {video.file && (
//                 <span className="text-sm text-gray-500">{video.file.name}</span>
//               )}
//               {index > 0 && (
//                 <button
//                   type="button"
//                   onClick={() => removeVideoField(index)}
//                   className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   <X className="h-5 w-5" aria-hidden="true" />
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addVideoField}
//             className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//           >
//             <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//             Add Another Video
//           </button>
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//           >
//             <Save className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
//             Save Course
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }



'use client'

import axios from 'axios'
import { useState } from 'react'
import { Upload, X, Plus, Save, Film, Clock, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AddCourse() {
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [courseDuration, setCourseDuration] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [videos, setVideos] = useState([{ title: '', file: null }])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
    }
  }

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos]
    updatedVideos[index][field] = value
    setVideos(updatedVideos)
  }

  const addVideoField = () => {
    setVideos([...videos, { title: '', file: null }])
  }

  const removeVideoField = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index)
    setVideos(updatedVideos)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const auth = JSON.parse(localStorage.getItem('auth'));
    // const email = auth?.email;

    const formData = new FormData()
    formData.append('courseTitle', courseTitle)
    formData.append('courseDescription', courseDescription)
    formData.append('courseInstructor', auth?.name)
    formData.append('courseDuration', courseDuration)
    
    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }

    videos.forEach((video, index) => {
      if (video.file) {
        formData.append(`videos`, video.file)
        formData.append(`videoTitles`, video.title)
      }
    })

    try {
      const response = await fetch('/api/addcourse', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Course added successfully:', result)
        // toast.success('Course added successfully!')
        // Reset form
        setCourseTitle('')
        setCourseDescription('')
        setCourseDuration('')
        setThumbnail(null)
        setVideos([{ title: '', file: null }])
      } else {
        const errorData = await response.json()
        // console.error('Failed to add course:', errorData)
        // toast.error(errorData.error || 'Failed to add course. Please try again.')
      }
    } catch (error) {
    //   console.error('Error submitting form:', error)
    //   toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log({ courseTitle, courseDescription, courseDuration, thumbnail, videos })
//     // Add your submission logic here
//     const auth = JSON.parse(localStorage.getItem('auth'));
//     const email = auth?.email;

//     try {
//       const response = await axios.post('/api/addcourse', {
//         courseTitle, 
//         courseDescription, 
//         instructor: auth.name,
//         courseDuration, 
//         studnts: 18,
//         thumbnail, 
//         videos,
//         // email: email,
//         // courseId: courseId
//       })
//       alert(response.data.message)
//     } catch (error) {
//       console.error('Error adding course:', error)
//       alert('Failed to add course')
//     }
//   }

  return (
    <div className='min-h-screen p-6 transition-colors duration-300 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Create Your Masterpiece
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300"
          >
            <label htmlFor="courseTitle" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              <BookOpen className="inline-block mr-2 w-5 h-5" />
              Course Title
            </label>
            <input
              type="text"
              id="courseTitle"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 bg-transparent transition-colors duration-200"
              required
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300"
          >
            <label htmlFor="courseDescription" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Course Description
            </label>
            <textarea
              id="courseDescription"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 bg-transparent transition-colors duration-200"
              required
            ></textarea>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300"
          >
            <label htmlFor="courseDuration" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              <Clock className="inline-block mr-2 w-5 h-5" />
              Course Duration (ex.: 4 hours/4 weeks/4 months)
            </label>
            <input
              type="text"
              id="courseDuration"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 bg-transparent transition-colors duration-200"
              required
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300"
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Course Thumbnail</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {thumbnail ? (
                  <div className="flex flex-col items-center">
                    <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail preview" className="h-32 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => setThumbnail(null)}
                      className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="thumbnail" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 transition-colors duration-200">
                        <span>Upload a file</span>
                        <input id="thumbnail" name="thumbnail" type="file" className="sr-only" onChange={handleThumbnailChange} accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 2MB</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300"
          >
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              <Film className="inline-block mr-2 w-5 h-5" />
              Course Videos
            </label>
            <AnimatePresence>
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-4 mb-4"
                >
                  <input
                    type="text"
                    placeholder="Video Title"
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                    className="flex-grow px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 bg-transparent transition-colors duration-200"
                    required
                  />
                  <label className="flex-shrink-0 cursor-pointer bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
                    {video.file ? 'Change Video' : 'Upload Video'}
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleVideoChange(index, 'file', e.target.files[0])}
                      accept="video/*"
                    />
                  </label>
                  {video.file && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">{video.file.name}</span>
                  )}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeVideoField(index)}
                      className="p-1 rounded-full text-red-600 hover:text-red-800 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              type="button"
              onClick={addVideoField}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Another Video
            </button>
          </motion.div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Save className="-ml-1 mr-2 h-5 w-5" />
                Launch Your Course
              </>
            )}
              {/* <Save className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Launch Your Course */}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}





// 'use client'

// import { useState } from 'react'
// import { Upload, X, Plus, Save, Film, Clock, BookOpen } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'

// export default function AddCourse() {
//   const [courseTitle, setCourseTitle] = useState('')
//   const [courseDescription, setCourseDescription] = useState('')
//   const [courseDuration, setCourseDuration] = useState('')
//   const [thumbnail, setThumbnail] = useState(null)
//   const [videos, setVideos] = useState([{ title: '', file: null }])

//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setThumbnail(file)
//     }
//   }

//   const handleVideoChange = (index, field, value) => {
//     const updatedVideos = [...videos]
//     updatedVideos[index][field] = value
//     setVideos(updatedVideos)
//   }

//   const addVideoField = () => {
//     setVideos([...videos, { title: '', file: null }])
//   }

//   const removeVideoField = (index) => {
//     const updatedVideos = videos.filter((_, i) => i !== index)
//     setVideos(updatedVideos)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log({ courseTitle, courseDescription, courseDuration, thumbnail, videos })
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white sm:p-6">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto"
//       >
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//             Create Your Masterpiece
//           </h1>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           <div className="space-y-4">
//             {/* Course Title */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//             >
//               <label htmlFor="courseTitle" className="block text-sm font-medium mb-2">
//                 <BookOpen className="inline-block mr-2 w-5 h-5" />
//                 Course Title
//               </label>
//               <input
//                 type="text"
//                 id="courseTitle"
//                 value={courseTitle}
//                 onChange={(e) => setCourseTitle(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 bg-transparent transition-colors duration-200"
//                 required
//               />
//             </motion.div>

//             {/* Course Description */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//             >
//               <label htmlFor="courseDescription" className="block text-sm font-medium mb-2">
//                 Course Description
//               </label>
//               <textarea
//                 id="courseDescription"
//                 value={courseDescription}
//                 onChange={(e) => setCourseDescription(e.target.value)}
//                 rows="4"
//                 className="w-full px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
//                 required
//               ></textarea>
//             </motion.div>

//             {/* Course Duration */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//             >
//               <label htmlFor="courseDuration" className="block text-sm font-medium mb-2">
//                 <Clock className="inline-block mr-2 w-5 h-5" />
//                 Course Duration (hours)
//               </label>
//               <input
//                 type="number"
//                 id="courseDuration"
//                 value={courseDuration}
//                 onChange={(e) => setCourseDuration(e.target.value)}
//                 className="w-full px-4 py-2 rounded-md border-2 border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
//                 required
//               />
//             </motion.div>

//             {/* Thumbnail Upload */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//             >
//               <label className="block text-sm font-medium mb-2">Course Thumbnail</label>
//               <div className="flex flex-col items-center">
//                 {thumbnail ? (
//                   <>
//                     <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail preview" className="h-32 object-cover rounded-md" />
//                     <button
//                       type="button"
//                       onClick={() => setThumbnail(null)}
//                       className="mt-2 text-red-500"
//                     >
//                       Remove
//                     </button>
//                   </>
//                 ) : (
//                   <label className="block text-center">
//                     <Upload className="mx-auto h-8 w-8 text-gray-500" />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="sr-only"
//                       onChange={handleThumbnailChange}
//                     />
//                     <p className="text-sm">Upload a Thumbnail</p>
//                   </label>
//                 )}
//               </div>
//             </motion.div>

//             {/* Videos */}
//             <motion.div
//               whileHover={{ scale: 1.02 }}
//               className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
//             >
//               <label className="block text-sm font-medium mb-2">Course Videos</label>
//               <div className="space-y-2">
//                 {videos.map((video, index) => (
//                   <div key={index} className="flex items-center space-x-2">
//                     <input
//                       type="text"
//                       placeholder="Video Title"
//                       value={video.title}
//                       onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
//                       className="flex-grow px-2 py-1 border rounded"
//                     />
//                     <input
//                       type="file"
//                       className="flex-grow"
//                       onChange={(e) => handleVideoChange(index, 'file', e.target.files[0])}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   )
// }
