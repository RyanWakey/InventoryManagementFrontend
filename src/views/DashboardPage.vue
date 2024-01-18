<!-- Dashboard.vue -->
<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
    </div>
    <div class="dashboard-grid">
      <div class="grid-item sales-card">
        <DashboardCard>
          <template v-slot:title>
            <h2>Sales Information</h2>
          </template>
          <SalesCard />
        </DashboardCard>
      </div>

      <div class="grid-item transactions-card">
        <DashboardCard>
          <template v-slot:title>
            <h2>Transactions Information</h2>
          </template>
          <TransactionsCard />
        </DashboardCard>
      </div>

      <div class="grid-item product-sales-card">
        <DashboardCard>
          <template v-slot:title>
            <h2>Product Sales Information</h2>
          </template>
          <ProductSaleCard />
        </DashboardCard>
      </div>

      <div class="grid-item supplier-card">
        <DashboardCard>
          <template v-slot:title>
            <h2>Supplier Information</h2>
          </template>
          <SupplierCard />
        </DashboardCard>
      </div>
    </div>
  </div>
</template>


<script>
import DashboardCard from '@/components/DashboardCard.vue';
import SalesCard from '@/components/SalesCard.vue';
import ProductSaleCard from '@/components/ProductSaleCard.vue'
import TransactionsCard from '@/components/TransactionsCard.vue'

export default {
  name: 'DashboardHome',
  components: {
    DashboardCard,
    SalesCard,
    ProductSaleCard,
    TransactionsCard
  }
}
</script>

<style scoped>
.dashboard-header {
  text-align: center;
  margin-bottom: 20px;
}

/* Grid container styling */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjust the min-width as needed */
  grid-auto-rows: minmax(100px, auto); /* This sets a minimum height for each row */
  gap: 20px; /* Space between the grid items */
  justify-content: center; /* Center the grid items in the container */
}

/* Individual card styling */
.grid-item {
  border: 2px solid #08080896; /* Slightly darker border for visibility */
  background: white;
  border-radius: 6px;
  padding: 16px;
}


/* Positioning */
.sales-card {
  grid-column: 1 / 2;
  grid-row: 1;
  width: 60%; /* Calculating width by subtracting the total margin */
  margin-left: 350px;
  box-shadow: 0 2px 4px rgba(0,0,0,0,2); /* Simple box shadow for styling */
  padding: 12px; /* Padding inside the cards */
  background: white; /* Background color for the cards */
  border-radius: 6px; /* Rounded corners for the cards */
  border: 2px solid #00000081;
}

.product-sales-card {
  grid-column: 2 / 3;
  grid-row: 1 / 3; /* Span two rows to accommodate the height */
  width: 60%; /* Calculating width by subtracting the total margin */
  margin-right: 350px;
  box-shadow: 0 2px 4px rgba(0,0,0,0,2); /* Simple box shadow for styling */
  padding: 12px; /* Padding inside the cards */
  background: white; /* Background color for the cards */
  border-radius: 6px; /* Rounded corners for the cards */
  border: 2px solid #00000081;
}

.transactions-card {
  grid-column: 1 / 2;
  grid-row: 2;
  width: 60%; /* Calculating width by subtracting the total margin */
  margin-left: 350px;
  box-shadow: 0 2px 4px rgba(0,0,0,0,2); /* Simple box shadow for styling */
  padding: 12px; /* Padding inside the cards */
  background: white; /* Background color for the cards */
  border-radius: 6px; /* Rounded corners for the cards */
  border: 2px solid #00000081;
}

.supplier-card {
  grid-column: 2 / 3;
  grid-row: 3;
  width: 60%; /* Calculating width by subtracting the total margin */
  margin-right: 350px;
  box-shadow: 0 2px 4px rgba(0,0,0,0,2); /* Simple box shadow for styling */
  padding: 12px; /* Padding inside the cards */
  background: white; /* Background color for the cards */
  border-radius: 6px; /* Rounded corners for the cards */
  border: 2px solid #00000081;
}


</style>