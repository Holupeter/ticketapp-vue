<template>
  <nav class="nav">
    <div class="container row">
      <a class="brand" @click.prevent="goHome" title="TicketApp (go to landing)">TicketApp</a>

      <button class="hamburger" @click="open = !open" aria-label="Toggle navigation" :aria-expanded="open">☰</button>

      <ul :class="['links', { open }]">
        <!-- Always show these (guard inside click) -->
        <li><a class="navlink" @click.prevent="goDashboard">Dashboard</a></li>
        <li><a class="navlink" @click.prevent="goTickets">Tickets</a></li>

        <!-- When NOT authenticated -->
        <template v-if="!isAuthed">
          <li><a class="navlink" @click.prevent="goLogin">Login</a></li>
          <li><a class="btn cta" @click.prevent="goSignup">Get Started</a></li>
        </template>

        <!-- When authenticated -->
        <template v-else>
          <li><button class="navlink logout" @click="logout">Logout</button></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarPublic',
  data: () => ({
    open: false,
    isAuthed: false, // reactive flag we keep in sync with localStorage
    SESSION_KEY: 'ticketapp_session',
  }),
  created() {
    this.syncAuth();
  },
  mounted() {
    // Keep navbar in sync if auth changes in other tabs
    window.addEventListener('storage', this.onStorage);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.onStorage);
  },
  watch: {
    // When route changes (e.g., after login/signup redirects), resync auth flag
    $route() {
      this.syncAuth();
    },
  },
  methods: {
    syncAuth() {
      this.isAuthed = !!localStorage.getItem(this.SESSION_KEY);
    },
    onStorage(e) {
      if (e.key === this.SESSION_KEY) this.syncAuth();
    },
    closeMenu() { this.open = false; },
    goHome() { this.$router.push({ name: 'home' }); this.closeMenu(); },
    goLogin() { this.$router.push({ name: 'login' }); this.closeMenu(); },
    goSignup() { this.$router.push({ name: 'signup' }); this.closeMenu(); },

    goDashboard() {
      if (!this.isAuthed) this.$router.push({ name: 'login' });
      else this.$router.push({ name: 'dashboard' });
      this.closeMenu();
    },
    goTickets() {
      if (!this.isAuthed) this.$router.push({ name: 'login' });
      else this.$router.push({ name: 'tickets' });
      this.closeMenu();
    },

    logout() {
      localStorage.removeItem(this.SESSION_KEY);
      this.syncAuth();               // update navbar immediately
      this.$store?.dispatch?.('logout');
      this.$router.push({ name: 'home' });
      this.closeMenu();
    },
  },
};
</script>

<style scoped>
.container { max-width: 1440px; margin: 0 auto; padding: 0 16px; }
.nav { position: sticky; top: 0; z-index: 50; background: #ffffffcc; backdrop-filter: blur(6px); border-bottom: 1px solid #eee; }
.row { display: flex; align-items: center; justify-content: space-between; height: 64px; }

a { text-decoration: none; color: #222; cursor: pointer; }
.links { list-style: none; display: flex; gap: 16px; align-items: center; margin: 0; padding: 0; }

.hamburger { display: none; background: transparent; border: 0; font-size: 24px; }

/* Brand with blue underline hover */
.brand {
  font-weight: 800; cursor: pointer; position: relative;
  transition: color .15s ease, transform .15s ease;
}
.brand::after {
  content: ""; position: absolute; left: 10%; right: 10%; bottom: -2px; height: 2px; background: #1f6fff;
  transform: scaleX(0); transform-origin: center; transition: transform .18s ease-in-out;
}
.brand:hover { color: #1f6fff; transform: translateY(-1px); }
.brand:hover::after { transform: scaleX(1); }

/* Link hover (Dashboard, Tickets, Login) */
.navlink {
  position: relative; padding: 8px 4px; background: transparent; border: 0; color: #222; cursor: pointer; font: inherit;
  transition: color .15s ease, transform .15s ease;
}
.navlink::after {
  content: ""; position: absolute; left: 10%; right: 10%; bottom: 2px; height: 2px; background: #1f6fff;
  transform: scaleX(0); transform-origin: center; transition: transform .18s ease-in-out;
}
.navlink:hover { color: #1f6fff; transform: translateY(-1px); }
.navlink:hover::after { transform: scaleX(1); }

/* CTA button */
.btn.cta {
  background: #1f6fff; color: #fff; padding: 8px 12px; border-radius: 10px; border: 1px solid #1f6fff;
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
}
.btn.cta:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(31,111,255,0.24); background: #1858cc; }

.logout { background: transparent; border: none; font: inherit; }

/* Mobile menu */
@media (max-width: 768px) {
  .hamburger { display: block; }
  .links {
    position: absolute; left: 0; right: 0; top: 64px; background: #fff;
    display: none; flex-direction: column; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #eee;
  }
  .links.open { display: flex; }
  .brand::after, .navlink::after { left: 0; right: 0; }
}
</style>
