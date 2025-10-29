<template>
  <nav class="nav">
    <div class="container row">
      <!-- Brand -->
      <a class="brand" @click.prevent="goHome">TicketApp</a>

      <ul class="links">
        <!-- Dynamic link: shows Dashboard when on TicketManagement page -->
        <li>
          <a class="navlink" @click.prevent="goDynamic">
            {{ dynamicLabel }}
          </a>
        </li>

        <!-- Logout -->
        <li>
          <button class="navlink logout" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBarApp',
  computed: {
    // detect if user is currently on TicketManagement page
    onTicketsPage() {
      return this.$route.name === 'tickets';
    },
    dynamicLabel() {
      // if on TicketManagement, show "Dashboard"
      return this.onTicketsPage ? 'Dashboard' : 'Tickets';
    },
  },
  methods: {
    authed() {
      return !!localStorage.getItem('ticketapp_session');
    },
    goHome() {
      this.$router.push({ name: 'home' });
    },
    goDynamic() {
      if (!this.authed()) return this.$router.push({ name: 'login' });
      // if on TicketManagement, route to dashboard; otherwise go to tickets
      this.$router.push({ name: this.onTicketsPage ? 'dashboard' : 'tickets' });
    },
    logout() {
      localStorage.removeItem('ticketapp_session');
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped>
.container { max-width: 1440px; margin: 0 auto; padding: 0 16px; }
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #eee;
}
.row { display: flex; align-items: center; justify-content: space-between; height: 64px; }

.brand {
  font-weight: 800;
  cursor: pointer;
  position: relative;
  transition: color .15s ease, transform .15s ease;
}
.brand::after {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -2px;
  height: 2px;
  background: #1f6fff;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform .18s ease-in-out;
}
.brand:hover { color: #1f6fff; transform: translateY(-1px); }
.brand:hover::after { transform: scaleX(1); }

.links { list-style: none; display: flex; gap: 16px; align-items: center; margin: 0; padding: 0; }

.navlink {
  position: relative;
  padding: 8px 4px;
  background: transparent;
  border: 0;
  color: #222;
  cursor: pointer;
  font: inherit;
  transition: color .15s ease, transform .15s ease;
}
.navlink::after {
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: 2px;
  height: 2px;
  background: #1f6fff;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform .18s ease-in-out;
}
.navlink:hover { color: #1f6fff; transform: translateY(-1px); }
.navlink:hover::after { transform: scaleX(1); }

.logout {
  border: none;
  background: transparent;
}
</style>
