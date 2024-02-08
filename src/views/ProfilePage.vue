<template>
    <div class="profile-page">
      <div v-if="profileData && userType === 'customer'" class="profile-container">
        <h1>Customer Profile</h1>
        <div class="profile-field"><strong>ID:</strong> {{ profileData.CustomerID }}</div>
        <div class="profile-field"><strong>Name:</strong> {{ profileData.Name }}</div>
        <div class="profile-field"><strong>Contact Details:</strong> {{ profileData.ContactDetails }}</div>
        <div class="profile-field"><strong>Address:</strong> {{ profileData.Address }}</div>
        <div class="profile-field"><strong>City:</strong> {{ profileData.City }}</div>
        <div class="profile-field"><strong>Country:</strong> {{ profileData.Country }}</div>
        <div class="profile-field"><strong>Email:</strong> {{ profileData.Email }}</div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-container {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.profile-field {
  margin-bottom: 10px;
}

.logout-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #45a049;
}

.error {
  color: red;
}

</style>