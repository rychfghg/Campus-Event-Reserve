type Props = { step: number };

<<<<<<< HEAD
const STEPS = ["Choose event", "Reservation details", "Confirm"];

const StepIndicator = ({ step }: Props) => {
  return (
    <div className="step-indicator">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "active" : "todo";

        return (
          <div className="step-wrap" key={label}>
            <div className={`step step-${state}`}>
              <span className="step-dot">{state === "done" ? "✓" : n}</span>
              <span className="step-label">{label}</span>
            </div>
            {n < STEPS.length && (
              <span className={`step-line ${n < step ? "step-line-done" : ""}`} />
            )}
          </div>
        );
      })}
=======
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
>>>>>>> origin/main
    </div>
  );
};

<<<<<<< HEAD
export default StepIndicator;
=======
export default StepIndicator;
>>>>>>> origin/main
