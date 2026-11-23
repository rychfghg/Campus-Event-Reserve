import React from "react";
import Logo from "./Logo";
import "../styles/auth.css";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-left">
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
      </div>

      <div className="auth-right">{children}</div>
    </div>
  );
};

export default AuthLayout;
