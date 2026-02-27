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
  const [searchTerm, setSearchTerm] = useState("");
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const sortEvents = (list) => {
    return [...list].sort((a, b) => {
      // favorites first
      if (a.is_favorite !== b.is_favorite) return b.is_favorite - a.is_favorite;

      // then by date+time
      const aDT = new Date(`${a.event_date}T${a.event_time}`);
      const bDT = new Date(`${b.event_date}T${b.event_time}`);
      return aDT - bDT;
    });
  };

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear,
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear,
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        setEvents(sortEvents(data));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

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

  const handleEventSubmit = async () => {
    const payload = {
      event_date: selectedDate.toISOString().split("T")[0],
      event_time: `${eventTime.hours}:${eventTime.minutes}`,
      title: eventText,
      is_favorite: editingEvent?.is_favorite ?? false,
    };

    try {
      // UPDATE
      if (editingEvent) {
        const response = await fetch(
          `http://localhost:3000/events/${editingEvent.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("Update failed:", response.status, text);
          return;
        }

        const updated = await response.json();

        setEvents((prev) =>
          sortEvents(prev.map((e) => (e.id === updated.id ? updated : e))),
        );

        setShowEventPopup(false);
        setEditingEvent(null);
        setEventText("");
        setEventTime({ hours: "00", minutes: "00" });
        return;
      }

      // CREATE
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Create failed:", response.status, text);
        return;
      }

      const created = await response.json();

      setEvents((prev) => sortEvents([...prev, created]));
      setShowEventPopup(false);
      setEditingEvent(null);
      setEventText("");
      setEventTime({ hours: "00", minutes: "00" });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.event_date));
    setEventTime({
      hours: event.event_time.split(":")[0],
      minutes: event.event_time.split(":")[1],
    });
    setEventText(event.title);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Delete failed:", response.status, text);
        return;
      }

      setEvents((prev) =>
        sortEvents(prev.filter((event) => event.id !== eventId)),
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  const handleToggleFavorite = async (event) => {
    try {
      const payload = {
        event_date: event.event_date,
        event_time: event.event_time,
        title: event.title,
        is_favorite: !event.is_favorite,
      };

      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Favorite toggle failed:", response.status, text);
        return;
      }

      const updated = await response.json();

      setEvents((prev) =>
        sortEvents(prev.map((e) => (e.id === updated.id ? updated : e))),
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;

    const title = (event.title || "").toLowerCase();
    return title.includes(q);
  });

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>

        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[selectedDate.getMonth()]}</h2>
          <h2 className="day">{selectedDate.getDate()},</h2>
          <h2 className="year">{selectedDate.getFullYear()}</h2>

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
        <div className="search">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm("")}>Clear</button>
        </div>
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

        {filteredEvents.map((event) => (
          <div className="event" key={event.id}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthsOfYear[new Date(event.event_date).getMonth()]
              } ${new Date(event.event_date).getDate()}, ${new Date(
                event.event_date,
              ).getFullYear()}`}</div>

              <div className="event-time">{event.event_time}</div>
            </div>

            <div className="event-text">{event.title}</div>

            <div className="event-buttons">
              <i
                className={event.is_favorite ? "bx bxs-star" : "bx bx-star"}
                onClick={() => handleToggleFavorite(event)}
                title={event.is_favorite ? "Unfavorite" : "Favorite"}
              ></i>

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
        ))}
      </div>
    </div>
  );
};

export default CalendarApp;
