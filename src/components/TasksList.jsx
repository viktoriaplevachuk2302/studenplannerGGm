import { useState } from 'react'
import TaskItem from './TaskItem'

function TasksList({ tasks, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-6 bg-white rounded-md">
        <p className="text-text-light">Немає завдань для відображення</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
        />
      ))}
    </div>
  )
}

export default TasksList