type Props = { step: number };

const StepIndicator = ({ step }: Props) => {
  return (
    <div className="step-indicator">
      <span className={step === 1 ? "step-active" : "step-inactive"}>
        Select Event
      </span>

      <span className={step === 2 ? "step-active" : "step-inactive"}>
        Enter Reservation Details
      </span>

      <span className={step === 3 ? "step-active" : "step-inactive"}>
        Confirm Reservation
      </span>
    </div>
  );
};

export default StepIndicator;