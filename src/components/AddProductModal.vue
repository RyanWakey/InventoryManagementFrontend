<template>
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal">
        <button class="close-btn" @click="close">X</button>
        <h3>Add New Product</h3>
        <div class="product-form">
          <label for="name">Product Name:</label>
          <input type="text" id="name" v-model="newProduct.Name" required>
  
          <label for="description">Description:</label>
          <textarea id="description" v-model="newProduct.Description"></textarea>
  
          <!-- Add form inputs for all other fields like Price, Cost, etc. -->
  
          <button @click="addProduct">Add Product</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        visible: false,
        newProduct: {
          Name: '',
          Description: '',
          // Initialize other fields as well
        }
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      addProduct() {
        // Here you will call your backend API to add the new product
        axios.post('http://localhost:18080/products', this.newProduct)
          .then(response => {
            // Handle success, close the modal, and clear the form
            this.visible = false;
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