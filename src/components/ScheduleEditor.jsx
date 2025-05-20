import { useState, useEffect } from 'react'
import { getWeekDays } from '../utils/dateUtils'

function ScheduleEditor() {
  const weekDays = getWeekDays()
  
  // Initial schedule data (same as in Schedule.jsx)
  const [schedule, setSchedule] = useState([
    {
      day: 'Пн',
      lessons: [
        { time: '8:30 - 9:50', subject: 'КМ', type: 'лекція', empty: false },
        { time: '10:05 - 11:25', subject: 'СА', type: 'практична', empty: false },
        { time: '11:40 - 13:00', subject: 'КРПН', type: 'лабораторна', empty: false },
        { time: '13:15 - 14:35', subject: '', type: '', empty: true },
        { time: '14:50 - 16:10', subject: 'ДО', type: 'лабораторна', empty: false }
      ]
    },
    {
      day: 'Вт',
      lessons: [
        { time: '8:30 - 9:50', subject: 'КМ', type: 'практична', empty: false },
        { time: '10:05 - 11:25', subject: '', type: '', empty: true },
        { time: '11:40 - 13:00', subject: 'КМ', type: 'лабораторна', empty: false },
        { time: '13:15 - 14:35', subject: '', type: '', empty: true },
        { time: '14:50 - 16:10', subject: '', type: '', empty: true }
      ]
    },
    {
      day: 'Ср',
      lessons: [
        { time: '8:30 - 9:50', subject: 'КМ', type: 'практична', empty: false },
        { time: '10:05 - 11:25', subject: '', type: '', empty: true },
        { time: '11:40 - 13:00', subject: '', type: '', empty: true },
        { time: '13:15 - 14:35', subject: 'СА', type: 'лекція', empty: false },
        { time: '14:50 - 16:10', subject: '', type: '', empty: true }
      ]
    },
    {
      day: 'Чт',
      lessons: [
        { time: '8:30 - 9:50', subject: '', type: '', empty: true },
        { time: '10:05 - 11:25', subject: 'СА', type: 'практика', empty: false },
        { time: '11:40 - 13:00', subject: 'ДО', type: 'лекція', empty: false },
        { time: '13:15 - 14:35', subject: '', type: '', empty: true },
        { time: '14:50 - 16:10', subject: '', type: '', empty: true }
      ]
    },
    {
      day: 'Пт',
      lessons: [
        { time: '8:30 - 9:50', subject: 'КРПН', type: 'лекція', empty: false },
        { time: '10:05 - 11:25', subject: '', type: '', empty: true },
        { time: '11:40 - 13:00', subject: 'СА', type: 'лабораторна', empty: false },
        { time: '13:15 - 14:35', subject: 'КРПН', type: 'лекція', empty: false },
        { time: '14:50 - 16:10', subject: '', type: '', empty: true }
      ]
    },
    {
      day: 'Сб',
      lessons: [
        { time: '8:30 - 9:50', subject: 'КРПН', type: 'практична', empty: false },
        { time: '10:05 - 11:25', subject: 'ДО', type: 'практична', empty: false },
        { time: '11:40 - 13:00', subject: '', type: '', empty: true },
        { time: '13:15 - 14:35', subject: '', type: '', empty: true },
        { time: '14:50 - 16:10', subject: '', type: '', empty: true }
      ]
    }
  ])
  
  // Available subjects and lesson types for dropdowns
  const subjects = ['КМ', 'СА', 'КРПН', 'ДО']
  const lessonTypes = ['лекція', 'практична', 'лабораторна', 'практика']
  
  const handleCellChange = (dayIndex, lessonIndex, field, value) => {
    const updatedSchedule = [...schedule]
    
    // If switching from empty to non-empty or vice versa
    if (field === 'empty') {
      updatedSchedule[dayIndex].lessons[lessonIndex].empty = value
      if (value) {
        updatedSchedule[dayIndex].lessons[lessonIndex].subject = ''
        updatedSchedule[dayIndex].lessons[lessonIndex].type = ''
      }
    } else {
      updatedSchedule[dayIndex].lessons[lessonIndex][field] = value
      
      // If adding content to an empty cell, mark it as non-empty
      if (field === 'subject' && value !== '' && updatedSchedule[dayIndex].lessons[lessonIndex].empty) {
        updatedSchedule[dayIndex].lessons[lessonIndex].empty = false
      }
    }
    
    setSchedule(updatedSchedule)
  }
  
  return (
    <div className="table-container">
      <table className="schedule-table">
        <thead>
          <tr>
            <th></th>
            {weekDays.slice(0, 6).map(day => (
              <th key={day.short}>{day.short}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule[0].lessons.map((_, lessonIndex) => (
            <tr key={lessonIndex}>
              <td className="font-semibold text-xs">
                {schedule[0].lessons[lessonIndex].time}
              </td>
              
              {weekDays.slice(0, 6).map((day, dayIndex) => {
                const lesson = schedule[dayIndex]?.lessons[lessonIndex]
                return (
                  <td key={`${day.short}-${lessonIndex}`} className="text-xs">
                    <div className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={!lesson?.empty}
                        onChange={(e) => handleCellChange(dayIndex, lessonIndex, 'empty', !e.target.checked)}
                        className="mr-2"
                      />
                      <span>Є заняття</span>
                    </div>
                    
                    {!lesson?.empty && (
                      <>
                        <select
                          value={lesson?.subject || ''}
                          onChange={(e) => handleCellChange(dayIndex, lessonIndex, 'subject', e.target.value)}
                          className="w-full p-1 mb-1 border rounded text-xs"
                        >
                          <option value="">Оберіть предмет</option>
                          {subjects.map(subj => (
                            <option key={subj} value={subj}>{subj}</option>
                          ))}
                        </select>
                        
                        <select
                          value={lesson?.type || ''}
                          onChange={(e) => handleCellChange(dayIndex, lessonIndex, 'type', e.target.value)}
                          className="w-full p-1 border rounded text-xs"
                        >
                          <option value="">Оберіть тип</option>
                          {lessonTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleEditor