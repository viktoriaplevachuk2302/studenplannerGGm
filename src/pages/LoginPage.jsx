import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/LoginForm'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const handleLogin = (userData) => {
    // In a real app, you'd make an API call here
    login({
      name: userData.email.split('@')[0], // Just for demo purposes
      email: userData.email
    })
    navigate('/')
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-primary text-white py-3 text-center rounded-t-md">
          <h1 className="text-xl font-bold">ПЛАНУВАЛЬНИК НАВЧАННЯ</h1>
        </div>
        
        <div className="bg-secondary p-6 rounded-b-md">
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage