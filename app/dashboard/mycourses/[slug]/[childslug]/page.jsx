'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react'

// const quizData = {
//   1: [
//     {
//       question: "What is a React component?",
//       options: [
//         "A JavaScript function",
//         "A reusable piece of UI",
//         "A built-in HTML element",
//         "A CSS class"
//       ],
//       correctAnswer: 1
//     },
//     {
//       question: "Which hook is used to manage state in a functional component?",
//       options: [
//         "useEffect",
//         "useContext",
//         "useState",
//         "useReducer"
//       ],
//       correctAnswer: 2
//     },
//     {
//       question: "What does JSX stand for?",
//       options: [
//         "JavaScript XML",
//         "Java Syntax Extension",
//         "JSON XML",
//         "JavaScript Syntax eXtension"
//       ],
//       correctAnswer: 0
//     }
//   ],
//   2: [
//     {
//       question: "What is a closure in JavaScript?",
//       options: [
//         "A way to close a browser window",
//         "A function with access to variables in its outer scope",
//         "A method to end a loop",
//         "A type of data structure"
//       ],
//       correctAnswer: 1
//     },
//     {
//       question: "Which of the following is NOT a JavaScript data type?",
//       options: [
//         "Number",
//         "Boolean",
//         "String",
//         "Float"
//       ],
//       correctAnswer: 3
//     },
//     {
//       question: "What does the 'this' keyword refer to in JavaScript?",
//       options: [
//         "The current function",
//         "The global object",
//         "The object that is executing the current function",
//         "The parent object"
//       ],
//       correctAnswer: 2
//     }
//   ]
// }

export default function Quiz({params}) {
  const resolvedParams = React.use(params);
  const { slug, childslug } = resolvedParams;
  const videoId = childslug;  

  const router = useRouter()
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  // const questions = quizData[videoId] || []  

  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/mycourses/${slug}/${videoId}`)        
        setQuestions(response.data.quiz)
        setIsLoading(false)
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred while fetching the course')
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [videoId])

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

  if (!questions) {
    return <div>Quiz not generated</div>
  }

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }))
  }

  // const handleSubmit = () => {
  //   setShowResults(true)
  // }
  const handleSubmit = async () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const email = auth?.email;
    const calculatedScore = calculateScore()
    setShowResults(true)

    try {
      await axios.post('/api/updatescore', {
        email: email,
        score: calculatedScore
      })
    } catch (error) {
      console.error('Failed to submit quiz score:', error)
    }
  }

  const calculateScore = () => {
    let score = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  return (
    <div className="space-y-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Quiz</h1>
      {!showResults ? (
        <>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{question.question}</h2>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                    className={`w-full text-left p-3 rounded-md transition duration-200 ${
                      answers[questionIndex] === optionIndex
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Quiz Results</h2>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Your score: {calculateScore()} out of {questions.length}
          </p>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="space-y-2">
              <p className="font-semibold text-gray-900 dark:text-white">{question.question}</p>
              <p className="text-gray-700 dark:text-gray-300">
                Your answer: {question.options[answers[questionIndex]]}
                {answers[questionIndex] === question.correctAnswer ? (
                  <CheckCircle className="inline-block ml-2 text-green-500" />
                ) : (
                  <XCircle className="inline-block ml-2 text-red-500" />
                )}
              </p>
              {answers[questionIndex] !== question.correctAnswer && (
                <p className="text-green-500 dark:text-green-300">
                {/* <p className="text-gray-700 dark:text-gray-300"> */}
                  Correct answer: {question.options[question.correctAnswer]}
                </p>
              )}
            </div>
          ))}
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
          >
            <ArrowLeft className="mr-2" /> Back to Course
          </button>
        </div>
      )}
    </div>
  )
}

