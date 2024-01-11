<!-- NavBar.vue -->
<template>
    <nav class="navbar">
      <!-- Logo and branding -->
      <div class="navbar-brand">
        <img src="@/assets/IMlogo.png" alt="Company Logo" class="navbar-logo">
        <span>Inventory Pro Management</span>
      </div>
  
      <!-- Navigation links -->
      <div class="navbar-menu">
        <router-link to="/" class="navbar-item">Dashboard</router-link>
        <router-link to="/business" class="navbar-item">Business</router-link>
        <router-link to="/accounting" class="navbar-item">Accounting</router-link>
        <!-- More links as needed -->
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped>
  /* Your styles for navbar here */
  </style>
  