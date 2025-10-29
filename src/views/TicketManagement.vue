<template>
  <div>
    <HeroBanner
      title="Ticket Management"
      subtitle="Create, update, and track your tickets in one place."
    />

    <section class="container card" style="margin-top:24px">
      <!-- CREATE / UPDATE FORM -->
      <form @submit.prevent="onSubmit" id="create-form">
        <div class="form-grid">
          <!-- Title -->
          <div class="field">
            <label for="title">Title <span class="req">*</span></label>
            <input
              id="title"
              v-model.trim="form.title"
              type="text"
              placeholder="Enter ticket title"
              :class="{ invalid: errors.title }"
              @input="errors.title = ''"
            />
            <small v-if="errors.title" class="err">{{ errors.title }}</small>
          </div>

          <!-- Status -->
          <div class="field">
            <label for="status">Status <span class="req">*</span></label>
            <select
              id="status"
              v-model="form.status"
              :class="{ invalid: errors.status }"
              @change="errors.status = ''"
            >
              <option value="" disabled>Select status…</option>
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
            <small v-if="errors.status" class="err">{{ errors.status }}</small>
          </div>
        </div>

        <!-- Description (full-width row) -->
        <div class="field">
          <label for="description">Description <span class="opt">(optional, max 500 chars)</span></label>
          <textarea
            id="description"
            v-model.trim="form.description"
            :maxlength="500"
            rows="4"
            placeholder="Describe the ticket (steps to reproduce, expectation, context)…"
            :class="{ invalid: errors.description }"
            @input="onDescriptionInput"
          ></textarea>
          <div class="desc-meta">
            <small v-if="errors.description" class="err">{{ errors.description }}</small>
            <small class="count">{{ form.description.length }}/500</small>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? "Update Ticket" : "Create Ticket" }}
          </button>
          <button type="button" class="btn btn-ghost" @click="onCancel">
            Cancel
          </button>
        </div>
      </form>
    </section>

    <!-- TICKET LIST -->
    <section class="container list">
      <h2>Your Tickets</h2>

      <div v-if="tickets.length === 0" class="empty">No tickets yet.</div>

      <div v-else>
        <div
          v-for="t in tickets"
          :key="t.id"
          class="ticket-card"
        >
          <h4 class="t-title">{{ t.title }}</h4>
          <div class="meta">
            <span class="tag" :class="t.status">{{ t.status }}</span>
            <span v-if="t.createdAt" class="created-at">• {{ formatWhen(t.createdAt) }}</span>
          </div>
          <p v-if="t.description" class="t-desc">{{ t.description }}</p>
          <div class="row-actions">
            <button class="btn btn-ghost" @click="startEdit(t)">Edit</button>
            <button class="btn btn-danger" @click="confirmDelete(t.id)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBanner from "@/components/HeroBanner.vue";

