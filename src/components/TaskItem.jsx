import { useState } from 'react'
import { formatDateTime } from '../utils/dateUtils'

function TaskItem({ task, onToggleComplete }) {
  const handleCheckboxChange = () => {
    onToggleComplete(task.id)
  }
  
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center">
        <div className="p-4 md:col-span-5">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={task.completed}
              onChange={handleCheckboxChange}
              className="mr-3 h-5 w-5 cursor-pointer accent-primary"
            />
            <h3 className={`text-base font-medium ${task.completed ? 'line-through text-text-light' : ''}`}>
              {task.title}
            </h3>
          </div>
        </div>
        
        <div className="p-4 md:col-span-4 text-center">
          <span className="text-text-light">{formatDateTime(task.date)}</span>
        </div>
        
        <div className="p-4 md:col-span-3 text-right">
          <span className="font-medium">{task.subject}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskItem