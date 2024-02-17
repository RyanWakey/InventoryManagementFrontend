<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Login to your Account</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="email" id="email" v-model="loginDetails.email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="loginDetails.password" placeholder="Password" required>
        </div>
        <div class="form-group">
          <label for="userType">I am a: </label>
          <select id="userType" v-model="loginDetails.userType" required>
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button type="submit">Login</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
      <button @click="navigateToRegister">Register an Account</button>
    </div>
  </div>
</template>
  
<script>

import axios from 'axios'

  export default {
    data() {
      return {
        loginDetails: {
          userType: '',
          email: '',
          password: ''
        },
        error: null
      };
    },

    // created() {
    //   this.checkAuthToken();
    // },

    methods: {
      async handleLogin() {
        try {
          const response = await axios.post('http://localhost:18080/login', this.loginDetails);

          if (response.status === 200) {
            // Store the token
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userType', response.data.userType);
            localStorage.setItem('userId', response.data.userId); 
           
            if (response.data.roles && response.data.roles.length > 0) {
              // Store the first role name 
              localStorage.setItem('userRole', response.data.roles[0].RoleName);
            } else {
              // No roles are returned
              console.log('No roles found for the user.');
              localStorage.removeItem('userRole'); // or localStorage.setItem('userRole', 'defaultRole');
            }

            this.$store.dispatch('authenticateUser', true);
            // Redirect to dashboard
            this.$router.push({ path: '/dashboard' });
          }
        } catch (error) {
          this.error = 'Invalid login credentials. Please try again.';
          console.error('Login error:', error);
        }
      },

      navigateToRegister() {
        this.$router.push({ path: '/register' });
      },
      // checkAuthToken() { 
      //   const token = localStorage.getItem('userToken');
      //   if (token) {
      //     console.log('Token exists:', token);
      //   } else {
      //     console.log('No token found. User is not logged in.');
      //   }
      // }
    }
  };
  
</script>
  
<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* This will cover the entire height of the viewport */
}

.login-container {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 60px; /* Increased padding */
  width: 400px; /* Increased width */
  background: white;
  font-size: 18px; /* Larger text */
}

.form-group {
  margin-bottom: 30px; /* Increased space between input fields */
}

input[type=email], input[type=password] {
  width: calc(100% - 20px); /* Adjust width accounting for padding */
  padding: 15px; /* Larger padding */
  margin: 15px 0; /* Increased space around input fields */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px; /* Larger font size */
}

button {
  width: calc(100% - 20px); /* Adjust width accounting for padding */
  padding: 15px; /* Larger padding */
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px; /* Larger font size */
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 20px; /* Add space above the error message if needed */
  font-size: 16px; /* Larger font size for error message */
}


</style>
  