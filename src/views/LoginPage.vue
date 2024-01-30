<template>
    <div class="login-container">
      <h1>Employee Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="loginDetails.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginDetails.password" required>
        </div>
        <button type="submit">Login</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loginDetails: {
          email: '',
          password: ''
        },
        error: null
      };
    },
    methods: {
      async handleLogin() {
        try {
          // const response = await this.$axios.post('/login', this.loginDetails);
          // Handle successful login, store the token, redirect, etc.
        } catch (err) {
          // Handle error, show error message
          this.error = 'Invalid login credentials. Please try again.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #4cae4c;
  }
  
  .error-message {
    color: red;
    margin-top: 20px;
  }
  </style>
  