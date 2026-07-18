import React, { createContext, useState, useContext, useEffect } from 'react'
import { authAPI } from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const register = async (userData) => {
    try {
      setError(null)
      const response = await authAPI.register(userData)
      const { token, ...data } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      return data
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      throw err
    }
  }

  const login = async (credentials) => {
    try {
      setError(null)
      const response = await authAPI.login(credentials)
      const { token, ...data } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      return data
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
