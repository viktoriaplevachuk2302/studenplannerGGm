import { useState } from 'react'
import CourseItem from './CourseItem'

function CoursesList({ courses }) {
  return (
    <div className="space-y-4">
      {courses.map(course => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  )
}

export default CoursesList