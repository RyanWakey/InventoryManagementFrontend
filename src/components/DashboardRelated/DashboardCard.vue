<!-- DashboardCard.vue -->
<template>
  <div class="dashboard-card">
    <slot name="title"></slot> <!-- This is where the title slot content will go -->
    <slot></slot> <!-- Default slot for the main content -->
  </div>
</template>

<script>
export default {
  name: 'DashboardCard'
}
</script>

<style scoped>
.dashboard-card {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px; /* Space between cards */
  /* Add more styles as needed */
}
</style>
