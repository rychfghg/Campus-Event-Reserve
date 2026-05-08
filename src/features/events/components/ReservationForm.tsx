import { useState, useEffect } from "react";

type Props = {
  event: any;
  onBack: () => void;
  onNext: (data: any) => void;
};

const ReservationForm = ({ event, onBack, onNext }: Props) => {
  const [user, setUser] = useState<any>({});
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(u);
  }, []);

  const capacity = Number(event?.capacity || 0);
  const taken = Number(event?.taken || 0);
  const available = Math.max(capacity - taken, 0);

  const formattedSchedule = event?.schedule
    ? new Date(event.schedule).toLocaleString()
    : "";

  const handleProceed = () => {
    if (seats <= 0) {
      alert("Seats must be at least 1");
      return;
    }

    if (seats > available) {
      alert("Not enough available slots");
      return;
    }

    onNext({
      event,
      user,
      seats,
      available,
      taken,
    });
  };

  return (
    <div className="form-card">
      <div className="form-grid">

        <div className="form-col">
          <h3>Event Details</h3>

          <label>Event Title</label>
          <input className="form-input" value={event?.title || ""} readOnly />

          <label>Description</label>
          <textarea className="form-input" value={event?.description || ""} readOnly />

          <label>Location</label>
          <input className="form-input" value={event?.location || ""} readOnly />

          <label>Schedule</label>
          <input className="form-input" value={formattedSchedule} readOnly />

          <label>Total Capacity</label>
          <input className="form-input" value={capacity} readOnly />

          <div className="inline-group">
            <div style={{ width: "100%" }}>
              <label>Available</label>
              <input className="form-input" value={available} readOnly />
            </div>

            <div style={{ width: "100%" }}>
              <label>Taken</label>
              <input className="form-input" value={taken} readOnly />
            </div>
          </div>
        </div>

        <div className="form-col">
          <h3>Reservation Details</h3>

          <label>Full Name</label>
          <input
            className="form-input"
            value={`${user?.firstName || ""} ${user?.lastName || ""}`}
            readOnly
          />

          <label>Student ID</label>
          <input className="form-input" value={user?.studentId || ""} readOnly />

          <label>Email</label>
          <input className="form-input" value={user?.email || ""} readOnly />

          <label>No. of Seats</label>
          <input
            className="form-input"
            type="number"
            min={1}
            max={available}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          />

          {available === 0 && (
            <p style={{ color: "red", marginTop: "5px" }}>
              This event is already full
            </p>
          )}

          <label>Reservation Created</label>
          <input
            className="form-input"
            value={new Date().toLocaleString()}
            readOnly
          />
        </div>
      </div>

      <div className="button-row">
        <button className="secondary-btn" onClick={onBack}>
          Go Back
        </button>

        <button
          className="primary-btn"
          onClick={handleProceed}
          disabled={available === 0}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;