<template>
    <div>
      <h1>Products</h1>
      <ProductForm @product-saved="fetchProducts"/>
      <ProductList :products="products"/>
    </div>
  </template>
  
  <script>
  import ProductForm from '@/components/ProductForm'
  import ProductList from '@/components/ProductList'
  
  export default {
    components: {
      ProductForm,
      ProductList
    },
    data() {
      return {
        products: []
      }
    },
    methods: {
      fetchProducts() {
        // Fetch products from API and update `products` data property
      }
    },
    created() {
      this.fetchProducts();
    }
  }
  </script>
  