import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const ReservationList = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.id) return;

    axios
      .get(`${API_URL}/api/bookings/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching reservations:", err));
  }, []);

  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  const query = search.trim().toLowerCase();
  const filtered = query
    ? bookings.filter((b) =>
        [b.event?.title, b.event?.location, b.status]
          .filter(Boolean)
          .some((v: string) => v.toLowerCase().includes(query))
      )
    : bookings;

  // ✅ CALCULATIONS
  const totalPages = Math.max(Math.ceil(filtered.length / itemsPerPage), 1);
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * itemsPerPage;
  const currentBookings = filtered.slice(startIndex, startIndex + itemsPerPage);

  const formatSchedule = (s?: string) => {
    if (!s) return "";
    const d = new Date(String(s).replace(" ", "T"));
    return isNaN(d.getTime()) ? s : d.toLocaleString();
  };

  return (
    <div className="reservation-list">
      <div className="reservation-toolbar">
        <div className="search-field">
          <span>🔍</span>
          <input
            placeholder="Search your reservations"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {currentBookings.length === 0 ? (
        <div className="ui-card empty-state">
          {bookings.length === 0
            ? "You haven’t reserved any events yet."
            : "No reservations match your search."}
        </div>
      ) : (
        <div className="reservation-items">
          {currentBookings.map((b) => {
            const status = String(b.status || "CONFIRMED").toUpperCase();
            const isOpen = openId === b.id;

            return (
              <div className="reservation-item ui-card" key={b.id}>
                <div className="reservation-main">
                  <div className="reservation-icon">🎟</div>

                  <div className="reservation-info">
                    <div className="reservation-name">
                      {b.event?.title || "Event"}
                    </div>
                    <div className="reservation-meta">
                      📍 {b.event?.location || "N/A"}
                      {b.event?.schedule && (
                        <> &nbsp;·&nbsp; 🗓 {formatSchedule(b.event.schedule)}</>
                      )}
                    </div>
                  </div>

                  <span className="reservation-seats">
                    {b.seats ?? 1} seat{(b.seats ?? 1) === 1 ? "" : "s"}
                  </span>

                  <span
                    className={`badge ${
                      status === "CONFIRMED"
                        ? "badge-success"
                        : status === "PENDING"
                        ? "badge-warning"
                        : "badge-muted"
                    }`}
                  >
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </span>

                  <button
                    className="secondary-btn btn-sm"
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : b.id)}
                  >
                    {isOpen ? "Hide" : "View"}
                  </button>
                </div>

                {isOpen && (
                  <div className="reservation-details">
                    <p>
                      <b>Description:</b> {b.event?.description || "N/A"}
                    </p>
                    <p>
                      <b>Booking ID:</b> #{b.id}
                    </p>
                  </div>
                )}
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
      </div>
    </div>
  );
};

export default ReservationList;
