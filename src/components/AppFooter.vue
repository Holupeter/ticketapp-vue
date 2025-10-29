<template>
  <footer class="footer">
    <div class="container grid">
      <div>
        <strong>TicketApp</strong><br />
        <small>Manage tickets with speed and clarity.</small>
      </div>
      <div class="right">
        <small>&copy; {{ year }} TicketApp. All rights reserved.</small>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data: () => ({ year: new Date().getFullYear() }),
};
</script>

<style scoped>
.footer {
  border-top: 1px solid #eee;
  padding: 24px 0;
  background: #fff;
  /* footer sits at bottom because App.vue uses flex column + .page flex:1 */
}
.container { max-width: 1440px; margin: 0 auto; padding: 0 16px; }
.grid { display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: center; }
.right { text-align: right; }
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .right { text-align: left; }
}
</style>
