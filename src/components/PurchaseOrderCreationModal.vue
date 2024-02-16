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
              <select id="supplier" v-model="purchaseOrder.SupplierID" @change="onSupplierChange" required>
                <option disabled value="">Please select a supplier</option>
                <option v-for="supplier in suppliers" :key="supplier.SupplierID" :value="supplier.SupplierID">
                  {{ supplier.Name }}
                </option>
              </select>
            </div>
  
            <div class="form-group" v-for="(product, index) in purchaseOrder.products" :key="index">
              <label>Product:</label>
              <select v-model="product.ProductID" @change="updateProductPrice(index)" required>
                <option disabled value="">Select a product</option>
                <option v-for="product in products" :key="product.ProductID" :value="product.ProductID">
                  {{ product.Name }}
                </option>
              </select>
              <label>Quantity:</label>
              <input type="number" v-model="product.Quantity" @input="updateProductPrice(index)" min="1" required>
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
          SupplierID: 1,
          products: [{
            ProductID: 1,
            Quantity: 1
          }]
        },
        totalAmount: 0,
        OrderID: null
      };
    },
  
    methods: {
      close() {
        this.$emit('update:visible', false);
      },
      
      // onSupplierChange(event) {
      //   console.log(event.target.value) 
      // },

      addProduct() {
        this.purchaseOrder.products.push({
          ProductID: null,
          Quantity: 1
        });
      },
  
      removeProduct(index) {
        this.purchaseOrder.products.splice(index, 1);
        this.calculateTotalAmount();
      },
  
      updateProductPrice(index) {
        const selectedProduct = this.products.find(p => p.ProductID === this.purchaseOrder.products[index].ProductID);
        if (selectedProduct) {
          this.calculateTotalAmount();
        }
      },
  
      calculateTotalAmount() {
        this.totalAmount = this.purchaseOrder.products.reduce((acc, product) => {
          const productDetail = this.products.find(p => p.ProductID === product.ProductID);
          return acc + (productDetail ? productDetail.Cost * product.Quantity : 0);
        }, 0);
      },
  
      async createPurchaseOrder() {
        const today = new Date().toISOString().split('T')[0];
        const purchaseOrderData = {
          OrderDate: today,
          ExpectedDeliveryDate: today,
          Status: 'Completed',
          TotalAmount: this.totalAmount,
          ReceivedDate: today,
          Notes: 'Purchased Goods for Stock',
          SupplierID: this.purchaseOrder.SupplierID
        };
        try {
          const response = await axios.post(`http://localhost:18080/suppliers/${this.purchaseOrder.SupplierID}/create-purchase-order`, purchaseOrderData);
          this.OrderID = response.data.orderId;
        } catch (error) {
          console.error('Error creating purchase order:', error);
        }
      },

      async createPurchaseOrderDetails() {
        const detailsArray = this.purchaseOrder.products.map(product => {
          const foundProduct = this.products.find(p => p.ProductID === product.ProductID);
          console.log("Found product for detail creation:", foundProduct);
          return {
            Quantity: product.Quantity,
            UnitPrice: foundProduct?.Cost || 0,
            TotalPrice: (foundProduct?.Cost || 0) * product.Quantity,
            OrderID: this.OrderID, 
            ProductID: product.ProductID,
          };
        });

        try {
          await axios.post(`http://localhost:18080/purchase-orders/${this.OrderID}/details`, detailsArray); 
        } catch (error) {
          console.error(`Error creating purchase order detail for product:`, error);
        }
      },

      async updateProductStock() {
        for (const product of this.purchaseOrder.products) {
          try {
            // Use product.ProductID to access the current product's ID
            await axios.patch(`http://localhost:18080/products/${product.ProductID}/update-stock`, {
              StockQuantity: product.Quantity,
            });
          } catch (error) {
            console.error(`Error updating stock for product ${product.ProductID}:`, error);
          }
        }
      },


      async submitOrder() {
      try {
        await this.createPurchaseOrder();
        await this.createPurchaseOrderDetails();
        await this.updateProductStock();
        alert('Purchase order created and products updated successfully!');
        this.close();
      } catch (error) {
        console.error('Failed to complete the order process:', error);
        alert('Failed to complete the order process.');
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
  z-index: 1000;
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px; 
  height: 400px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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