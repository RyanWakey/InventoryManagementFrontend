<!-- Dashboard.vue -->
<template>
  <div class="dashboard">
   <div class="dashboard-header">
    <h1>Dashboard</h1>
   </div>
   <div class="dashboard_content">
      <DashboardCard class="dashboard-card">
        <template v-slot:title>
          <h2>Total Sales</h2>
        </template>
        <!-- Content for total Sales -->
      </DashboardCard>
      <DashboardCard class="dashboard-card">
        <template v-slot:title>
          <h2>Recent Transactions</h2>
        </template>
        <!-- Contnet for recent transactions -->
      </DashboardCard>
      <!-- Add the rest here --> 
   </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';

export default {
  name: 'DashboardHome',
  components: {
    DashboardCard
  }
}
</script>

<style scoped>
.dashboard-header {
  text-align: center;
}

.dashboard_content {
  display: flex;
  justify-content: space-around; /* Spaces cards evenly */
  flex-wrap: wrap; /* Allows cards to wrap onto the next line on small screens */
}

.dashboard-card {
  width: calc(50% - 20px); /* Calculating width by subtracting the total margin */
  margin: 10px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0,2); /* Simple box shadow for styling */
  padding: 20px; /* Padding inside the cards */
  background: white; /* Background color for the cards */
  border-radius: 5px; /* Rounded corners for the cards */
} 
</style>