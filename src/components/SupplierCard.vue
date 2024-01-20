<template>
    <div class="card">
        <div class="card-header">
            <h2>Recent Purchase Orders</h2>
        </div>
        <div class="card-body">
            <ul class="purchase-orders-list">
                <li v-for="order in purchaseOrders" :key="order.orderId" class="purchase-order-item">
                    <div class="order-details">
                        <h3>Order ID: {{ order.orderId }}</h3>
                        <p><strong>Supplier:</strong> {{ order.supplierName }}</p>
                        <p><strong>Order Date:</strong> {{ order.orderDate }}</p>
                        <p><strong>Expected Delivery:</strong> {{ order.expectedDeliveryDate }}</p>
                        <p><strong>Status:</strong> <span :class="`status-${order.orderStatus.toLowerCase()}`">{{ order.orderStatus }}</span></p>
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
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-header h2 {
    margin: 0 0 10px;
}

.purchase-orders-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.purchase-order-item {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}

.purchase-order-item:last-child {
    border-bottom: none;
}

.order-details h3 {
    margin-top: 0;
}

.status-pending {
    color: orange;
}

.status-completed {
    color: green;
}

.status-shipped {
    color: dodgerblue;
}

.status-cancelled {
    color: red;
}

</style>