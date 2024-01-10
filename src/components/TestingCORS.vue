<template>
    <div>
      <h1>Test API Call</h1>
      <button @click="fetchProducts">Get Products</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TestApiCall',
    methods: {
      fetchProducts() {
        fetch('http://localhost:18080/products')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));
      }
    }
  }
  </script>