<!-- NavBar.vue -->
<template>
    <nav class="navbar">
      <!-- Logo and branding -->
      <div class="navbar-brand">
        <img src="@/assets/IMlogo.png" alt="Company Logo" class="navbar-logo">
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
  .navbar {
    background-color: rgb(7, 124, 126);
    display: flex;
    align-items: center;
    padding: 16px 20px;
 }
 .navbar-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
 .navbar-brand {
  display: flex;
  align-items: center;
  margin-right: 50px;
 }

 .navbar-logo{
  width: 240px;
  height: auto;
 }

 .navbar-menu .navbar-item {
  margin-right: 20px;
  color: white; 
  text-decoration: none; /* Removes underline from links */
  font-size: 22px;
  font-weight: bold;
 }

 .navbar-menu .navbar-item:last-child {
  margin-right: 0; /* Remove margin from the last item */
 }

.navbar-menu .navbar-item {
  padding: 0 15px;
}
  </style>
  