<template>
  <div class="auth">
    <section class="card container">
      <h1>Create your account</h1>
      <p class="sub">
        Sign up to manage tickets. Already have an account?
        <a @click.prevent="$router.push({ name: 'login' })" href="">Log in</a>
      </p>

      <form @submit.prevent="onSubmit" novalidate>
        <div class="grid">
          <div class="field">
            <label for="email">Email <span class="req">*</span></label>
            <input
              id="email"
              type="email"
              v-model.trim="form.email"
              @input="validate('email')"
              :class="{ invalid: errors.email }"
              aria-invalid="errors.email ? 'true' : 'false'"
              aria-describedby="email-err"
              placeholder="you@example.com"
            />
            <small v-if="errors.email" id="email-err" class="err">{{ errors.email }}</small>
          </div>

          <div class="field">
            <label for="password">Password <span class="req">*</span></label>
            <div class="passwrap">
              <input
                :type="showPass ? 'text':'password'"
                id="password"
                v-model="form.password"
                @input="validate('password')"
                :class="{ invalid: errors.password }"
                aria-invalid="errors.password ? 'true' : 'false'"
                aria-describedby="password-err"
                placeholder="Minimum 8 chars, letters, number & symbol"
              />
              <button
                type="button"
                class="peek"
                @click="showPass = !showPass"
                :aria-pressed="showPass"
                :title="showPass ? 'Hide password' : 'Show password'"
              >
                <svg v-if="!showPass" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1.5 12s3.5-7.5 10.5-7.5S22.5 12 22.5 12 19 19.5 12 19.5 1.5 12 1.5 12Z" stroke="currentColor" stroke-width="1.6" />
                  <circle cx="12" cy="12" r="3.25" stroke="currentColor" stroke-width="1.6"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M9.88 9.88A3.25 3.25 0 0012 15.25 3.25 3.25 0 0015.25 12M4.5 7.5C6.5 5.5 9.1 4.5 12 4.5c7 0 10.5 7.5 10.5 7.5a17.2 17.2 0 01-3.23 4.28M6.76 17.78A12.8 12.8 0 011.5 12S5 4.5 12 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <small v-if="errors.password" id="password-err" class="err">{{ errors.password }}</small>
          </div>

          <div class="field">
            <label for="confirm">Confirm Password <span class="req">*</span></label>
            <div class="passwrap">
              <input
                :type="showConfirm ? 'text':'password'"
                id="confirm"
                v-model="form.confirm"
                @input="validate('confirm')"
                :class="{ invalid: errors.confirm }"
                aria-invalid="errors.confirm ? 'true' : 'false'"
                aria-describedby="confirm-err"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                class="peek"
                @click="showConfirm = !showConfirm"
                :aria-pressed="showConfirm"
                :title="showConfirm ? 'Hide password' : 'Show password'"
              >
                <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1.5 12s3.5-7.5 10.5-7.5S22.5 12 22.5 12 19 19.5 12 19.5 1.5 12 1.5 12Z" stroke="currentColor" stroke-width="1.6" />
                  <circle cx="12" cy="12" r="3.25" stroke="currentColor" stroke-width="1.6"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M9.88 9.88A3.25 3.25 0 0012 15.25 3.25 3.25 0 0015.25 12M4.5 7.5C6.5 5.5 9.1 4.5 12 4.5c7 0 10.5 7.5 10.5 7.5a17.2 17.2 0 01-3.23 4.28M6.76 17.78A12.8 12.8 0 011.5 12S5 4.5 12 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <small v-if="errors.confirm" id="confirm-err" class="err">{{ errors.confirm }}</small>
          </div>
        </div>

        <div class="actions">
          <button class="btn primary" type="submit">Create account</button>
        </div>
      </form>
    </section>

    <!-- Snackbar -->
    <transition name="slide-up">
      <div v-if="snack.show" class="snack" role="status" aria-live="polite">{{ snack.text }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      form: { email: '', password: '', confirm: '' },
      errors: { email: '', password: '', confirm: '' },
      showPass: false,
      showConfirm: false,
      snack: { show: false, text: '', timer: null },
      USERS_KEY: 'ticketapp_users',
      SESSION_KEY: 'ticketapp_session',
    };
  },
  mounted() {
    if (localStorage.getItem(this.SESSION_KEY)) {
      this.$router.push({ name: 'dashboard' });
    }
  },
  methods: {
    toast(msg) {
      this.snack.text = msg;
      this.snack.show = true;
      if (this.snack.timer) clearTimeout(this.snack.timer);
      this.snack.timer = setTimeout(() => (this.snack.show = false), 2200);
    },
    validate(field) {
      const { email, password, confirm } = this.form;

      if (!field || field === 'email') {
        if (!email) this.errors.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) this.errors.email = 'Enter a valid email address.';
        else this.errors.email = '';
      }
      if (!field || field === 'password') {
        if (!password) this.errors.password = 'Password is required.';
        else if (password.length < 8) this.errors.password = 'Minimum length is 8 characters.';
        else if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[^\w\s]/.test(password)) {
          this.errors.password = 'Use letters, a number, and a symbol.';
        } else this.errors.password = '';
      }
      if (!field || field === 'confirm') {
        if (!confirm) this.errors.confirm = 'Please confirm your password.';
        else if (confirm !== password) this.errors.confirm = 'Passwords do not match.';
        else this.errors.confirm = '';
      }
      return Object.values(this.errors).every(e => !e);
    },
    onSubmit() {
      if (!this.validate()) {
        this.toast('Fix the highlighted errors.');
        return;
      }
      const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
      const exists = users.some(u => u.email.toLowerCase() === this.form.email.toLowerCase());
      if (exists) {
        this.errors.email = 'This email is already registered.';
        this.toast('Account already exists. Try logging in.');
        return;
      }
      users.push({ email: this.form.email, password: this.form.password, createdAt: Date.now() });
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

      const token = JSON.stringify({ email: this.form.email, ts: Date.now() });
      localStorage.setItem(this.SESSION_KEY, token);
      this.toast('Account created! Redirecting…');
      this.$router.push({ name: 'dashboard' });
    },
  },
};
</script>

