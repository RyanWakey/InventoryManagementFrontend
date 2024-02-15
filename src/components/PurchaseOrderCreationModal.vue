<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Create Purchase Order</h2>
          <button @click="close">X</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label for="supplier">Supplier:</label>
              <select id="supplier" v-model="purchaseOrder.supplierId" required>
                <option disabled value="">Please select a supplier</option>
                <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                  {{ supplier.Name }}
                </option>
              </select>
            </div>
  
            <div class="form-group" v-for="(product, index) in purchaseOrder.products" :key="index">
              <label>Product:</label>
              <select v-model="product.productId" @change="updateProductPrice(index)" required>
                <option disabled value="">Select a product</option>
                <option v-for="product in products" :key="product.id" :value="product.id">
                  {{ product.Name }}
                </option>
              </select>
              <label>Quantity:</label>
              <input type="number" v-model="product.quantity" @input="updateProductPrice(index)" min="1" required>
              <button @click.prevent="removeProduct(index)">Remove</button>
            </div>
  
            <button type="button" @click="addProduct">Add Product</button>
  
            <div class="form-group">
              <label>Total Amount: {{ totalAmount.toFixed(2) }}</label>
            </div>
  
            <button type="submit">Submit Order</button>
          </form>
        </div>
      </div>
    </div>
</template>
  

<script>

import axios from 'axios';
  
  export default {
    props: {
      visible: Boolean,
      suppliers: Array,
      products: Array
    },
  
    data() {
      return {
        purchaseOrder: {
          supplierId: null,
          products: [{
            productId: null,
            quantity: 1
          }]
        },
        totalAmount: 0
      };
    },
  
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
  
      addProduct() {
        this.purchaseOrder.products.push({
          productId: null,
          quantity: 1
        });
        // Ensure the user selects a product to update the total amount accurately
      },
  
      removeProduct(index) {
        this.purchaseOrder.products.splice(index, 1);
        this.calculateTotalAmount();
      },
  
      updateProductPrice(index) {
        const selectedProduct = this.products.find(p => p.id === this.purchaseOrder.products[index].productId);
        if (selectedProduct) {
          // Assuming the price property exists in your products array
          this.calculateTotalAmount();
        }
      },
  
      calculateTotalAmount() {
        this.totalAmount = this.purchaseOrder.products.reduce((acc, product) => {
          const productDetail = this.products.find(p => p.id === product.productId);
          return acc + (productDetail ? productDetail.Cost * product.quantity : 0);
        }, 0);
      },
  
      async submitOrder() {
        console.log("Submitting purchase order:", this.purchaseOrder);
        try {
          await axios.post('http://your-backend-api/purchaseOrders', this.purchaseOrder);
          alert('Purchase order created successfully!');
          this.close();
        } catch (error) {
          console.error('Error creating purchase order:', error);
          alert('Failed to create purchase order.');
        }
      }
    }
  };
</script>

<style scoped>

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 600px;
    width: 90%;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-group {
    margin-bottom: 15px;
}

input[type="number"], select {
    margin-top: 5px;
}


</style>