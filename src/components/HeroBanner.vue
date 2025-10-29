<template>
  <section class="hero">
    <!-- Decorative circles -->
    <div class="decor decor-1" aria-hidden="true"></div>
    <div class="decor decor-2" aria-hidden="true"></div>
    <div class="decor decor-3" aria-hidden="true"></div>

    <div class="container hero-inner">
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="lead">{{ subtitle }}</p>
    </div>

    <!-- Wave -->
    <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" aria-hidden="true">
      <path fill="#1f6fff" fill-opacity="1" d="M0,256L48,224C96,192,192,128,288,138.7C384,149,480,235,576,245.3C672,256,768,192,864,170.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,186.7L1440,181.3V320H0Z"></path>
    </svg>
  </section>
</template>

<script>
export default {
  name: 'HeroBanner',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
  },
};
</script>

<style scoped>
/* full-width background */
.hero {
  position: relative;
  text-align: center;
  padding: 96px 16px 140px;
  overflow: hidden;
  background: linear-gradient(180deg, #ffffff 0%, #f3f6ff 100%);
  border-bottom: 1px solid #e9ecf5;
}
.container { max-width: 1440px; margin: 0 auto; padding: 0 16px; }

.hero-inner { position: relative; z-index: 1; }
.hero h1 { font-size: clamp(28px, 5vw, 52px); margin: 0 0 10px; font-weight: 800; letter-spacing: -0.02em; }
.lead { margin: 0 auto; max-width: 720px; color: #4a5568; }

/* Wave */
.wave { position: absolute; left: 0; right: 0; bottom: -1px; width: 100%; height: auto; }

/* Blue-blend circles */
.decor { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(.2px); }
.decor-1 { width: 160px; height: 160px; right: 6%; top: 24px;
  background: radial-gradient(closest-side, rgba(31,111,255,.28), rgba(31,111,255,0)); }
.decor-2 { width: 220px; height: 220px; left: 4%; top: 90px;
  background: radial-gradient(closest-side, rgba(120,170,255,.25), rgba(120,170,255,0)); }
.decor-3 { width: 120px; height: 120px; right: 18%; top: 180px;
  background: radial-gradient(closest-side, rgba(0,92,255,.22), rgba(0,92,255,0)); }
</style>