<style scoped>
.auth {
  background: #f7f8fb;
  min-height: calc(100vh - 64px - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container { max-width: 560px; width: 100%; padding: 0 16px; }

/* Card with shadow + focus ring */
.card {
  width: 100%;
  background: #fff;
  border: 1px solid #eef1f7;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(16,24,40,0.04), 0 8px 28px rgba(16,24,40,0.10);
  overflow: hidden;
  transition: box-shadow .25s ease, border-color .25s ease;
}
.card:focus-within {
  border-color: #1f6fff;
  box-shadow: 0 0 0 3px rgba(31,111,255,.15), 0 8px 28px rgba(16,24,40,.12);
}

h1 { margin: 0 0 6px; font-size: 26px; font-weight: 800; text-align: left; }
.sub { margin: 0 0 18px; color: #556; text-align: left; }
.sub a { color: #1f6fff; cursor: pointer; }

.grid { display: grid; gap: 14px; }

.field label { display: block; font-weight: 600; margin-bottom: 6px; text-align: left; }
.req { color: #d12; }

input {
  width: 100%;
  padding: 10px 38px 10px 12px; /* leave space for icon */
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  max-width: 100%;
  background: #fff;
}
input:focus {
  border-color: #8aa8ff;
  box-shadow: 0 0 0 3px rgba(138,168,255,0.2);
}

.invalid { border-color: #e44; }
.err { color: #c22; display: block; margin-top: 6px; }

.passwrap { position: relative; }

/* Flat inline eye icon — no box, no border, no background */
.peek {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #777;
  padding: 0;
  width: 22px;
  height: 22px;
}
.peek:hover, .peek:focus { color: #1f6fff; }

.actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}
.btn {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #f8f8f8;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}
.btn.primary { background: #1f6fff; color: #fff; border-color: #1f6fff; }
.btn.primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(31,111,255,0.24); }

/* Snackbar */
.snack {
  position: fixed; left: 50%; transform: translateX(-50%);
  bottom: 22px; background: #222; color: #fff;
  padding: 10px 14px; border-radius: 10px;
}
.slide-up-enter-active, .slide-up-leave-active { transition: all .25s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translate(-50%, 8px); }
</style>

