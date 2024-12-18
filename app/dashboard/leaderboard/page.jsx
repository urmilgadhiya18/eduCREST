'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Search } from 'lucide-react'
import axios from 'axios'

// const leaderboardData = [
//   { rank: 1, name: 'John Doe', score: 9850, avatar: 'https://res.cloudinary.com/drx7mkztw/image/upload/v1734281885/avtar_rpmw4v.png' },
//   { rank: 2, name: 'Jane Smith', score: 9720, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 3, name: 'Bob Johnson', score: 9600, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 4, name: 'Alice Williams', score: 9450, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 5, name: 'Charlie Brown', score: 9300, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 6, name: 'Diana Davis', score: 9150, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 7, name: 'Ethan Wilson', score: 9000, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 8, name: 'Fiona Taylor', score: 8850, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 9, name: 'George Miller', score: 8700, avatar: '/placeholder.svg?height=40&width=40' },
//   { rank: 10, name: 'Hannah Clark', score: 8550, avatar: '/placeholder.svg?height=40&width=40' },
// ]

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [leaderboardData, setLeaderboardData] = useState([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/leaderboard')
        setLeaderboardData(response.data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error.message)
      }
    }
    fetchLeaderboard()
  }, [])

  const filteredData = leaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 pl-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <motion.tr
                key={user.rank}
                className="bg-white dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <RankIcon rank={user.rank} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    </div> */}
                    {/* <div className="ml-4"> */}
                    <div className="ml-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{user.score}</div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {filteredData.map((user, index) => (
          <motion.div
            key={user.rank}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <RankIcon rank={user.rank} />
                {/* <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" /> */}
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Score: {user.score}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function RankIcon({ rank }) {
  if (rank === 1) {
    return <Trophy className="h-6 w-6 text-yellow-400" />
  } else if (rank === 2) {
    return <Medal className="h-6 w-6 text-gray-400" />
  } else if (rank === 3) {
    return <Award className="h-6 w-6 text-yellow-600" />
  } else {
    return <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{rank}</span>
  }
}

