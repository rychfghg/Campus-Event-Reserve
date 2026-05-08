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
};
const API_URL = process.env.REACT_APP_API_URL;
const EventList = ({ onNext }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

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
      </div>
    </div>
  );
};

export default EventList;