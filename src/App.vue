<template>
  <div class="layout">
    <component :is="navToUse" />
    <main class="page"><router-view /></main>
    <AppFooter />
  </div>
</template>

<script>
import NavBarPublic from './components/NavBarPublic.vue';
import NavBarApp from './components/NavBarApp.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: { NavBarPublic, NavBarApp, AppFooter },
  computed: {
    navToUse() {
      return this.$route.meta.layout === 'app' ? 'NavBarApp' : 'NavBarPublic';
    },
  },
};
</script>

<style>
html, body, #app { height: 100%; }
.layout { min-height: 100%; display: flex; flex-direction: column; }
.page { flex: 1 0 auto; }
</style>
