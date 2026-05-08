import axios from "axios";

type Props = {
  data: any;
  onBack: () => void;
};

const ConfirmReservation = ({ data, onBack }: Props) => {
  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:8080/api/bookings", {
        userId: data.user.id,
        event: { id: data.event.id },
        schedule: data.event.schedule,
        seats: data.seats,
      });

      alert("Reservation successful!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error booking event");
    }
  };

  return (
    <div className="form-card">
      <h2 className="confirm-title">Confirm Reservation</h2>

      <div className="form-grid">
        <div className="form-col">
          <label>Event Title</label>
          <input className="form-input" value={data?.event?.title || ""} readOnly />

          <label>Location</label>
          <input className="form-input" value={data?.event?.location || ""} readOnly />

          <label>Schedule</label>
          <input
            className="form-input"
            value={
              data?.event?.schedule
                ? new Date(data.event.schedule).toLocaleString()
                : ""
            }
            readOnly
          />

          <label>Status</label>
          <input className="form-input" value="CONFIRMED" readOnly />

          <label>No. of Reservation</label>
          <input className="form-input" value={data?.seats || ""} readOnly />
        </div>

        <div className="form-col">
          <label>Full Name</label>
          <input
            className="form-input"
            value={`${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`}
            readOnly
          />

          <label>Student ID</label>
          <input className="form-input" value={data?.user?.studentId || ""} readOnly />

          <label>Email</label>
          <input className="form-input" value={data?.user?.email || ""} readOnly />

          <label>Reservation Created</label>
          <input
            className="form-input"
            value={new Date().toLocaleString()}
            readOnly
          />

          <p className="note">
            <b>Note:</b> Please ensure that all your reservation details are correct.
          </p>
        </div>
      </div>

      <div className="button-row">
        <button className="secondary-btn" onClick={onBack}>
          Go Back
        </button>

        <button className="primary-btn" onClick={handleConfirm}>
          Confirm Reservation
        </button>
      </div>
    </div>
  );
};

export default ConfirmReservation;