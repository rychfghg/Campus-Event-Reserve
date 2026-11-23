<p align="center">
  <img src="public/logo.svg" width="96" alt="CampusEvent Reserve logo" />
</p>

<h1 align="center">CampusEvent Reserve — Frontend</h1>

<p align="center">
  Discover campus events and reserve your seat in a few clicks.<br/>
  React + TypeScript web app for students, connected to the CampusEvent Reserve Spring Boot API.
</p>

---

## Features

| Page | What students can do |
| --- | --- |
| **Sign in / Create account** | Log in with school email, or register with name, Student ID and password. |
| **Dashboard** | See upcoming events and their own reservation count at a glance. |
| **Events** | Search events, see venue, date and seats left, and book in 3 steps: *Choose event → Reservation details → Confirm*. Full events can’t be booked. |
| **My reservations** | Search bookings, see status and seats, open details. |
| **Profile** | Update name, Student ID and profile photo. |

The design follows the CampusEvent Reserve Figma file: indigo sidebar, Inter font, white cards with soft shadows, and the calendar-check logo.

## Tech stack

- [React 19](https://react.dev/) + TypeScript (Create React App / `react-scripts` 5)
- [React Router 7](https://reactrouter.com/) for pages
- [Axios](https://axios-http.com/) for API calls
- Plain CSS with design tokens (`src/index.css`)

## Requirements

- **Node.js 18+** and npm
- The **backend** (`Campus-Event-Reserve-Backend-main`) running, by default on `http://localhost:8080`

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the backend first (in the backend folder), e.g. with the in-memory dev database:
#    ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# 3. Start the frontend
npm start
```

Open <http://localhost:3000>. Create an account, sign in, and book an event.

## Configuration

The frontend reads the backend URL from `REACT_APP_API_URL`.

| File | Used by | Default |
| --- | --- | --- |
| `.env.development` | `npm start` | `http://localhost:8080` |
| `.env.production.local` (you create it) | `npm run build` | — |

See `.env.example`. Use the backend URL **without** a trailing slash. Restart `npm start` after changing it.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the dev server on port 3000 with hot reload. |
| `npm run build` | Create an optimized production build in `build/`. |
| `npm test` | Run tests in watch mode. |

## Project structure

```
public/
  logo.svg, favicon.ico,        App logo and browser/tab icons
  logo192.png, logo512.png
  manifest.json                 Installable app metadata
src/
  index.css                     Design tokens, shared buttons, inputs, cards, badges
  App.tsx                       Routes: /, /register, /dashboard
  components/
    AuthLayout.tsx              Split brand panel used by sign-in and sign-up
    Logo.tsx                    Logo as a React component
  features/
    login/                      Sign-in page + login API call
    register/                   Sign-up page + register API call
    dashboard/                  Sidebar, top bar and home page (DashboardLayout)
    events/                     Event list, booking form, confirm step, stepper
    reservation/                My reservations list
    profile/                    Profile page
  styles/                       Page styles (auth, dashboard, event, reservation, profile)
```

## API used

All requests go to `REACT_APP_API_URL`.

| Method | Endpoint | Used for |
| --- | --- | --- |
| `POST` | `/api/login` | Sign in |
| `POST` | `/api/register` | Create account |
| `GET` | `/api/events` | Event list (includes `capacity` and `taken` seats) |
| `GET` | `/api/bookings/{userId}` | The user’s reservations |
| `POST` | `/api/bookings` | Reserve seats (rejected when the event is full) |
| `GET` / `PUT` | `/api/profile/{id}` | Read / update profile |
| `PUT` | `/api/profile/{id}/photo` | Update profile photo |

## Troubleshooting

- **“Cannot connect to server.” on sign-in** — the backend isn’t running or `REACT_APP_API_URL` is wrong.
- **Events page is empty** — there are no events in the database yet. The backend `dev` profile adds sample events.
- **Changes to `.env` not applied** — stop and re-run `npm start`.
