<template>
    <div>
      <h1>Products</h1>
      <ul>
        <li v-for="product in products" :key="product.ProductID">
          {{ product.Name }} - {{ product.Price }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: []
      };
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      fetchProducts() {
        axios.get('http://your-api-url/products')
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error('There was an error fetching the products:', error);
          });
      }
    }
  };
  </script>
  
  <style>
  /* Add styles for your product list here */
  </style>
  