<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button @click="close" class="close-btn">X</button>
      <h2>Edit Profile</h2>

      <!-- Non-editable Fields -->
      <div class="profile-info">
        <p><strong>ID:</strong> {{ profileData.CustomerID }}</p>
        <p><strong>Email:</strong> {{ profileData.Email }}</p>
      </div>

      <!-- Editable Form -->
      <form @submit.prevent="saveProfileChanges">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="editableProfileDetails.Name">
        </div>
        <div class="form-group">
          <label for="contactDetails">Contact Details:</label>
          <input type="text" id="contactDetails" v-model="editableProfileDetails.ContactDetails">
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="editableProfileDetails.Address">
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" id="city" v-model="editableProfileDetails.City">
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <input type="text" id="country" v-model="editableProfileDetails.Country">
        </div>
        <button type="submit" class="save-btn">Save Changes</button>
        <button type="button" @click="close" class="cancel-btn">Cancel</button>
      </form>
    </div>
  </div>
</template>










<script>
import axios from 'axios';

export default {
  props: {
    show: Boolean,
    profileData: Object
  },
  data() {
    return {
      editableProfileDetails: {},
      error: '' // You can use this to display any error messages
    };
  },
  watch: {
    profileData: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.editableProfileDetails = { ...newValue };
      }
    }
  },
  methods: {

    close() {
      this.$emit('close-modal');
    },

    saveProfileChanges() {
      axios.patch(`http://localhost:18080/profile/customer/${this.profileData.CustomerID}/update`, this.editableProfileDetails)
      .then(response => { 
        this.$emit('update-success', response.data); // Inform the parent component about the update
        this.close();

      })
      .catch(error => {
        console.error('Error saving the product details:', error);
      });
    
    }
  }
};
</script>


















<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}

.close-btn {
  float: right;
  cursor: pointer;
}

.form-group {
  margin-bottom: 10px;
}

.save-btn,
.cancel-btn {
  margin-top: 10px;
  cursor: pointer;
}

.cancel-btn {
  margin-left: 10px;
}
</style>