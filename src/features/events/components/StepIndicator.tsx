type Props = { step: number };

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
    </div>
  );
};

export default StepIndicator;
