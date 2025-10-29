import { createStore } from 'vuex';

const SESSION_KEY = 'ticketapp_session';

function getUserEmail() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { email } = JSON.parse(raw);
    return (email || '').toLowerCase();
  } catch (_) {
    return null;
  }
}

function ticketsKeyForUser() {
  const email = getUserEmail();
  // Fallback key if somehow no session; keeps data isolated per user
  return email ? `ticketapp_tickets_${email}` : `ticketapp_tickets_guest`;
}

export default createStore({
  state: {
    tickets: [],
    userSession: localStorage.getItem('ticketapp_session') || null,
  },
  mutations: {
    setUserSession(state, session) {
      state.userSession = session;
      localStorage.setItem('ticketapp_session', session);
    },
    clearUserSession(state) {
      state.userSession = null;
      localStorage.removeItem('ticketapp_session');
    },
    setTickets(state, tickets) {
      state.tickets = tickets;
    },
    addTicket(state, ticket) {
      state.tickets.push(ticket);
    },
    removeTicket(state, ticketId) {
      state.tickets = state.tickets.filter(ticket => ticket.id !== ticketId);
    },
    updateTicket(state, updatedTicket) {
      const index = state.tickets.findIndex(ticket => ticket.id === updatedTicket.id);
      if (index !== -1) {
        state.tickets.splice(index, 1, updatedTicket);
      }
    },
  },
  actions: {
    async fetchTickets({ commit }) {
      const key = ticketsKeyForUser();
      const raw = localStorage.getItem(key);
      const tickets = raw ? JSON.parse(raw) : [];
      commit('setTickets', tickets);
    },

    async createTicket({ state, commit }, ticket) {
      commit('addTicket', ticket);
      const key = ticketsKeyForUser();
      localStorage.setItem(key, JSON.stringify(state.tickets));
    },

    async updateTicket({ state, commit }, ticket) {
      commit('updateTicket', ticket);
      const key = ticketsKeyForUser();
      localStorage.setItem(key, JSON.stringify(state.tickets));
    },

    async deleteTicket({ state, commit }, id) {
      commit('removeTicket', id);
      const key = ticketsKeyForUser();
      localStorage.setItem(key, JSON.stringify(state.tickets));
    },

    // optional: clear in-memory tickets on logout for instant UI reset
    logout({ commit }) {
      commit('setTickets', []);
      // NOTE: component or navbar already removes the session key;
      // do NOT delete per-user ticket storage here.
    },
  },
  getters: {
    getTickets: (state) => state.tickets,
    isAuthenticated: (state) => !!state.userSession,
  },
});
