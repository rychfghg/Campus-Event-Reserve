import React from "react";
import "../styles/auth.css";

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>CamsusEvent Reserve</h1>
        <p>Book Your Campus Moments.</p>
      </div>

      <div className="auth-right">{children}</div>
    </div>
  );
};

export default AuthLayout;