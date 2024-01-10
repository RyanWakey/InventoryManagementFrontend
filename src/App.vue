<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ProductList />
    <TestApiCall />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import TestApiCall from './components/TestingCORS.vue';

export default {
  name: 'App',
  components: {
    ProductList,
    TestApiCall
  }
}
</script>

<style>
/* Your existing styles */
</style>
