<template>
    <div class="profile-page">
    <button @click="logout">Logout</button>
    </div> 
</template>

<script>
export default {

  methods: {
    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('userToken');
            
      // Redirect the user to the login page or home page
      this.$router.push('/dashboard');
    }
  }
}
</script>