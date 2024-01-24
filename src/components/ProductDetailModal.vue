<template>
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal">
        <button class="close-btn" @click="close">X</button>
        <h3>Product Details</h3>
        <p><strong>ID:</strong> {{ productDetails.ProductID }}</p>
        <p><strong>Name:</strong> {{ productDetails.Name }}</p>
        <!-- Add more product details here -->
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    productDetails: Object,
    visible: Boolean
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.close-btn {
  float: right;
  border: none;
  background: none;
  cursor: pointer;
}
</style>