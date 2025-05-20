import { useState } from 'react'
import { getWeekDays } from '../utils/dateUtils'

function Schedule() {
  const weekDays = getWeekDays()
  
  // Mock schedule data
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
          {schedule[0].lessons.map((_, index) => (
            <tr key={index}>
              <td className="font-semibold text-xs">
                {schedule[0].lessons[index].time}
              </td>
              
              {weekDays.slice(0, 6).map((day, dayIndex) => {
                const lesson = schedule[dayIndex]?.lessons[index]
                return (
                  <td key={day.short} className={`text-xs ${lesson?.empty ? 'bg-gray-50' : ''}`}>
                    {!lesson?.empty && (
                      <>
                        <div className="font-semibold">{lesson?.subject}</div>
                        <div className="text-text-light">{lesson?.type}</div>
                      </>
                    )}
                    {lesson?.empty && <div>пусто</div>}
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

export default Schedule