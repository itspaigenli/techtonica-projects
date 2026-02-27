import { useState, useEffect, useReducer } from "react";

const initialFormState = {
  isOpen: false,
  time: { hours: "00", minutes: "00" },
  text: "",
  editingEvent: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case "OPEN_NEW":
      return {
        isOpen: true,
        time: { hours: "00", minutes: "00" },
        text: "",
        editingEvent: null,
      };

    case "OPEN_EDIT":
      return {
        isOpen: true,
        time: action.payload.time,
        text: action.payload.text,
        editingEvent: action.payload.editingEvent,
      };

    case "CLOSE":
      return { ...state, isOpen: false };

    case "SET_TIME":
      return { ...state, time: { ...state.time, ...action.payload } };

    case "SET_TEXT":
      return { ...state, text: action.payload };

    case "RESET":
      return initialFormState;

    default:
      return state;
  }
}

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
  const [events, setEvents] = useState([]);
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const sortEvents = (list) => {
    return [...list].sort((a, b) => {
      // favorites first
      if (a.is_favorite !== b.is_favorite) return b.is_favorite - a.is_favorite;

      // normalize to strings
      const aDate = String(a.event_date).slice(0, 10); // keeps YYYY-MM-DD
      const bDate = String(b.event_date).slice(0, 10);

      if (aDate !== bDate) return aDate.localeCompare(bDate);

      const aTime = String(a.event_time);
      const bTime = String(b.event_time);

      return aTime.localeCompare(bTime);
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
      dispatchForm({ type: "OPEN_NEW" });
    }
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    dispatchForm({
      type: "SET_TIME",
      payload: { [name]: value.padStart(2, "0") },
    });
  };

  const handleEventSubmit = async () => {
    const payload = {
      event_date: selectedDate.toISOString().split("T")[0],
      event_time: `${formState.time.hours}:${formState.time.minutes}`,
      title: formState.text,
      is_favorite: formState.editingEvent?.is_favorite ?? false,
    };

    try {
      // UPDATE
      if (formState.editingEvent) {
        const response = await fetch(
          `http://localhost:3000/events/${formState.editingEvent.id}`,
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

        dispatchForm({ type: "RESET" });
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
      dispatchForm({ type: "RESET" });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.event_date));
    dispatchForm({
      type: "OPEN_EDIT",
      payload: {
        time: {
          hours: event.event_time.split(":")[0],
          minutes: event.event_time.split(":")[1],
        },
        text: event.title,
        editingEvent: event,
      },
    });
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

        {formState.isOpen && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={formState.time.hours}
                onChange={handleTimeChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={formState.time.minutes}
                onChange={handleTimeChange}
              />
            </div>

            <textarea
              placeholder="Enter Event Text (Maximum 60 Characters)"
              value={formState.text}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  dispatchForm({ type: "SET_TEXT", payload: e.target.value });
                }
              }}
            ></textarea>

            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {formState.editingEvent ? "Update Event" : "Add Event"}
            </button>

            <button
              className="close-event-popup"
              onClick={() => dispatchForm({ type: "CLOSE" })}
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
