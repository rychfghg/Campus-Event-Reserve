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
      <div className="events-header">
        <h1>Events</h1>
        <StepIndicator step={step} />
      </div>

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