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
            <th class="small-column">Order ID</th>
            <th class="small-column">Status</th>
            <th class="small-column">Status</th>
            <th class="small-column">RecievedDate</th>
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

    close() {
      this.$emit('close');
    },

    openOrderDetails(orderId) {
      this.selectedOrderId = orderId;
      this.$emit('showOrderDetails', orderId);
      this.fetchOrderDetails();
    },

    async fetchOrderDetails() {
    if (!this.selectedOrderId  || !this.visible) {
      return;
    }
    console.log("this.supplierid is - " + this.supplierId + " this.selectedOrderId is - " + this.selectedOrderId);
    axios.get(`http://localhost:18080/suppliers/${this.supplierId}/purchaseorders/${this.selectedOrderId}/details`)
      .then(response => {
        this.orderDetails = response.data;
        console.log("worked");
      })
      .catch(error => {
        console.error('Error fetching order details:', error);
      });
    },

  }
};

</script>

<style>

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 600px;
  }

  .modal-content table thead th {
    padding: 10px 20px; /* Top and bottom padding of 10px and left and right padding of 20px */
    white-space: nowrap; /* Prevents the text from wrapping into multiple lines */
    min-width: 120px; 
  }

  /* Add some spacing between rows for better readability */
  .modal-content table tbody tr {
    border-bottom: 1px solid #ddd; /* Adds a line between rows */
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

  .notes-column {
    width: auto; 
    max-width: 200px; 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

</style>