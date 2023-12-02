<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ProductList />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    ProductList
  }
}
</script>

<style>
/* Your existing styles */
</style>
