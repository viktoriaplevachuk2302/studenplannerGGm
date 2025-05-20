import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScheduleEditor from '../components/ScheduleEditor'

function ScheduleEditPage() {
  const navigate = useNavigate()
  
  const handleCancel = () => {
    navigate('/')
  }
  
  const handleSave = () => {
    // Save logic here
    navigate('/')
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Редагування розкладу</h1>
        <div className="space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-md text-primary bg-white border border-primary hover:bg-gray-50"
          >
            ✕
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            ✓
          </button>
        </div>
      </div>
      
      <div className="bg-secondary p-6 rounded-md">
        <ScheduleEditor />
      </div>
    </div>
  )
}

export default ScheduleEditPage