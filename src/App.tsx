import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./features/login/pages/LoginPage";
import RegisterPage from "./features/register/pages/RegisterPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;