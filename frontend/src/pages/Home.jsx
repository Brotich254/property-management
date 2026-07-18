import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  if (user) {
    return <Link to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Property Management System</h1>
        <p className="text-xl mb-8">Manage your rental properties with ease</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 inline-block"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
