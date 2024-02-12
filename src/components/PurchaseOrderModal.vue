<template>=
<div v-if="showPurchaseOrdersModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showPurchaseOrdersModal = false">&times;</span>
      <h2>Purchase Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Expected Delivery Date</th>
            <th>Status</th>
            <th>Total Amount</th>
            <!-- Add more headers as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in purchaseOrders" :key="order.OrderID">
            <td>{{ order.OrderID }}</td>
            <td>{{ order.OrderDate }}</td>
            <td>{{ order.ExpectedDeliveryDate }}</td>
            <td>{{ order.Status }}</td>
            <td>{{ order.TotalAmount }}</td>
            <!-- Add more data fields as needed -->
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
      purchaseOrders: [], // To store the fetched purchase orders for the supplier
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

    fetchPurchaseOrders() {
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
      this.$emit('update:visible', false); // Use v-model to control visibility from the parent
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