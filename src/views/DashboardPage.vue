<!-- Dashboard.vue -->
<template>
  <div class="dashboard">
   <div class="dashboard-header">
    <h1>Dashboard</h1>
   </div>
   <div class="dashboard_content">
      <DashboardCard class="dashboard-card">
        <template v-slot:title>
          <h2>Sales Information</h2>
        </template>
        <!-- Content for total Sales -->
        <SalesCard />
      </DashboardCard>
      <DashboardCard class="dashboard-card">
        <template v-slot:title>
          <h2>Product Sales Information</h2>
        </template>
        <!-- Contnet for recent transactions -->
      </DashboardCard>
      <!-- Add the rest here --> 
   </div>
  </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';
import SalesCard from '@/components/SalesCard.vue';

export default {
  name: 'DashboardHome',
  components: {
    DashboardCard,
    SalesCard
  }
}
</script>

<style scoped>
.dashboard-header {
  text-align: center;
  margin-bottom: 20px; /* Add some space below the dashboard header */
}

.dashboard_content {
  display: flex;
  justify-content: center; /* Center the cards container */
  flex-wrap: wrap; /* Allows cards to wrap onto the next line on small screens */
  gap: 20px; /* Adjust the gap between cards */
}

.dashboard-card {
  width: 28%; /* Calculating width by subtracting the total margin */
  margin: 10px; 
  box-shadow: 0 2px 4px rgba(0,0,0,0,2); /* Simple box shadow for styling */
  padding: 12px; /* Padding inside the cards */
  background: white; /* Background color for the cards */
  border-radius: 6px; /* Rounded corners for the cards */
  border: 2px solid #00000081;
} 

h2 {
  font-size: 21px;
}

</style>