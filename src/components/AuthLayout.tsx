import React from "react";
<<<<<<< HEAD
import Logo from "./Logo";
=======
>>>>>>> origin/main
import "../styles/auth.css";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-left">
<<<<<<< HEAD
        <div className="auth-brand">
          <Logo size={80} />
          <h1>CampusEvent Reserve</h1>
          <p className="auth-tagline">
            Book your campus moments — discover events, reserve your seat, and
            never miss what matters.
          </p>

          <ul className="auth-features">
            <li>Browse every campus event in one place</li>
            <li>Reserve seats in seconds</li>
            <li>Get instant booking confirmation</li>
          </ul>
        </div>
=======
        <h1>CamsusEvent Reserve</h1>
        <p>Book Your Campus Moments.</p>
>>>>>>> origin/main
      </div>

      <div className="auth-right">{children}</div>
    </div>
  );
};

<<<<<<< HEAD
export default AuthLayout;
=======
export default AuthLayout;
>>>>>>> origin/main
