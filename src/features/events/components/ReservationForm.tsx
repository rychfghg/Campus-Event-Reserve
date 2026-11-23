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
    <div className="booking-layout">
      <aside className="event-summary ui-card">
        <div className="summary-cover">🎟</div>
        <div className="summary-body">
          <h3 className="summary-title">{event?.title || "Event"}</h3>
          {event?.description && (
            <p className="summary-desc">{event.description}</p>
          )}

          <div className="summary-row">
            <span>Venue</span>
            <b>{event?.location || "—"}</b>
          </div>
          <div className="summary-row">
            <span>Schedule</span>
            <b>{formattedSchedule || "—"}</b>
          </div>
          <div className="summary-row">
            <span>Capacity</span>
            <b>{capacity}</b>
          </div>
          <div className="summary-row">
            <span>Available</span>
            <b className={available === 0 ? "text-danger" : "text-success"}>
              {available}
            </b>
          </div>
          <div className="summary-row">
            <span>Taken</span>
            <b>{taken}</b>
          </div>
        </div>
      </aside>

      <section className="form-card ui-card">
        <h3 className="form-card-title">Reservation details</h3>

        <div className="field-row">
          <div className="field">
            <label>Full name</label>
            <input
              className="form-input"
              value={`${user?.firstName || ""} ${user?.lastName || ""}`}
              readOnly
            />
          </div>
          <div className="field">
            <label>Student ID</label>
            <input className="form-input" value={user?.studentId || ""} readOnly />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label>Email</label>
            <input className="form-input" value={user?.email || ""} readOnly />
          </div>
          <div className="field">
            <label>Number of seats</label>
            <input
              className="form-input"
              type="number"
              min={1}
              max={available}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            />
          </div>
        </div>

        {available === 0 && (
          <div className="form-error">This event is already full.</div>
        )}

        <div className="field">
          <label>Reservation created</label>
          <input
            className="form-input"
            value={new Date().toLocaleString()}
            readOnly
          />
        </div>

        <div className="button-row">
          <button className="secondary-btn" onClick={onBack}>
            Back
          </button>

          <button
            className="primary-btn"
            onClick={handleProceed}
            disabled={available === 0}
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );
};

export default ReservationForm;
