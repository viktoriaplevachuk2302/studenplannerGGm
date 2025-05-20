import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserProfile from '../components/UserProfile'

function ProfilePage() {
  const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  
  const handleClose = () => {
    navigate('/')
  }
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  const handleSaveProfile = (userData) => {
    updateProfile(userData)
    navigate('/') // Redirect to home page after saving
  }
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ПРОФІЛЬ КОРИСТУВАЧА</h1>
        <button
          onClick={handleClose}
          className="px-4 py-2 rounded-md text-primary bg-white border border-primary hover:bg-gray-50"
        >
          ✕
        </button>
      </div>
      
      <div className="bg-secondary p-6 rounded-md">
        <UserProfile 
          user={user} 
          onSave={handleSaveProfile} 
          onLogout={handleLogout}
        />
      </div>
    </div>
  )
}

export default ProfilePage