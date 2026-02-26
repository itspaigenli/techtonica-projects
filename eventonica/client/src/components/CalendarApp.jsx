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

  // events come from DB now
  const [events, setEvents] = useState([]);

  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  // added
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // helper: local YYYY-MM-DD (avoids UTC date shifting)
  const toYYYYMMDD = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const loadAllEvents = async () => {
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

  useEffect(() => {
    loadAllEvents();
  }, []);

  const searchEvents = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/api/events/search/${encodeURIComponent(searchTerm)}`,
      );
      if (!res.ok) throw new Error(`Failed to search events (${res.status})`);

      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to search events");
    } finally {
      setLoading(false);
    }
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

  // CREATE or UPDATE (DB)
  const handleEventSubmit = async () => {
    if (!eventText.trim()) {
      setError("Title is required.");
      return;
    }

    const payload = {
      event_date: toYYYYMMDD(selectedDate),
      event_time: `${String(eventTime.hours).padStart(2, "0")}:${String(eventTime.minutes).padStart(2, "0")}`,
      title: eventText.trim(),
      is_favorite: editingEvent ? Boolean(editingEvent.is_favorite) : false,
    };

    try {
      setError(null);

      const url = editingEvent
        ? `/api/events/${editingEvent.id}`
        : "/api/events";
      const method = editingEvent ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Failed to save event (${res.status})`);

      const saved = await res.json();

      // update local list
      setEvents((prev) => {
        const next = editingEvent
          ? prev.map((e) => (e.id === saved.id ? saved : e))
          : [...prev, saved];

        next.sort((a, b) => {
          const d = new Date(a.event_date) - new Date(b.event_date);
          if (d !== 0) return d;
          return String(a.event_time).localeCompare(String(b.event_time));
        });

        return next;
      });

      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      setShowEventPopup(false);
      setEditingEvent(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save event");
    }
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

  // DELETE (DB)
  const handleDeleteEvent = async (eventId) => {
    try {
      setError(null);

      const res = await fetch(`/api/events/${eventId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete event (${res.status})`);

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete event");
    }
  };

  // keep your original handler style
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  // FAVORITE toggle (DB) using PUT
  const handleToggleFavorite = async (event) => {
    try {
      setError(null);

      const payload = {
        event_date: event.event_date,
        event_time: String(event.event_time).slice(0, 5),
        title: event.title,
        is_favorite: !event.is_favorite,
      };

      const res = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Failed to update favorite (${res.status})`);

      const updated = await res.json();
      setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update favorite");
    }
  };

  // SHOW: selected day events + favorites from any day; favorites pinned to top
  const selectedDateString = toYYYYMMDD(selectedDate);

  const favorites = events.filter((e) => e.is_favorite === true);
  const selectedDayEvents = events.filter(
    (e) => e.event_date === selectedDateString,
  );

  const favoriteIds = new Set(favorites.map((e) => e.id));
  const merged = [
    ...favorites,
    ...selectedDayEvents.filter((e) => !favoriteIds.has(e.id)),
  ];

  const visibleEvents = merged.sort((a, b) => {
    if (a.is_favorite !== b.is_favorite) return a.is_favorite ? -1 : 1;
    const d = new Date(a.event_date) - new Date(b.event_date);
    if (d !== 0) return d;
    return String(a.event_time).localeCompare(String(b.event_time));
  });

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
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
        {/* Search bar (frontend requirement) */}
        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events by title..."
          />
          <button onClick={searchEvents}>Search</button>
          <button
            onClick={() => {
              setSearchTerm("");
              loadAllEvents();
            }}
          >
            Clear
          </button>
        </div>

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
                max={23}
                className="hours"
                value={eventTime.hours}
                onChange={handleTimeChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={59}
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

        {visibleEvents.map((event) => {
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
                <i
                  className={event.is_favorite ? "bx bxs-star" : "bx bx-star"}
                  onClick={() => handleToggleFavorite(event)}
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
