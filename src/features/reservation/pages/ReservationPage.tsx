import ReservationList from "../components/ReservationList";
import "../../../styles/reservation.css";

const ReservationPage = () => {
  return (
    <div className="reservation-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My reservations</h1>
          <p className="page-subtitle">
            Track and manage every event you’ve booked.
          </p>
        </div>
      </div>

      <ReservationList />
    </div>
  );
};

export default ReservationPage;
