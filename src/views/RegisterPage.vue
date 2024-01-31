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
        <label for="password">Password</label>
        <input type="password" id="password" v-model="customer.password" required>
      </div>


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