import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Schedule from '../components/Schedule'
import { formatDate } from '../utils/dateUtils'

function HomePage() {
  const [currentDateRange, setCurrentDateRange] = useState({
    start: '21 квітня 2025',
    end: '27 квітня 2025'
  })
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Курсова робота', deadline: '01.05', subject: 'КМ' },
    { id: 2, title: 'Лабораторна робота', deadline: '27.04', subject: 'КМ' }
  ])
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ПЛАНУВАННЯ НАВЧАННЯ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-secondary p-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Розклад</h2>
            <div className="text-right">
              {currentDateRange.start} - {currentDateRange.end}
            </div>
          </div>
          
          <Schedule />
          
          <div className="mt-4 flex justify-end">
            <Link to="/schedule/edit" className="btn btn-primary">
              Редагувати розклад
            </Link>
          </div>
        </div>
        
        <div className="bg-secondary p-6 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Завдання</h2>
          
          <div>
            {tasks.map(task => (
              <div key={task.id} className="mb-4 pb-4 border-b border-gray-300 last:border-0">
                <div className="font-medium">{task.title} - {task.deadline}</div>
                <div className="text-text-light mt-1">{task.subject}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Link to="/tasks" className="block text-center btn btn-primary">
              Всі завдання
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage