<template>
<div v-if="visible" class="modal">
    <div class="modal-content">
      <span class="close" @click="close">&times;</span>
      <h2>Purchase Orders</h2>
      <table>
        <thead>
          <tr>
            <th class="small-column">Order ID</th>
            <th class="small-column">Order ID</th>
            <th class="smaller-column">Order ID</th>
            <th class="smaller-column">Status</th>
            <th class="smaller-column">Status</th>
            <th class="smaller-column">RecievedDate</th>
            <th class="notes-column">Notes</th>
          </tr>
        </thead>
        <tbody class="purchaseordertable-body">
          <tr v-for="order in purchaseOrders" :key="order.OrderID">
            <td class="order-id-link" @click="openOrderDetails(order.OrderID)">{{ order.OrderID }}</td>
            <td>{{ order.OrderDate }}</td>
            <td>{{ order.ExpectedDeliveryDate }}</td>
            <td>{{ order.Status }}</td>
            <td>{{ order.TotalAmount }}</td>
            <td>{{ order.RecievedDate }}</td>
            <td class="notes-column">{{ order.Notes }}</td>
          </tr>
        </tbody>
        <div class="create-order-button-container">
          <button @click="openCreateOrderModal">Create Purchase Order</button>
        </div>
      </table>
    </div>
  </div>
</template>
  


<script>

import axios from 'axios';

export default {
    
  props: {
    supplierId: {
      type: Number,
      default: 0,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      orderDetails: [], // To store the details for the selected purchase order
      purchaseOrders: [], // To store the fetched purchase orders for the supplier
      showOrderDetailsModal: false,
      selectedOrderId: null,
      
    };
  },

  watch: {
    // Whenever the visibility or the supplierId changes, fetch the new purchase orders
    supplierId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchPurchaseOrders();
      }
    },
    visible(newVal) {
      if (newVal) {
        this.fetchPurchaseOrders();
      }
    }
  },

  methods: {

    async fetchPurchaseOrders() {
      if (!this.supplierId || !this.visible) {
        return; // Do not fetch if no supplierId or if modal is not visible
      }
      axios.get(`http://localhost:18080/suppliers/${this.supplierId}/purchaseorders`)
        .then(response => {
          this.purchaseOrders = response.data;
        })
        .catch(error => {
          console.error('Error fetching purchase orders:', error);
        });
    },

    async fetchOrderDetails() {
    if (!this.selectedOrderId  || !this.visible) {
      return;
    }
    axios.get(`http://localhost:18080/suppliers/${this.supplierId}/purchaseorders/${this.selectedOrderId}/details`)
      .then(response => {
        this.orderDetails = response.data;
      })
      .catch(error => {
        console.error('Error fetching order details:', error);
      });
    },

    close() {
      this.$emit('close');
    },

    openOrderDetails(orderId) {
      this.$emit('showOrderDetails', orderId);
    },

    openCreateOrderModal() {
      this.$emit('close'); 
      this.$emit('openCreateOrder'); // Emit an event for the parent component
    }

  }
};

</script>

<style scoped>

  .modal-content {
    position: relative; /* This line is crucial */
    margin: 15% auto; /* Adjust as necessary */
    padding: 20px;
    padding-bottom: 60px; /* Increase padding to create space for the button */
    border: 1px solid #888;
    width: 80%; /* Adjust as necessary */
    height: auto; /* Adjust if needed, or use a fixed height */
    max-height: 600px; /* Consider using max-height to manage large content */
    overflow-y: auto; /* Adds scroll to modal content if it exceeds max-height */
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 600px;
  }

  .modal-content table thead th,
  .modal-content table tbody td {
      padding: 10px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }

  .modal-content table {
    width: 100%; /* Ensures the table takes the full width of the modal */
    table-layout: fixed; /* This can make the columns more consistent in size */
  }
  
  .modal-content table thead th,
  .modal-content table tbody td {
    padding: 10px 20px; /* Top and bottom padding of 10px and left and right padding of 20px */
    text-align: center; /* Center the text horizontally */
    white-space: nowrap; /* Prevents the text from wrapping into multiple lines */
  }

  .small-column {
    width: 125px; 
  }

  .smaller-column {
    width: 85px; 
  }

  .notes-column {
    width: auto; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .modal-content table tbody td.notes-column {
    white-space: normal; /* This allows the text to wrap */
    word-wrap: break-word; /* This ensures long words do not overflow the container */
}

  .order-id-link {
    color: #0645ad;
    cursor: pointer;
    text-decoration: underline;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .create-order-button-container {
    position: absolute;
    right: 20px; /* Adjust based on your layout */
    bottom: 20px; /* Adjust based on your layout */
  }

  .create-order-button-container button {
    background-color: #007bff; /* Example: a blue background */
    color: white; /* White text color */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .create-order-button-container button:hover {
    background-color: #0056b3; /* Darker shade for hover effect */
  }

</style>