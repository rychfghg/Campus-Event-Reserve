import axios from "axios";

type Props = {
  data: any;
  onBack: () => void;
};

const ConfirmReservation = ({ data, onBack }: Props) => {
   const API_URL = process.env.REACT_APP_API_URL;
  const handleConfirm = async () => {
    try {
      await axios.post(`${API_URL}/api/bookings`, {
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

<<<<<<< HEAD

  const rows: [string, string][] = [
    ["Name", `${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`.trim()],
    ["Student ID", data?.user?.studentId || ""],
    ["Email", data?.user?.email || ""],
    [
      "Schedule",
      data?.event?.schedule ? new Date(data.event.schedule).toLocaleString() : "",
    ],
    ["Seats", String(data?.seats || "")],
    ["Reservation created", new Date().toLocaleString()],
  ];

  return (
    <div className="booking-layout">
      <aside className="event-summary ui-card">
        <div className="summary-cover">🎟</div>
        <div className="summary-body">
          <h3 className="summary-title">{data?.event?.title || "Event"}</h3>
          <div className="summary-row">
            <span>Venue</span>
            <b>{data?.event?.location || "—"}</b>
          </div>
          <div className="summary-row">
            <span>Status</span>
            <span className="badge badge-success">Confirmed on submit</span>
          </div>
        </div>
      </aside>

      <section className="form-card ui-card">
        <h3 className="form-card-title">Your details</h3>

        <div className="review-list">
          {rows.map(([label, value]) => (
            <div className="review-row" key={label}>
              <span>{label}</span>
              <b>{value || "—"}</b>
            </div>
          ))}
        </div>

        <p className="note">
          ℹ Please make sure all your reservation details are correct before
          confirming.
        </p>

        <div className="button-row">
          <button className="secondary-btn" onClick={onBack}>
            Back
          </button>

          <button className="primary-btn" onClick={handleConfirm}>
            Confirm reservation
          </button>
        </div>
      </section>
=======
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
>>>>>>> origin/main
    </div>
  );
};

<<<<<<< HEAD
export default ConfirmReservation;
=======
export default ConfirmReservation;
>>>>>>> origin/main
