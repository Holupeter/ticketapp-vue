# 🎟️ TicketApp — Vue.js Implementation

> Multi-Framework Ticket Web App built using **Vue.js (v3)**
> This is part of a 3-framework challenge: **React**, **Vue**, and **Twig**.
>

---

## 🔗 Cross-Framework Links

* [React Version README → ](https://github.com/Holupeter/React-ticketapp/blob/main/README.md)
* [Twig Version README → *(Coming Soon)*](#)

---

## 📘 Overview

**TicketApp** is a simple yet powerful multi-framework project designed to test consistent front-end architecture, responsive UI, and authentication logic across three different stacks.

This **Vue.js version** implements a complete workflow with:

* Landing page
* Login and Signup
* Dashboard with ticket statistics
* Full-featured Ticket Management (CRUD)
* Session-based user isolation

It uses **localStorage** for authentication simulation and **Vuex** for ticket state management.

---

## 🧰 Tech Stack

| Category           | Technology                                       |
| ------------------ | ------------------------------------------------ |
| Frontend Framework | Vue 3 (Composition + Options API mix)            |
| State Management   | Vuex                                             |
| Routing            | Vue Router                                       |
| Styling            | Scoped CSS + modern responsive design            |
| Storage            | localStorage (mock authentication + persistence) |

---

## 🗂 Project Structure

```
src/
 ├─ assets/                  # SVGs, images (wave, circles, etc.)
 ├─ components/
 │   ├─ NavBarPublic.vue
 │   ├─ NavBarApp.vue
 │   ├─ HeroBanner.vue
 │   └─ AppFooter.vue
 ├─ router/
 │   └─ index.js
 ├─ store/
 │   └─ index.js
 ├─ views/
 │   ├─ LandingPage.vue
 │   ├─ auth/
 │   │   ├─ Login.vue
 │   │   └─ Signup.vue
 │   ├─ Dashboard.vue
 │   └─ TicketManagement.vue
 ├─ App.vue
 └─ main.js
```

---

## 🪪 Authentication & Authorization

* **Session Key:** `ticketapp_session`

  ```json
  { "email": "user@example.com", "ts": 1725422100000 }
  ```

* **User Store:** `ticketapp_users`
  Stores `{ email, password, createdAt }` locally.

* **Guards:**

  * If no session is active, navigating to `/dashboard` or `/tickets` redirects to `/auth/login`.
  * On logout, the session clears and the navbar switches back to `Login / Get Started`.

---

## 🧩 Features Summary

### 🌐 Landing Page

* Responsive layout with max width `1440px`
* Wavy hero section (SVG)
* Decorative blue circles
* Call-to-Action buttons: **Login** and **Get Started**
* Navbar dynamically updates based on session:

  * Logged out → `Dashboard`, `Tickets`, `Login`, `Get Started`
  * Logged in → `Dashboard`, `Tickets`, `Logout`

---

### 🔐 Authentication (Login / Signup)

* Form validation with inline error messages
* Password show/hide (eye icon, no background)
* Focus shadow and card elevation
* On signup: user credentials saved to `localStorage`
* On login: verifies credentials and creates session

---

### 📊 Dashboard

* Displays **Welcome, [email]**
* Shows 3 ticket stats:

  * Total tickets
  * Open tickets
  * Closed tickets
* Cards arranged horizontally with soft shadow and curved borders
* Includes **Create Ticket** button with hover effect
* Logout instantly clears session and resets dashboard

---

### 🧾 Ticket Management

* Full CRUD (Create, Read, Update, Delete)
* Validations:

  * Title → required
  * Status → required (`open`, `in_progress`, `closed`)
  * Description → optional (max 500 chars)
* Inline validation and character counter
* Create/Update/Cancel buttons have hover transitions
* Ticket list displays:

  * Title
  * Status tag (color-coded)
  * Description (if present)
  * Created date
  * Edit/Delete buttons with hover transitions
* Status tag colors:

  * `open` → Green
  * `in_progress` → Amber
  * `closed` → Gray

---

### 🧍🏽 Per-User Ticket Isolation

Each user has a **unique ticket store key**:

```
ticketapp_tickets_<email>
```

This ensures:

* Each user sees only their tickets.
* A new user starts with zero tickets.
* Logging out clears in-memory data (Vuex), but keeps that user’s stored tickets intact.

---

## ⚙️ State Management

**Vuex Store** (`src/store/index.js`) handles all ticket logic:

```js
actions: {
  fetchTickets, createTicket, updateTicket, deleteTicket, logout
}
```

Data isolation implemented via:

```js
const KEY = `ticketapp_tickets_${userEmail}`;
localStorage.setItem(KEY, JSON.stringify(tickets));
```

Each action persists changes instantly.

---

## 🧱 Validation & Error Handling

| Type                | Validation                                        |
| ------------------- | ------------------------------------------------- |
| Title               | Required                                          |
| Status              | Must be one of `open`, `in_progress`, `closed`    |
| Description         | Optional, ≤ 500 chars                             |
| Unauthorized Access | Redirects to `/auth/login`                        |
| Session Expired     | “Your session has expired — please log in again.” |

Error feedback:

* Inline field messages
* Color-coded input borders
* Hover/focus highlight for accessibility

---

## ♿ Accessibility

* Semantic labels and input IDs
* Keyboard navigation (TAB-friendly)
* Sufficient color contrast (WCAG AA+)
* Clear focus states on interactive elements

---

## 💅 Design Language

| Element      | Style Rule                                  |
| ------------ | ------------------------------------------- |
| Max width    | 1440px centered                             |
| Hero section | SVG wave + circles                          |
| Status pills | Green / Amber / Gray                        |
| Buttons      | Soft shadow, lift on hover                  |
| Cards        | Rounded corners, clean shadows              |
| Fonts        | System default (Roboto / Inter recommended) |

---

## 🚀 Setup & Run Locally

```bash
# 1️⃣ Install dependencies
npm install

# 2️⃣ Run local dev server
npm run serve
# default: http://localhost:5173

# 3️⃣ Build for production
npm run build
```

Ensure you have Node.js ≥ 16 and Vue CLI or Vite installed.

---

## 🧭 Routing

| Path           | Component        | Guard     |
| -------------- | ---------------- | --------- |
| `/`            | LandingPage      | Public    |
| `/auth/login`  | LoginPage         | Public    |
| `/auth/signup` | SignupPage          | Public    |
| `/dashboard`   | DashboardPage       | Protected |
| `/tickets`     | TicketManagement | Protected |

Protected routes check for a valid session key (`ticketapp_session`).

---

## 🧱 Components Summary

| Component              | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `NavBarPublic.vue`     | Landing navigation (Login/Get Started or Logout)    |
| `NavBarApp.vue`        | Authenticated navigation (Dashboard/Tickets/Logout) |
| `HeroBanner.vue`       | Wave hero section, used on all major pages          |
| `AppFooter.vue`        | Footer shared across all pages                      |
| `TicketManagement.vue` | Core CRUD logic for tickets                         |

---

## 🔄 Usage Flow

1. User opens landing page → clicks **Get Started**
2. Signs up → credentials stored → redirected to dashboard
3. Dashboard shows personalized stats → navigates to Tickets
4. Creates, updates, or deletes tickets
5. Logs out → UI resets → landing shows Login/Get Started again

---

## ⚠️ Known Limitations

* Authentication is **local-only** (no backend)
* Passwords stored unencrypted for demo purposes
* Delete confirmation uses native `window.confirm()`
* In production, replace with real API + token auth

---

## 🧑‍💻 Example Test Users

| Email                | Password     |
| -------------------- | ------------ |
| `email1@example.com` | `Password1!` |
| `email2@example.com` | `Password2!` |

* Each user has **separate tickets**
* You can log in/out to verify per-user isolation

---

## 📎 License

**MIT License**
© 2025 — *Holupeter* 


---


