import { useState } from 'react'

function CourseItem({ course }) {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="p-4 bg-secondary-dark md:col-span-2">
          <h3 className="text-lg font-semibold">{course.name}</h3>
        </div>
        <div className="p-4 bg-white text-right">
          <p>{course.instructor}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseItem