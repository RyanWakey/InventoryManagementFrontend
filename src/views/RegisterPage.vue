<template>
  <div class="registration-page">
    <div class="registration-container">
      <h1>Customer Registration</h1>

      <form @submit.prevent="register" class="registration-form">

        <div class="form-group">
          <input type="email" id="email" v-model="customer.email" placeholder="Email" required>
          <p v-if="emailError" class="error-message">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <input type="password" id="password" v-model="customer.password" placeholder="Password" required>
        </div>

        <div class="form-group">
          <input type="password" id="confirmPassword" v-model="customer.confirmPassword" placeholder="Confirm Password" required>
        </div>

        <!-- Display error message if passwords do not match -->
        <p v-if="!passwordsMatch" class="error-message">Passwords do not match.</p>

        <button type="submit" class="register-btn">Register</button>
        
      </form>
    </div>
  </div> 
</template>


<script>

import axios from 'axios';

export default {
  data() {
    return {
      customer: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      emailError: '',
    };
  },

  computed: {
    passwordsMatch() {
      return this.customer.password === this.customer.confirmPassword;
    }
  },

  methods: {
    async register() {
      if (this.passwordsMatch) {  
        try {
          const response = await axios.post('http://localhost:18080/register', {
            email: this.customer.email,
            password: this.customer.password,
          });

          if (response.status === 201) {
            const { token } = response.data;
            localStorage.setItem('userToken', token); // Save the token
            alert('Account created successfully');
            this.$router.push({ path: '/dashboard' });
          } else if (response.status === 409) {
            alert('Registration failed: Email already exists.');
          } else {
            alert('Registration failed: ' + response.data);
          }  
          
        } catch (error) {
          console.error('There was an error!', error);
          if (error.response && error.response.status === 409) {
            this.emailError = 'Email already exists.';
          } else {
            alert('Registration failed: ' + error);
          }
        }
      } else {
        alert('Registration failed - Passwords don\'t match');
      }
    }
  }
};

</script>




<style scoped>
.registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* This will cover the entire height of the viewport */
}

.registration-container {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 60px; /* Increased padding */
  width: 400px; /* Set the width */
  background: white;
  font-size: 18px; /* Larger text */
}

.registration-form .form-group {
  margin-bottom: 30px; /* Increased space between input fields */
}

.registration-form input[type=email], 
.registration-form input[type=password] {
  width: calc(100% - 20px); /* Adjust width accounting for padding */
  padding: 15px; /* Larger padding */
  margin: 15px 0; /* Increased space around input fields */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px; /* Larger font size */
}

.registration-form .register-btn {
  width: calc(100% - 20px); /* Adjust width accounting for padding */
  padding: 15px; /* Larger padding */
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px; /* Larger font size */
}

.registration-form .register-btn:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
}

</style>