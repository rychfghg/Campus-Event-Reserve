import ReservationList from "../components/ReservationList";
import "../../../styles/reservation.css";

const ReservationPage = () => {
  return (
    <div className="reservation-page">
      <h1 className="reservation-title">My Reservation</h1>

      <ReservationList />
    </div>
  );
};

export default ReservationPage;