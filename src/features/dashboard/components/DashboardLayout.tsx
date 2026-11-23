import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/dashboard.css";
import EventsPage from "../../events/pages/EventsPage";
import ReservationPage from "../../reservation/pages/ReservationPage";
import ProfilePage from "../../profile/pages/ProfilePage";
<<<<<<< HEAD
import Logo from "../../../components/Logo";
=======
>>>>>>> origin/main

type Page = "dashboard" | "events" | "reservation" | "profile";
const API_URL = process.env.REACT_APP_API_URL;
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
     const eventsResponse = await fetch(`${API_URL}/api/events`);
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
         `${API_URL}/api/bookings/${userId}`
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

<<<<<<< HEAD
  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "▦" },
    { id: "events", label: "Events", icon: "◷" },
    { id: "reservation", label: "My Reservations", icon: "☑" },
    { id: "profile", label: "Profile", icon: "◉" },
  ];

=======
>>>>>>> origin/main
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
<<<<<<< HEAD
            <div className="page-header">
              <div>
                <h1 className="page-title">Hi {userName} 👋</h1>
                <p className="page-subtitle">
                  Here’s what’s happening on campus.
                </p>
              </div>
            </div>

            <div className="cards">
              <div className="card ui-card">
                <div className="card-icon card-icon-primary">◷</div>
                <div className="card-text">
                  <p className="card-title">Upcoming Events</p>
                  <p className="card-number">{ongoingEventsCount}</p>
                </div>
                <button
                  className="secondary-btn btn-sm"
                  onClick={() => setActivePage("events")}
                >
                  View Events
                </button>
              </div>

              <div className="card ui-card">
                <div className="card-icon card-icon-success">☑</div>
                <div className="card-text">
                  <p className="card-title">My Reservations</p>
                  <p className="card-number">{totalReservations}</p>
                </div>
                <button
                  className="secondary-btn btn-sm"
                  onClick={() => setActivePage("reservation")}
                >
                  View Reservations
                </button>
              </div>
            </div>

            <div className="dashboard-campus-box">
              <div className="dashboard-campus-content">
                <div className="dashboard-campus-badge">
                  CAMPUS EVENT RESERVE
                </div>

                <h2 className="dashboard-campus-title">
                  Experience campus events
                  <span> smarter &amp; faster.</span>
                </h2>

                <p className="dashboard-campus-text">
                  Reserve your seats, explore upcoming university activities,
                  and manage all your event participation in one place.
                </p>

                <div className="dashboard-campus-actions">
                  <button
                    className="hero-btn"
                    onClick={() => setActivePage("events")}
                  >
                    Browse events →
=======
            <h2 className="welcome">Hi {userName}, welcome back!</h2>

            <div className="cards">
              <div className="card">
                <p className="card-title">Total Ongoing Events</p>
                <h1 className="card-number">{ongoingEventsCount}</h1>
                <div className="card-button-wrap">
                  <button onClick={() => setActivePage("events")}>
                    View Events
>>>>>>> origin/main
                  </button>
                </div>
              </div>

<<<<<<< HEAD
              <div className="floating-circle one"></div>
              <div className="floating-circle two"></div>
            </div>
=======
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

 <div className="big-box dashboard-campus-box">
  <div className="dashboard-campus-overlay"></div>

  <div className="dashboard-campus-content">
    <div className="dashboard-campus-badge">
      CAMPUS EVENT RESERVE
    </div>

    <h1 className="dashboard-campus-title">
      Experience campus events
      <span> smarter & faster.</span>
    </h1>

    <p className="dashboard-campus-text">
      Reserve your seats, explore upcoming university activities,
      and manage all your event participation in one modern platform.
    </p>
 
    
  </div>

  <div className="floating-circle one"></div>
  <div className="floating-circle two"></div>
  <div className="floating-circle three"></div>
</div>
>>>>>>> origin/main
          </>
        );
    }
  };

  return (
    <div className="dashboard-shell">
<<<<<<< HEAD
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <Logo size={40} />
            <div>
              <p className="brand-name">CampusEvent</p>
              <p className="brand-sub">Reserve</p>
            </div>
          </div>

          <p className="sidebar-heading">MENU</p>

          <nav className="menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={activePage === item.id ? "active" : ""}
                onClick={() => setActivePage(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <button className="logout" onClick={handleLogout}>
          <span className="menu-icon">⎋</span>
          Log out
        </button>
      </aside>

      <main className="main">
        <div className="topbar">
          <button
            className="user-block"
            type="button"
            onClick={() => setActivePage("profile")}
          >
            <div className="avatar">
              {user?.profileImage &&
              typeof user.profileImage === "string" &&
              user.profileImage.startsWith("data:image") ? (
                <img src={user.profileImage} alt="avatar" />
              ) : (
                <span>{userName ? userName.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
            <div className="user-text">
              <p className="username">{userName}</p>
              <p className="user-role">Student</p>
            </div>
          </button>
        </div>

        <div className="content">{renderContent()}</div>
      </main>
=======
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
>>>>>>> origin/main
    </div>
  );
};

<<<<<<< HEAD
export default DashboardLayout;
=======
export default DashboardLayout;
>>>>>>> origin/main
