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
      <router-link to="/products" class="navbar-item">Business</router-link>
      <router-link to="/accounting" class="navbar-item">Accounting</router-link>
    </div>

    <!-- Profile Picture -->
    <div class="profile-container">
      <!-- If authenticated, show profile link -->
      <router-link v-if="isAuthenticated" to="/profile" class="navbar-item"> 
        <div>
          <img src ="@/assets/ProfilePic.png" alt="Profile Image" class="profile-logo">
          <p class="auth-message">You are logged in</p> <!-- Display message -->
        </div>
      </router-link>
      
      <!-- If not authenticated, show login link -->
      <router-link v-else to="/login" class="navbar-item"> 
        <div>
          <img src ="@/assets/ProfilePic.png" alt="Profile Image" class="profile-logo">
          <span class="auth-message">Login in</span> <!-- Display message -->
        </div>
      </router-link>
    </div>
  </nav>
</template>
  


<script>
import { mapState } from 'vuex';

  export default {
    name: 'NavBar',

    computed: {
     isAuthenticated() {
        console.log("dsasdad " + !!localStorage.getItem('userToken'));
        return !!localStorage.getItem('userToken');
      },
      
      ...mapState(['isAuthenticated'])

    },

    created() {
      this.$store.dispatch('authenticateUser', !!localStorage.getItem('userToken'));
    }
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

 .navbar-logo {
    width: 240px;
    height: auto;
 }
 
 .profile-logo {
    width: 60px;
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

.profile-container {
  margin-left: auto; 
  width: 70px;
  align-items: center;
}

.auth-message {
    color: white;
    font-size: 16px;
  }

</style>
  