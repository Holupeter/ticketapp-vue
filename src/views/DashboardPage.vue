<template>
  <div>
    <HeroBanner :title="`Welcome, ${userEmail || 'Guest'}`"
                subtitle="Create, track, resolve — your ticket stats at a glance." />

    <section class="container dash">
      <div class="stats">
        <article class="stat-card">
          <h4>Total Tickets</h4>
          <div class="value">{{ total }}</div>
        </article>

        <article class="stat-card stat-open">
          <h4>Open</h4>
          <div class="value">{{ open }}</div>
        </article>

        <article class="stat-card stat-closed">
          <h4>Closed</h4>
          <div class="value">{{ closed }}</div>
        </article>

        <!-- ✅ Create Ticket Card -->
        <article class="stat-card stat-create" @click="goCreate">
          <div class="create-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <span>Create Ticket</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBanner from '@/components/HeroBanner.vue';

export default {
  name: 'DashboardPage',
  components: { HeroBanner },
  computed: {
    tickets() {
      return this.$store.getters.getTickets || [];
    },
    total() {
      return this.tickets.length;
    },
    open() {
      return this.tickets.filter(t => t.status === 'open').length;
    },
    closed() {
      return this.tickets.filter(t => t.status === 'closed').length;
    },
    userEmail() {
      try {
        const raw = localStorage.getItem('ticketapp_session');
        return raw ? JSON.parse(raw).email : '';
      } catch (_) {
        return '';
      }
    },
  },
  mounted() {
    this.$store.dispatch('fetchTickets');
  },
  methods: {
    goCreate() {
      this.$router.push({ name: 'tickets', query: { action: 'create' } });
    },
  },
};
</script>

<style scoped>
.container { max-width: 1440px; margin: 0 auto; padding: 0 16px; }
.dash { padding: 24px 0 40px; }

/* Horizontal responsive grid (4 cards now) */
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 900px) {
  .stats { grid-template-columns: 1fr; }
}

/* Stat cards */
.stat-card {
  background: #fff;
  border: 1px solid #eef1f7;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 1px 2px rgba(16,24,40,0.04), 0 8px 18px rgba(16,24,40,0.06);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, background .18s ease;
  cursor: default;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(16,24,40,0.10);
  border-color: #e3e9f9;
}

.stat-card h4 {
  margin: 0 0 8px;
  font-weight: 700;
  color: #334155;
}
.value {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* Status accent edges */
.stat-open { box-shadow: inset 0 0 0 2px rgba(34,197,94, .12); }
.stat-closed { box-shadow: inset 0 0 0 2px rgba(107,114,128,.12); }

/* ✅ Create Ticket card styles */
.stat-create {
  background: linear-gradient(180deg, #1f6fff, #1858cc);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-create:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 28px rgba(31,111,255,.3);
  background: linear-gradient(180deg, #2563eb, #1d4ed8);
}
.create-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}
.create-content svg {
  flex-shrink: 0;
}
</style>
