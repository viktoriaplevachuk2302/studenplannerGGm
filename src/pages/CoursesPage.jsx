import { useState } from 'react'
import CoursesList from '../components/CoursesList'

function CoursesPage() {
  // Mock courses data
  const [courses, setCourses] = useState([
    { id: 1, name: 'Комп\'ютерні мережі', instructor: 'Ліскевич О.І.' },
    { id: 2, name: 'Системний аналіз', instructor: '(Викладач)' },
    { id: 3, name: 'Командна робота ІТ-галузі та презентаційні навички', instructor: '(Викладач)' },
    { id: 4, name: 'Дослідження операцій', instructor: '(Викладач)' },
  ])
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">КУРСИ</h1>
      <div className="bg-secondary p-6 rounded-md">
        <CoursesList courses={courses} />
      </div>
    </div>
  )
}

export default CoursesPage