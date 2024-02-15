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
                <option v-for="product in products" :key="product.productId" :value="product.productId">
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
      },
  
      removeProduct(index) {
        this.purchaseOrder.products.splice(index, 1);
        this.calculateTotalAmount();
      },
  
      updateProductPrice(index) {
        const selectedProduct = this.products.find(p => p.id === this.purchaseOrder.products[index].productId);
        if (selectedProduct) {
          this.calculateTotalAmount();
        }
      },
  
      calculateTotalAmount() {
        this.totalAmount = this.purchaseOrder.products.reduce((acc, product) => {
          const productDetail = this.products.find(p => p.id === product.productId);
          return acc + (productDetail ? productDetail.Cost * product.quantity : 0);
        }, 0);
      },
  
      async createPurchaseOrder() {
        const today = new Date().toISOString().split('T')[0];
        const purchaseOrderData = {
          supplierId: this.purchaseOrder.supplierId,
          orderDate: today,
          expectedDeliveryDate: today,
          receivedDate: today,
          status: 'Completed',
          notes: 'Purchased Goods for Stock',
          totalAmount: this.totalAmount,
        };

        try {
          const response = await axios.post('http://your-backend-api/purchaseOrders', purchaseOrderData);
          return response.data;
        } catch (error) {
          console.error('Error creating purchase order:', error);
        }
      },

      async createPurchaseOrderDetails(orderId) {
        for (const product of this.purchaseOrder.products) {
          const detail = {
            orderId: orderId,
            productId: product.productId,
            quantity: product.quantity,
            unitPrice: this.products.find(p => p.id === product.productId)?.Cost || 0,
            totalPrice: (this.products.find(p => p.id === product.productId)?.Cost || 0) * product.quantity,
          };

          try {
            await axios.post('http://your-backend-api/purchaseOrderDetails', detail);
          } catch (error) {
            console.error(`Error creating purchase order detail for product ${product.productId}:`, error);
          }
        }
      },


      async updateProductStock() {
        for (const product of this.purchaseOrder.products) {
          try {
            await axios.patch(`http://your-backend-api/products/${product.productId}`, {
              stockQuantityIncrease: product.quantity,
            });
          } catch (error) {
            console.error(`Error updating stock for product ${product.productId}:`, error);
          }
        }
      },


      async submitOrder() {
        try {
          const order = await this.createPurchaseOrder();
          await this.createPurchaseOrderDetails(order.id);
          await this.updateProductStock();
          alert('Purchase order created and products updated successfully!');
          this.close();
        } catch (error) {
          alert('Failed to complete the order process.');
        }
      },

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
  z-index: 1000;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* Adjusted for square appearance */
  height: 400px; /* Adjusted for square appearance */
  display: flex;
  flex-direction: column;
  justify-content: start; /* Changed from center to accommodate for header, body, and actions */
  overflow-y: auto; /* Adds scroll for content exceeding the modal's height */
}


.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
}

.modal-header button {
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

</style>