export default {
  name: "TicketManagement",
  components: { HeroBanner },
  data() {
    return {
      form: { id: null, title: "", status: "", description: "" },
      errors: { title: "", status: "", description: "" },
      isEditing: false,
    };
  },
  computed: {
    tickets() {
      return this.$store.getters.getTickets || [];
    },
  },
  mounted() {
    this.$store.dispatch("fetchTickets");
  },
  methods: {
    formatWhen(iso) {
      try {
        const d = new Date(iso);
        return d.toLocaleString();
      } catch {
        return "";
      }
    },
    onDescriptionInput() {
      if (this.form.description && this.form.description.length > 500) {
        this.errors.description = "Description must be 500 characters or fewer.";
      } else {
        this.errors.description = "";
      }
    },
    validate() {
      // required
      if (!this.form.title) this.errors.title = "Title is required.";
      if (!this.form.status) this.errors.status = "Status is required.";

      // status must be one of the three allowed
      const allowed = ["open", "in_progress", "closed"];
      if (this.form.status && !allowed.includes(this.form.status)) {
        this.errors.status = "Status must be open, in_progress, or closed.";
      }

      // optional description: length <= 500
      if (this.form.description && this.form.description.length > 500) {
        this.errors.description = "Description must be 500 characters or fewer.";
      }

      return !this.errors.title && !this.errors.status && !this.errors.description;
    },
    onSubmit() {
      if (!this.validate()) return;

      if (this.isEditing) {
        this.$store.dispatch("updateTicket", { ...this.form });
      } else {
        const email =
          JSON.parse(localStorage.getItem("ticketapp_session"))?.email || "";
        const newTicket = {
          id: Date.now(),
          title: this.form.title,
          status: this.form.status,
          description: this.form.description || "",
          ownerEmail: email,
          createdAt: new Date().toISOString(),
        };
        this.$store.dispatch("createTicket", newTicket);
      }

      this.resetForm();
    },
    startEdit(t) {
      this.form = { ...t };
      this.isEditing = true;
    },
    onCancel() {
      this.resetForm();
    },
    resetForm() {
      this.form = { id: null, title: "", status: "", description: "" };
      this.errors = { title: "", status: "", description: "" };
      this.isEditing = false;
    },
    confirmDelete(id) {
      if (confirm("Are you sure you want to delete this ticket?")) {
        this.$store.dispatch("deleteTicket", id);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;
}

h2 {
  font-size: 22px;
  margin: 24px 0 12px;
  font-weight: 700;
}

/* --- FORM LAYOUT --- */
.form-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  align-items: start;
}
@media (max-width: 700px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}
.req { color: #d12; }
.opt { color: #64748b; font-weight: 500; }

/* inputs */
input,
select,
textarea {
  width: 100%;
  max-width: 100%;
  padding: 10px 12px;
  border: 1px solid #dfe3ee;
  border-radius: 10px;
  outline: none;
  background: #fff;
  box-sizing: border-box;
  resize: vertical;
}
input:focus,
select:focus,
textarea:focus {
  border-color: #8aa8ff;
  box-shadow: 0 0 0 3px rgba(138, 168, 255, 0.2);
}
.invalid { border-color: #e44; }
.err { color: #c22; display: block; margin-top: 6px; }

/* description helper row */
.desc-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}
.count { color: #64748b; }

/* --- BUTTONS + HOVER EFFECTS --- */
.actions,
.row-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #dfe3ee;
  background: #f8f9fc;
  color: #1f2937;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease,
    color 0.15s ease, border-color 0.15s ease;
  user-select: none;
  will-change: transform, box-shadow, background, border-color, color;
}

/* Create / Update */
.btn-primary {
  background: #1f6fff;
  color: #fff;
  border-color: #1f6fff;
}
.btn-primary:hover {
  transform: translateY(-1px);
  background: #1858cc;
  border-color: #1858cc;
  box-shadow: 0 8px 18px rgba(31, 111, 255, 0.24);
}

/* Cancel / Edit */
.btn-ghost {
  background: #fff;
  color: #1f6fff;
  border-color: #cfe0ff;
}
.btn-ghost:hover {
  transform: translateY(-1px);
  background: #eef4ff;
  border-color: #1f6fff;
  color: #1858cc;
  box-shadow: 0 6px 16px rgba(31, 111, 255, 0.15);
}

/* Delete */
.btn-danger {
  background: #fff;
  color: #b91c1c;
  border-color: #f3c5c5;
}
.btn-danger:hover {
  transform: translateY(-1px);
  background: #fff5f5;
  border-color: #ef4444;
  color: #991b1b;
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.18);
}

/* --- TICKET LIST --- */
.list { margin-top: 24px; }

.ticket-card {
  background: #fff;
  border: 1px solid #eef1f7;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  margin-bottom: 12px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.ticket-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.06);
}

.t-title { margin: 0 0 8px; font-weight: 700; }
.meta { margin-bottom: 10px; color: #475569; display: flex; align-items: center; gap: 6px; }
.t-desc { margin: 0 0 10px; color: #334155; line-height: 1.5; }

/* status pill colors */
.tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}
.tag.open        { background: #e8f7ee; color: #166534; }   /* green */
.tag.in_progress { background: #fff4e6; color: #92400e; }   /* amber */
.tag.closed      { background: #eef2f7; color: #334155; }   /* gray */

.empty {
  text-align: center;
  padding: 20px;
  color: #64748b;
}
</style>
