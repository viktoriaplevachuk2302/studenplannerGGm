import { useState } from 'react'
import TasksList from '../components/TasksList'
import { filterTasksByTimeframe } from '../utils/dateUtils'

function TasksPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Mock tasks data
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Лабораторна робота', 
      date: '2025-04-27T19:00:00', 
      subject: 'КМ',
      completed: false 
    },
    { 
      id: 2, 
      title: 'Завдання 3', 
      date: '2025-04-25T14:30:00', 
      subject: 'Предмет',
      completed: false 
    },
    { 
      id: 3, 
      title: 'Завдання 4', 
      date: '2025-04-28T16:00:00', 
      subject: 'Предмет',
      completed: false 
    },
    { 
      id: 4, 
      title: 'Курсова робота', 
      date: '2025-05-01T23:59:00', 
      subject: 'КМ',
      completed: false 
    },
  ])
  
  const filters = [
    { id: 'all', name: 'Усі' },
    { id: 'today', name: 'Завтра' },
    { id: 'thisWeek', name: 'Цей тиждень' },
    { id: 'completed', name: 'Виконані' },
  ]
  
  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }
  
  const filteredTasks = filterTasksByTimeframe(tasks, activeFilter === 'all' ? null : activeFilter)
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ЗАВДАННЯ</h1>
      
      <div className="bg-secondary p-6 rounded-md">
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-md transition-colors
                ${activeFilter === filter.id 
                  ? 'bg-primary text-white' 
                  : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        
        <TasksList 
          tasks={filteredTasks} 
          onToggleComplete={handleToggleComplete} 
        />
      </div>
    </div>
  )
}

export default TasksPage