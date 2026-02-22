import { useState, useEffect } from "react";

const CalendarApp = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headerDate = selectedDate ?? currentDate;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/events");
        if (!res.ok) throw new Error(`Failed to load events (${res.status})`);

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 0 ? 11 : prev - 1;
      const newYear = prev === 0 ? currentYear - 1 : currentYear;

      setCurrentYear(newYear);
      setSelectedDate(new Date(newYear, newMonth, 1));

      return newMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 11 ? 0 : prev + 1;
      const newYear = prev === 11 ? currentYear + 1 : currentYear;

      setCurrentYear(newYear);
      setSelectedDate(new Date(newYear, newMonth, 1));

      return newMonth;
    });
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      setEditingEvent(null);
    }
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      event_date: selectedDate.toISOString().split("T")[0], // "YYYY-MM-DD"
      event_time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`,
      title: eventText,
      is_favorite: editingEvent ? Boolean(editingEvent.is_favorite) : false,
    };

    let updatedEvents = [...events];

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event,
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort(
      (a, b) => new Date(a.event_date) - new Date(b.event_date),
    );

    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.event_date));

    setEventTime({
      hours: String(event.event_time).split(":")[0],
      minutes: String(event.event_time).split(":")[1],
    });

    setEventText(event.title);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <div className="navigate-date">
          <h2 className="month">
            {monthsOfYear[headerDate.getMonth()]} {headerDate.getDate()},
          </h2>
          <h2 className="year">{headerDate.getFullYear()}</h2>

          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>

        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="events">
        {loading && <div>Loading events…</div>}
        {error && <div style={{ color: "crimson" }}>{error}</div>}
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={handleTimeChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={handleTimeChange}
              />
            </div>

            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>

            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? "Update Event" : "Add Event"}
            </button>

            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}

        {events.map((event) => {
          const displayDate = new Date(event.event_date);

          return (
            <div className="event" key={event.id}>
              <div className="event-date-wrapper">
                <div className="event-date">{`${
                  monthsOfYear[displayDate.getMonth()]
                } ${displayDate.getDate()}, ${displayDate.getFullYear()}`}</div>
                <div className="event-time">
                  {String(event.event_time).slice(0, 5)}
                </div>
              </div>

              <div className="event-text">{event.title}</div>

              <div className="event-buttons">
                <i
                  className="bx bxs-edit-alt"
                  onClick={() => handleEditEvent(event)}
                ></i>
                <i
                  className="bx bxs-message-alt-x"
                  onClick={() => handleDeleteEvent(event.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarApp;
