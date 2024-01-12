<!-- Dashboard.vue -->
<template>
  <div>
    <h1>Dashboard</h1>
    <DashboardCard>
      <h2>Total Sales</h2>
      <!-- Content for total sales -->
    </DashboardCard>
    <DashboardCard>
      <h2>Recent Transactions</h2>
      <!-- Content for recent transactions -->
    </DashboardCard>
    <!-- Add more DashboardCard components as needed -->
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';

export default {
  name: 'DashboardCard',
  components: {
    DashboardCard
  }
}
</script>

<style>
/* Add styles for your dashboard here */
</style>
