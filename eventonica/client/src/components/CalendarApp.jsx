  import {useState} from 'react'
  
  const CalendarApp = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const currentDate = new Date()

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
     const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
     const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

     const prevMonth = () => {
      setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
      setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
     }


  return (
  <div className="calendar-app">
    <div className="calendar">
      <h1 className="heading">Calendar</h1>
      <div className="navigate-date">
      <h2 className="month">January</h2>
      <h2 className="year">2026</h2>
      <div className="buttons">
        <i className="bx bx-chevron-left"></i>
        <i className="bx bx-chevron-right"></i>
      </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {[...Array(daysInMonth).keys()].map((day) => <span key={day+1}>{day+1}</span>)}
      </div>
      </div>
      <div className="events">
        <div className="event-popup">
          <div className="time-input">
            <div className="event-popup-time">Time</div>
            <input type="number" name="hours" min={0} max={24} className="hours" />
            <input type="number" name="minutes" min={0} max={60} className="minutes" />
            </div>
            <textarea placeholder="Enter Event Text (Maximum 60 characters)"></textarea>
            <button className="event-popup-btn">Add Event</button>
            <button className="close-event-popup">
              <i className="bx bx-x"></i>
            </button>
          </div>
          <div className="event">
            <div className="event-date-wrapper">
              <div className="event-date">January 1, 2026</div>
              <div className="event-time">00:01</div>
            </div>
            <div className="event-text">New Year's Day</div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bxs-message-alt-x"></i>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CalendarApp