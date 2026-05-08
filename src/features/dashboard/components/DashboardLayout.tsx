import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/dashboard.css";
import EventsPage from "../../events/pages/EventsPage";
import ReservationPage from "../../reservation/pages/ReservationPage";
import ProfilePage from "../../profile/pages/ProfilePage";

type Page = "dashboard" | "events" | "reservation" | "profile";

const DashboardLayout = () => {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const navigate = useNavigate();

  // ✅ store full user
  const [user, setUser] = useState<any>({});

  // ✅ dashboard counts
  const [ongoingEventsCount, setOngoingEventsCount] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);

  // ✅ load + sync user
  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedUser);
    };

    loadUser();

    // listen for updates from ProfilePage
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // ✅ fetch dashboard stats
  // ✅ fetch dashboard stats
useEffect(() => {
  const fetchDashboardStats = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser?.id;

      // ✅ fetch all events
      const eventsResponse = await fetch("http://localhost:8080/api/events");
      const events = await eventsResponse.json();

      console.log("EVENTS FROM BACKEND:", events);

      // ✅ count ongoing/current events
      const now = new Date();

      const ongoingEvents = events.filter((event: any) => {
        if (!event.schedule) return false;

        // ✅ Fix Spring Boot LocalDateTime string
        const fixedSchedule = event.schedule.replace(" ", "T");
        const eventDate = new Date(fixedSchedule);

        console.log("EVENT SCHEDULE:", event.schedule);
        console.log("EVENT DATE:", eventDate);
        console.log("NOW:", now);

        return !isNaN(eventDate.getTime()) && eventDate >= now;
      });

      console.log("ONGOING EVENTS:", ongoingEvents);

      setOngoingEventsCount(ongoingEvents.length);

      // ✅ fetch total reservations of logged-in user
      if (userId) {
        const bookingsResponse = await fetch(
          `http://localhost:8080/api/bookings/${userId}`
        );

        const bookings = await bookingsResponse.json();

        setTotalReservations(bookings.length);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  fetchDashboardStats();
}, []);

  // ✅ computed name (same logic as before)
  const userName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const renderContent = () => {
    switch (activePage) {
      case "events":
        return <EventsPage />;

      case "reservation":
        return <ReservationPage />;

      case "profile":
        return <ProfilePage />;

      default:
        return (
          <>
            <h2 className="welcome">Hi {userName}, welcome back!</h2>

            <div className="cards">
              <div className="card">
                <p className="card-title">Total Ongoing Events</p>
                <h1 className="card-number">{ongoingEventsCount}</h1>
                <div className="card-button-wrap">
                  <button onClick={() => setActivePage("events")}>
                    View Events
                  </button>
                </div>
              </div>

              <div className="card">
                <p className="card-title">Total Reservations</p>
                <h1 className="card-number">{totalReservations}</h1>
                <div className="card-button-wrap">
                  <button onClick={() => setActivePage("reservation")}>
                    View Reservations
                  </button>
                </div>
              </div>
            </div>

            <div className="big-box dashboard-info-box">
  <div className="dashboard-overlay"></div>

  <div className="dashboard-content">
    <div className="dashboard-badge">
      CAMPUS EVENT RESERVE
    </div>

    <h1 className="dashboard-hero-title">
      Experience campus events
      <span> smarter & faster.</span>
    </h1>

    <p className="dashboard-hero-text">
      Reserve your seats, explore upcoming university activities,
      and manage all your event participation in one modern platform.
    </p>

 
    
  </div>

  <div className="floating-circle one"></div>
  <div className="floating-circle two"></div>
  <div className="floating-circle three"></div>
</div>
          </>
        );
    }
  };

  return (
    <div className="dashboard-shell">
      <div className="dashboard-frame">
        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="logo-box">CER</div>
            <p className="sidebar-heading">Dashboard</p>

            <div className="menu">
              <button
                className={activePage === "dashboard" ? "active" : ""}
                onClick={() => setActivePage("dashboard")}
              >
                Dashboard
              </button>

              <button
                className={activePage === "events" ? "active" : ""}
                onClick={() => setActivePage("events")}
              >
                Events
              </button>

              <button
                className={activePage === "reservation" ? "active" : ""}
                onClick={() => setActivePage("reservation")}
              >
                Reservation
              </button>

              <button
                className={activePage === "profile" ? "active" : ""}
                onClick={() => setActivePage("profile")}
              >
                Profile
              </button>
            </div>
          </div>

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="main">
          {activePage === "dashboard" && (
            <div className="topbar">
              <div className="user-block">
                <div className="user-text">
                  <p className="username">{userName}</p>
                  <p className="user-role">Student</p>
                </div>

                {/* ✅ UPDATED AVATAR */}
                <div className="avatar">
                  {user?.profileImage &&
                  typeof user.profileImage === "string" &&
                  user.profileImage.startsWith("data:image") ? (
                    <img src={user.profileImage} alt="avatar" />
                  ) : (
                    <span>
                      {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div
            className={`content ${
              activePage !== "dashboard" ? "content-no-topbar" : ""
            }`}
          >
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;