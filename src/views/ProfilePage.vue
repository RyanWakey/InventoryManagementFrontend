<template>
    <div class="profile-page">
      <div v-if="customer">
        <h1>Customer Profile</h1>
        <p><strong>ID:</strong> {{ customer.CustomerID }}</p>
        <p><strong>Name:</strong> {{ customer.Name }}</p>
        <p><strong>Contact Details:</strong> {{ customer.ContactDetails }}</p>
        <p><strong>Address:</strong> {{ customer.Address }}</p>
        <p><strong>City:</strong> {{ customer.City }}</p>
        <p><strong>Country:</strong> {{ customer.Country }}</p>
        <p><strong>Email:</strong> {{ customer.Email }}</p>
      </div>
    <!-- Display error message -->
    <p v-if="error" class="error">{{ error }}</p>

    <button @click="logout">Logout</button>
    </div> 
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      customer: null,
      error: ''
    };
  },

  created() {
    this.fetchCustomerProfile();
  },

  methods: {

    async fetchCustomerProfile() {
      try {
        // Assuming 'userId' and 'userType' are stored in local storage or global state
        const userId = localStorage.getItem('userId');
        const userType = localStorage.getItem('userType');
        const response = await axios.get(`/profile/${userType}/${userId}`);
        this.customer = response.data;
      } catch (err) {
        this.error = 'Failed to load profile data.';
      }
    },

    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('userToken');
      this.$store.dispatch('authenticateUser', false);      
      // Redirect the user to the home page
      this.$router.push('/dashboard');
    }
  }
}
</script>


<style scoped>
.profile-page { 
  
}
.error {
  color: red;
}
</style>