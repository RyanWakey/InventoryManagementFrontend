<!-- BasicLayout.vue -->
<template>
    <div>
      <NavBar />
      <main>
        <!-- This is where the current route's component will be rendered -->
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  
  export default {
    components: {
      NavBar
    }
  }
  </script>
  