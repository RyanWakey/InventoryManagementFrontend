<template>
    <div class="profile-page">
      <div v-if="profileData && userType === 'customer'">
        <h1>Customer Profile</h1>
        <p><strong>ID:</strong> {{ profileData.CustomerID }}</p>
        <p><strong>Name:</strong> {{ profileData.Name }}</p>
        <p><strong>Contact Details:</strong> {{ profileData.ContactDetails }}</p>
        <p><strong>Address:</strong> {{ profileData.Address }}</p>
        <p><strong>City:</strong> {{ profileData.City }}</p>
        <p><strong>Country:</strong> {{ profileData.Country }}</p>
        <p><strong>Email:</strong> {{ profileData.Email }}</p>
      </div>
    <div v-else-if="profileData && userType === 'employee'">
    <h1>Employee Profile</h1>
      <!-- Display employee-specific fields here -->
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
      error: '',
      profileData: null,
      userType: localStorage.getItem('userType'),
    };
  },

  created() {
    this.fetchProfile();
  },

  async mounted() {
    try {
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');
      console.log(userId + " , " + userType);
      if (userType === 'customer') {
        const response = await axios.get(`http://localhost:18080/profile/customer/${userId}`);
        this.profileData = response.data;
      } else {
        // Handle employee or other user types as needed
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      this.error = 'Failed to load profile data.';
    }
  },

  methods: {

    async fetchProfile() {
      const userId = localStorage.getItem('userId');
      this.userType = localStorage.getItem('userType');
      console.log(userId + " , " + this.userType);

      try {
        const response = await axios.get(`http://localhost:18080/profile/${this.userType}/${userId}`);
        this.profileData = response.data;
      } catch (error) {
        console.error('Error fetching profile data:', error);
        this.error = 'Failed to load profile data.';
      }
    },

    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userType');

      this.$store.dispatch('authenticateUser', false);      
      this.$router.push('/login');
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