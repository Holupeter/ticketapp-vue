<template>
  <nav class="shadow-sm sticky top-0 z-50 bg-white/90 backdrop-blur">
    <div class="container">
      <div class="row">
        <div class="brand" @click="go('/')">TicketApp</div>

        <button class="hamburger" @click="open = !open" aria-label="Toggle navigation" aria-expanded="open">
          ☰
        </button>

        <ul :class="['links', { open }]">
          <li><a @click.prevent="go('/')">Home</a></li>
          <li><a @click.prevent="goProtected('/dashboard')">Dashboard</a></li>
          <li><a @click.prevent="goProtected('/tickets')">Tickets</a></li>
          <li v-if="!isAuthed"><a @click.prevent="go('/login')">Login</a></li>
          <li v-else><button class="logout" @click="logout">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return { open: false };
  },
  computed: {
    isAuthed() {
      return !!localStorage.getItem('ticketapp_session');
    },
  },
  methods: {
    go(path) {
      this.$router.push(path);
      this.open = false;
    },
    goProtected(path) {
      if (!this.isAuthed) {
        this.$router.push('/login');
      } else {
        this.$router.push(path);
      }
      this.open = false;
    },
    logout() {
      localStorage.removeItem('ticketapp_session');
      this.$store?.dispatch?.('logout');
      this.$router.push('/');
      this.open = false;
    },
  },
};
</script>

<style scoped>
.container { max-width: 1440px; margin: 0 auto; padding: 0 16px; }
.row { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.brand { font-weight: 800; cursor: pointer; }
.hamburger { display: none; background: transparent; border: 0; font-size: 24px; }
.links { list-style: none; display: flex; gap: 16px; align-items: center; margin: 0; padding: 0; }
a { text-decoration: none; color: #222; cursor: pointer; }
.logout { border: 1px solid #ddd; background: #fafafa; border-radius: 8px; padding: 6px 10px; cursor: pointer; }

@media (max-width: 768px) {
  .hamburger { display: block; }
  .links { position: absolute; top: 64px; left: 0; right: 0; background: white; flex-direction: column; padding: 12px 16px; display: none; border-bottom: 1px solid #eee; }
  .links.open { display: flex; }
}
</style>
