import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const handleRegister = (userData) => {
    // In a real app, you'd make an API call here
    login({
      name: userData.name,
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
          <RegisterForm onRegister={handleRegister} />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage