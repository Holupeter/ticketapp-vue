<template>
  <div class="landing">
    <section class="hero container">
      <!-- Decorative circles (blue blends) -->
      <div class="decor decor-1" aria-hidden="true"></div>
      <div class="decor decor-2" aria-hidden="true"></div>
      <div class="decor decor-3" aria-hidden="true"></div>

      <h1>Welcome to TicketApp</h1>
      <p class="lead">Create, track, and resolve tickets with a clean, consistent UI across frameworks.</p>

      <div class="cta">
        <button class="btn primary" @click="goLogin">Login</button>
        <button class="btn ghost" @click="goSignup">Get Started</button>
      </div>

      <!-- Wave -->
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" aria-hidden="true">
        <path fill="#1f6fff" fill-opacity="1" d="M0,256L48,224C96,192,192,128,288,138.7C384,149,480,235,576,245.3C672,256,768,192,864,170.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,186.7L1440,181.3V320H0Z"></path>
      </svg>
    </section>

    <section class="container features">
      <article class="card">
        <h3>Secure Auth</h3>
        <p>
          Local session token protects your dashboard and tickets. 
          It's not just about logging in; it's about safeguarding every 
          digital entry point with precision, privacy, and trust.
        </p>
      </article>
      <article class="card">
        <h3>Real-time Validation</h3>
        <p>
          Ensures immediate feedback and error correction as users input data, 
          enhancing accuracy and streamlining the overall user experience.
        </p>
      </article>
      <article class="card">
        <h3>Responsive Layout</h3>
        <p>
          Optimal viewing experience across a wide range of devices, from desktop monitors 
          to mobile screens, by dynamically adjusting the content and design to suit 
          various screen sizes and orientations.
        </p>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    goLogin() { this.$router.push({ name: 'login' }); },
    goSignup() { this.$router.push({ name: 'signup' }); },
  },
};
</script>

<style scoped>
.container { max-width: 1440px; margin: 0 auto; padding: 0 16px; }
.landing { background: #f7f8fb; }

/* Hero */
.hero {
  position: relative;
  text-align: center;
  padding: 96px 16px 140px;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f3f6ff 100%);
  border-bottom: 1px solid #e9ecf5;
}

/* ensure hero content sits above decorative layers */
.hero :is(h1, .lead, .cta) { position: relative; z-index: 2; }

.hero h1 { font-size: clamp(28px, 5vw, 52px); margin: 0 0 10px; font-weight: 800; letter-spacing: -0.02em; }
.lead { margin: 0 auto 24px; max-width: 720px; color: #4a5568; }

/* CTA (boosted hover visibility on large screens) */
.cta { display: flex; gap: 12px; justify-content: center; }
.btn {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #dfe3ee;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease, border-color .18s ease;
  will-change: transform, box-shadow, background, border-color;
}
.btn.primary { background: #1f6fff; color: #fff; border-color: #1f6fff; }
.btn.primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 30px rgba(31,111,255,.28);
  background: #1858cc;
  border-color: #1858cc;
}
.btn.ghost { background: #fff; color: #1f6fff; border-color: #1f6fff; }
.btn.ghost:hover {
  transform: translateY(-2px) scale(1.02);
  background: #e9f0ff;
  border-color: #1858cc;
  color: #1858cc;
}

/* keyboard focus */
.btn:focus-visible {
  outline: 3px solid rgba(31,111,255,.35);
  outline-offset: 3px;
}

/* Wave and circles always under content */
.wave {
  position: absolute; left: 0; right: 0; bottom: -1px;
  width: 100%; height: auto; z-index: 0;
}
.decor {
  position: absolute; border-radius: 50%;
  pointer-events: none; filter: blur(.2px); z-index: 0;
}
.decor-1 { width: 160px; height: 160px; right: 6%; top: 24px;
  background: radial-gradient(closest-side, rgba(31,111,255,.28), rgba(31,111,255,0)); }
.decor-2 { width: 220px; height: 220px; left: 4%; top: 90px;
  background: radial-gradient(closest-side, rgba(120,170,255,.25), rgba(120,170,255,0)); }
.decor-3 { width: 120px; height: 120px; right: 18%; top: 180px;
  background: radial-gradient(closest-side, rgba(0,92,255,.22), rgba(0,92,255,0)); }

/* Feature cards (unchanged) */
.features { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); padding: 32px 0 48px; }
.card {
  background: #fff; border: 1px solid #eef1f7; border-radius: 16px; padding: 18px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: transform .15s ease, box-shadow .15s ease;
}
.card:hover { transform: translateY(-3px); box-shadow: 0 10px 22px rgba(0,0,0,.06); }
@media (max-width: 900px) { .features { grid-template-columns: 1fr; } }
</style>

