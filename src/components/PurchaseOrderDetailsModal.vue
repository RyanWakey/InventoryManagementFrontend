<template>
    <div v-if="visible" class="purchase-order-modal-details  ">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <h2>Purchase Order Details</h2>
        <table>
          <thead>
            <tr>
              <th>Detail ID</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>OrderID</th>
              <th>ProductID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detail in orderDetails" :key="detail.PurchaseOrderDetailsID">
              <td>{{ detail.PurchaseOrderDetailsID }}</td>
              <td>{{ detail.Quantity }}</td>
              <td>{{ detail.UnitPrice }}</td>
              <td>{{ detail.TotalPrice }}</td>
              <td>{{ detail.OrderID }}</td>
              <td>{{ detail.ProductID }}</td>
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
    orderId: {
      type: Number,
      required: true
    },
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
      orderDetails: [],
    };
  },

  watch: {
    orderId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchOrderDetails();
      }
    },
    visible(newVal) {
      if (newVal) {
        this.fetchOrderDetails();
      }
    }
  },

  methods: {
    async fetchOrderDetails() {
      if (!this.orderId || !this.visible) {
        return;
      }
      axios.get(`http://localhost:18080/suppliers/${this.supplierId}/purchaseorders/${this.orderId}/details`)
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
    
  }
};

</script>

<style>

.purchase-order-modal-details {
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
    min-width: 120px; /* Adjust the minimum width as needed */
  }

  /* Optionally, you could also add some spacing between rows for better readability */
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