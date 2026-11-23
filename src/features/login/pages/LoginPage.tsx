import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/AuthLayout";
import { loginUser } from "../services/loginService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 LOGIN REQUEST:", { email, password });

      const res = await loginUser({
        email,
        password,
      });

      console.log("✅ LOGIN RESPONSE:", res.data);

      const user = res.data;

      if (user && user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Login failed.");
      }

    } catch (err: any) {
      // ✅ DEBUG LOGS
      console.log("❌ LOGIN ERROR STATUS:", err?.response?.status);
      console.log("❌ LOGIN ERROR DATA:", err?.response?.data);
      console.log("❌ FULL ERROR:", err);

      const status = err?.response?.status;
      const data = err?.response?.data;

      const serverMessage =
        typeof data === "string"
          ? data.trim()
          : typeof data?.message === "string"
          ? data.message.trim()
          : "";

      if (
        status === 401 ||
        serverMessage === "User not found" ||
        serverMessage === "Invalid password"
      ) {
        setError("Incorrect email or password");
      } else if (status === 500) {
        setError("Server error. Please try again later.");
      } else if (err?.request) {
        setError("Cannot connect to server.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div>
          <h2>Welcome back</h2>
          <p className="auth-subtitle">
            Sign in to reserve your next campus event.
          </p>
        </div>

        {error && <div className="form-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@school.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="primary-btn" type="submit">
            Sign in
          </button>
        </form>

        <div className="auth-alt">
          New here?
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
