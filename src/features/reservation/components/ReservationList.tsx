import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const ReservationList = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.id) return;

    axios
      .get(`${API_URL}/api/bookings/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching reservations:", err));
  }, []);

  // ✅ CALCULATIONS
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="reservation-card">
      <div className="reservation-top">
        <div></div>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search your reservation" />
          <span className="menu-icon">≡</span>
        </div>
      </div>

      {/* ✅ PAGINATED LIST */}
      {currentBookings.map((b) => (
        <div className="reservation-item" key={b.id}>
          <div className="reservation-left">
            <div className="reservation-title-item">
              {b.event?.title || "Event"}
            </div>

            <p className="reservation-desc">
              <b>Description:</b> {b.event?.description || "N/A"}
            </p>

            <p className="reservation-desc">
              <b>Location:</b> {b.event?.location || "N/A"}
            </p>

            <p className="reservation-desc">
              <b>Status:</b> {b.status || "CONFIRMED"}
            </p>

            <p className="reservation-desc">
              <b>Reserved Seats:</b> {b.seats ?? 1}
            </p>
          </div>

          <button className="primary-btn" type="button">
            View
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

export default ReservationList;