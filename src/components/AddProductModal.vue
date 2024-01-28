<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <button class="close-btn" @click="close">X</button>
      <h3>Add New Product</h3>
      <div class="product-form">
        <div class="form-group">
          <label for="name">Product Name:</label>
          <input type="text" id="name" v-model="newProduct.Name" required>
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="newProduct.Description"></textarea>
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" id="price" v-model="newProduct.Price" required>
        </div>

        <div class="form-group">
          <label for="cost">Cost:</label>
          <input type="number" id="cost" v-model="newProduct.Cost" required>
        </div>

        <div class="form-group">
          <label for="weight">Weight:</label>
          <input type="number" id="weight" v-model="newProduct.Weight" required>
        </div>

        <div class="form-group">
          <label for="length">Length:</label>
          <input type="number" id="length" v-model="newProduct.Length" required>
        </div>

        <div class="form-group">
          <label for="width">Width:</label>
          <input type="number" id="width" v-model="newProduct.Width" required>
        </div>

        <div class="form-group">
          <label for="height">Height:</label>
          <input type="number" id="height" v-model="newProduct.Height" required>
        </div>

        <div class="form-group">
          <label for="stockQuantity">Stock Quantity:</label>
          <input type="number" id="stockQuantity" v-model="newProduct.StockQuantity" required>
        </div>

        <div class="form-group">
          <label for="isActive">Active:</label>
          <input type="checkbox" id="isActive" v-model="newProduct.isActive">
        </div>

        <div class="form-group">
          <label for="categoriesID">Category ID:</label>
          <input type="number" id="categoriesID" v-model="newProduct.CategoriesID" required>
        </div>

        <button @click="addProduct">Add Product</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  
  data() {
    return {
      newProduct: {
        Name: '',
        Description: '',
        Price: 0, 
        Cost: 0,
        Weight: 0,
        Length: 0,
        Width: 0,
        Height: 0,
        StockQuantity: 0,
        isActive: true,
        ImageURL: '',
        DateAdded: '2024-01-28',
        DateModified: '2024-01-28',
        CategoriesID: 1
      }
    };
  },

  methods: {
    close() {
      this.$emit('close');
    },
    addProduct() {
      axios.post('http://localhost:18080/products', this.newProduct)
        .then(response => {
          this.close(); 
          this.newProduct = {}; // Reset form
          this.$emit('product-added', response.data); // Inform parent to update list
        })
        .catch(error => {
          console.error('Error adding the product:', error);
        });
    }
  }
};
</script>



<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: white;
    padding: 30px;
    border-radius: 15px;
    width: 600px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    font-size: 1.1em; 
}

.close-btn {
    float: right;
    border: none;
    background: none;
    cursor: pointer;
}

.form-group {
  margin-bottom: 25px; /* Add some space between form groups */
  margin-left: 5px;
}

label {
  margin-right: 8px; /* Adjust the value as needed */
}

</style>