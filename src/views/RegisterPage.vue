<template>
  <div class="registration-container">
    <h1>Customer Registration</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="customer.email" required>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="customer.password" required>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="customer.confirmPassword" required>
      </div>

      <!-- Additional fields here -->

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: {
        email: '',
        password: '',
        name: '',
        contactDetails: '',
        address: '',
        city: '',
        country: '',
      },
    };
  },
  methods: {
    register() {
      // Implement registration logic here
      // This will involve sending the customer data to the backend
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* Added for consistency in box sizing */
}

.register-form button.register-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.register-form button.register-btn:hover {
  background-color: #45a049;
}

</style>