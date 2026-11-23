import { useEffect, useState } from "react";
import axios from "axios";

type Props = { onNext: (event: any) => void };

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  schedule: string;
  capacity: number;
<<<<<<< HEAD
  taken?: number;
};

const API_URL = process.env.REACT_APP_API_URL;

// Cover colours cycle per card, same palette as the Figma event cards.
const COVERS = [
  { bg: "#FFE7C2", fg: "#B86E00", icon: "♫" },
  { bg: "#E3E6FF", fg: "#3B44C6", icon: "⚙" },
  { bg: "#DDF5E8", fg: "#1F9254", icon: "⚑" },
  { bg: "#FCE1EC", fg: "#B8336A", icon: "★" },
];

const formatSchedule = (schedule: string) => {
  if (!schedule) return "No schedule";
  const d = new Date(schedule.replace(" ", "T"));
  return isNaN(d.getTime())
    ? schedule
    : d.toLocaleString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
};

const EventList = ({ onNext }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
=======
};
const API_URL = process.env.REACT_APP_API_URL;
const EventList = ({ onNext }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
>>>>>>> origin/main

  useEffect(() => {
    axios
      .get(`${API_URL}/api/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

<<<<<<< HEAD
  const query = search.trim().toLowerCase();
  const filtered = query
    ? events.filter((e) =>
        [e.title, e.description, e.location]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(query))
      )
    : events;

  // ✅ PAGINATION LOGIC
  const totalPages = Math.max(Math.ceil(filtered.length / itemsPerPage), 1);
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * itemsPerPage;
  const currentEvents = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="events-list">
      <div className="events-toolbar">
        <div className="search-field">
          <span>🔍</span>
          <input
            placeholder="Search events, venues…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {currentEvents.length === 0 ? (
        <div className="ui-card empty-state">
          {events.length === 0 ? "No events yet." : "No events match your search."}
        </div>
      ) : (
        <div className="event-grid">
          {currentEvents.map((event, i) => {
            const cover = COVERS[(startIndex + i) % COVERS.length];
            const capacity = Number(event.capacity || 0);
            const taken = Number(event.taken || 0);
            const full = capacity > 0 && taken >= capacity;

            return (
              <div className="event-card ui-card" key={event.id}>
                <div
                  className="event-cover"
                  style={{ background: cover.bg, color: cover.fg }}
                >
                  {cover.icon}
                </div>

                <div className="event-body">
                  <div className="event-meta-row">
                    <span className={`badge ${full ? "badge-muted" : "badge-success"}`}>
                      {full ? "Full" : "Open"}
                    </span>
                    {capacity > 0 && (
                      <span className="event-seats">
                        {taken} / {capacity} seats
                      </span>
                    )}
                  </div>

                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.description}</p>

                  <p className="event-meta">📍 {event.location}</p>
                  <p className="event-meta">🗓 {formatSchedule(event.schedule)}</p>
                </div>

                <div className="event-footer">
                  <button
                    className="primary-btn"
                    onClick={() => onNext(event)}
                    disabled={full}
                  >
                    {full ? "Fully booked" : "Book Event"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ PAGINATION CONTROLS */}
      <div className="pagination">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="pagination-controls">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setCurrentPage(page - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>
          <button
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => setCurrentPage(page + 1)}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
=======
  // ✅ PAGINATION LOGIC
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="events-card">
      <div className="events-top">
        <h2 className="section-title">Ongoing Event</h2>
        <input className="search-input" placeholder="Search ongoing events" />
      </div>

      {/* ✅ PAGINATED EVENTS */}
      {currentEvents.map((event) => (
        <div className="event-item" key={event.id}>
          <div className="event-left">
            <div className="event-title">{event.title}</div>

            <p className="event-desc">
              <b>Description:</b> {event.description}
            </p>

            <p className="event-desc">
              <b>Location:</b> {event.location}
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => onNext(event)}
          >
            Book Event
          </button>
        </div>
      ))}

      {/* ✅ PAGINATION CONTROLS */}
      <div className="pagination">
        <span
          style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          onClick={() =>
            currentPage > 1 && setCurrentPage(currentPage - 1)
          }
        >
          {"<"}
        </span>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <span
          style={{
            cursor:
              currentPage === totalPages || totalPages === 0
                ? "not-allowed"
                : "pointer",
          }}
          onClick={() =>
            currentPage < totalPages &&
            setCurrentPage(currentPage + 1)
          }
        >
          {">"}
        </span>
>>>>>>> origin/main
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default EventList;
=======
export default EventList;
>>>>>>> origin/main
