<template>
    <div class="profile-page">
      <div v-if="profileData && userType === 'customer'" class="profile-container">
        <h1>Customer Profile</h1>
        <div class="profile-details">
          <div class="profile-field"><strong>ID:</strong> {{ profileData.CustomerID }}</div>
          <div class="profile-field"><strong>Name:</strong> {{ profileData.Name }}</div>
          <div class="profile-field"><strong>Contact Details:</strong> {{ profileData.ContactDetails }}</div>
          <div class="profile-field"><strong>Address:</strong> {{ profileData.Address }}</div>
          <div class="profile-field"><strong>City:</strong> {{ profileData.City }}</div>
          <div class="profile-field"><strong>Country:</strong> {{ profileData.Country }}</div>
          <div class="profile-field"><strong>Email:</strong> {{ profileData.Email }}</div>
          <button @click="showEditModal = true">Edit Profile</button>
        </div>
      </div>
    
      <div v-else-if="profileData && userType === 'employee'">
        <div class="profile-details">
          <h1>Employee Profile</h1>
          <div class="profile-field"><strong>ID:</strong> {{ profileData.EmployeeID }}</div>
          <div class="profile-field"><strong>Name:</strong> {{ profileData.FirstName }} {{ profileData.LastName }}</div>
          <div class="profile-field"><strong>Date of Birth:</strong> {{ profileData.DOB }}</div>
          <div class="profile-field"><strong>Gender:</strong> {{ profileData.Gender }}</div>
          <div class="profile-field"><strong>Address:</strong> {{ profileData.Address }}</div>
          <div class="profile-field"><strong>City:</strong> {{ profileData.City }}</div>
          <div class="profile-field"><strong>Postal Code:</strong> {{ profileData.PostalCode }}</div>
          <div class="profile-field"><strong>Phone:</strong> {{ profileData.Phone }}</div>
          <div class="profile-field">
            <strong>Profile Picture:</strong>
            <div class="profile-picture-container">
                <img :src="`http://localhost:18080${profileData.ProfilePicture}`" alt="Employee's Profile Picture" class="profile-picture">
            </div>
          </div>
          <div class="profile-field"><strong>Hire Date:</strong> {{ profileData.HireDate }}</div>
          <div class="profile-field"><strong>Email:</strong> {{ profileData.Email }}</div>
        </div>
    </div>

    <!-- Display error message -->
    <p v-if="error" class="error-message">{{ error }}</p>

    <button @click="logout" class="logout-button">Logout</button>
    </div> 
 


    <ProfileEditModal 
      :show="showEditModal" 
      :profileData="profileData" 
      @close="showEditModal = false" 
      @update-success="handleProfileUpdate"
    />
</template>















<script>

import axios from 'axios';
import ProfileEditModal from "@/components/ProfileEditModal.vue"

export default {
  data() {
    return {
      error: '',
      profileData: null,
      userType: localStorage.getItem('userType'),
      showEditModal: false,
    };
  },

  components: {
    ProfileEditModal // Register the modal component
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
    },

    showEdit() {
      this.showEditModal = true;
    },

    handleProfileUpdate(updatedProfile) {
      this.profileData = updatedProfile;
      this.showEditModal = false; // Close the modal after successful update
    },

  }
}
</script>
















<style scoped>

.profile-page { 
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.profile-container {
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.profile-details {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.profile-field {
  font-size: 18px;
  margin: 10px 0;
}

.profile-picture-container {
    text-align: center; /* Center the image if the container is full width */
}
.profile-picture {
  max-width: 200px; /* Adjust the width as needed */
  max-height: 200px; /* Adjust the height as needed */
  border-radius: 50%; /* Optional: Rounds the corners of the image to make it circular */
  object-fit: cover; /* Ensures the image covers the area without distorting its aspect ratio */
}

.logout-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.logout-button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin: 20px 0;
}

</style>