import { useState } from "react";
import EventList from "../components/EventList";
import ReservationForm from "../components/ReservationForm";
import ConfirmReservation from "../components/ConfirmReservation";
import StepIndicator from "../components/StepIndicator";
import "../../../styles/event.css";

const EventsPage = () => {
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [reservationData, setReservationData] = useState<any>(null);

  return (
    <div className="events-page">
<<<<<<< HEAD
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {step === 1 ? "Events" : step === 2 ? "Reserve a seat" : "Confirm reservation"}
          </h1>
          <p className="page-subtitle">
            {step === 1
              ? "Find and reserve a spot at upcoming campus events."
              : step === 2
              ? "Fill in your reservation details."
              : "Review everything before you confirm."}
          </p>
        </div>
      </div>

      <StepIndicator step={step} />

=======
      <div className="events-header">
        <h1>Events</h1>
        <StepIndicator step={step} />
      </div>

>>>>>>> origin/main
      {step === 1 && (
        <EventList
          onNext={(event) => {
            setSelectedEvent(event);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <ReservationForm
          event={selectedEvent}
          onBack={() => setStep(1)}
          onNext={(data) => {
            setReservationData(data);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <ConfirmReservation
          data={reservationData}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
};

export default EventsPage;