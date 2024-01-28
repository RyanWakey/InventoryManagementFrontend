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

      <div class="grid-item stock-control-card">
        <DashboardCard>
          <template v-slot:title>
            <h2>Stock Control Information</h2>
          </template>
          <StockControlCard />
        </DashboardCard>
      </div>
    </div>
  </div>
</template>













<script>
import DashboardCard from '@/components/DashboardRelated/DashboardCard.vue'
import SalesCard from '@/components/DashboardRelated/SalesCard.vue';
import ProductSaleCard from '@/components/DashboardRelated/ProductSaleCard.vue'
import TransactionsCard from '@/components/DashboardRelated/TransactionsCard.vue'
import SupplierCard from '@/components/DashboardRelated/SupplierCard.vue'
import StockControlCard from '@/components/DashboardRelated/StockControlCard.vue'

export default {
  name: 'DashboardHome',
  components: {
    DashboardCard,
    SalesCard,
    ProductSaleCard,
    TransactionsCard,
    SupplierCard,
    StockControlCard
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
  grid-template-columns: repeat(2, 1fr); /* Adjust the min-width as needed */
  grid-auto-rows: minmax(100px, auto); /* This sets a minimum height for each row */
  gap: 20px; /* Space between the grid items */
  justify-content: center; /* Center the grid items in the container */
}

/* Individual card styling */
.grid-item {
  border: 2px solid #08080896; /* Slightly darker border for visibility */
  background: white;
  border-radius: 6px;
  padding: 12px;
}


.sales-card {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-left: 350px;
}

.product-sales-card {
  grid-column: 2 / 3;
  grid-row: 1 / 3; 
  margin-right: 350px;
  height: 650px;
}

.transactions-card {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  margin-left: 350px;
  height: 300px;
}

.supplier-card {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  margin-right: 350px;
  margin-top: 170px;
  height: 650px;
}


.stock-control-card {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  margin-left: 350px;
  margin-top: 350px;
  height: 490px;
}

</style>