<template>
    <div class="card">
        <div class="card-header">
            <h2> Total active suppliers: {{  activeSuppliers }}</h2>
        </div>
        <div class="card-header-purchase-order">
            <h2>Recent Purchase Orders</h2>
        </div>
        <div class="card-body">
            <ul class="purchase-orders-list">
                <li v-for="order in purchaseOrders" :key="order.orderId" class="purchase-order-item">
                    <h3 class="order-id-title">Order ID: {{ order.orderId }}</h3>
                    <div class="order-details">
                        <div class="order-info">
                            <p><strong>Supplier:</strong> {{ order.supplierName }}</p>
                            <p><strong>Order Date:</strong> {{ order.orderDate }}</p>
                        </div>
                        <div class="order-info">
                            <p><strong>Expected Delivery:</strong> {{ order.expectedDeliveryDate }}</p>
                            <p><strong>Status:</strong> <span :class="`status-${order.orderStatus.toLowerCase()}`">{{ order.orderStatus }}</span></p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>

import axios from 'axios'; // Make sure to install axios if you haven't already

export default {
  name: 'PurchaseOrdersCard',
  data() {
    return {
      purchaseOrders: [], // This will hold your purchase orders data
      isLoading: false, // Indicates if the data is being loaded
      error: null, // Holds any error information
    };
  },
  created() {
    this.fetchPurchaseOrders(); // Fetch purchase orders when the component is created
  },
  methods: {
    async fetchPurchaseOrders() {
      this.isLoading = true; // Start loading
      try {
        const response = await axios.get('http://localhost:18080/purchase-order/recent-purchase-order-info'); 
        this.purchaseOrders = response.data; // Set the data to the purchaseOrders data property
        this.isLoading = false; // Stop loading
      } catch (error) {
        this.error = error; // Set the error data property
        this.isLoading = false; // Stop loading
        console.error('There was an error fetching the purchase orders:', error);
      }
    }
  }
};

</script>



<style scoped>

.card-header {
    font-size: 10px;
    margin-left: 30px;
}

.card-header-purchase-order {
    margin-left: 5px;
    font-size: 13px;
}
.card-body {
    margin-left: 10px;
}

.purchase-orders-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.purchase-order-item {
    margin-bottom: 10px; /* Adjust space between rows */
}

.order-id-title {
    margin-bottom: 5px; /* Space between title and details */
    font-size: 1.1em; /* Make title stand out */
}

.order-details {
    display: flex;
    justify-content: space-between;
}

.order-info {
    width: 48%; /* Adjust width for two columns */
    font-size: 0.8em; /* Adjust font size */
}

.status-completed {
    color: green;
}

.status-shipped {
    color: blue;
}

.status-pending {
    color: orange;
}

.status-cancelled {
    color: red;
}

/* Add additional status styles as necessary */
</style>