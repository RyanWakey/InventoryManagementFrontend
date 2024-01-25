<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <button class="close-btn" @click="close">X</button>
      <h3>Product Details</h3>
      <div class="product-details">
        <p><strong>ID:</strong> {{ productDetails.ProductID }}</p>
        <p><strong>Name:</strong> {{ productDetails.Name }}</p>
        <p><strong>Description:</strong> {{ productDetails.Description }}</p>
        <p><strong>Price:</strong> {{ productDetails.Price }}</p>
        <p><strong>Cost:</strong> {{ productDetails.Cost }}</p>
        <p><strong>Description:</strong> {{ productDetails.Description }}</p>
        <p><strong>Price:</strong> {{ productDetails.Price }}</p>
        <p><strong>Cost:</strong> {{ productDetails.Cost }}</p>
        <p><strong>Weight:</strong> {{ productDetails.Weight }} kg</p>
        <p><strong>Dimensions (LxWxH):</strong> {{ productDetails.Length }} x {{ productDetails.Width }} x {{ productDetails.Height }} cm</p>
        <p><strong>Stock Quantity:</strong> {{ productDetails.StockQuantity }}</p>
        <p><strong>Status:</strong> <span :class="{ active: productDetails.isActive }">{{ productDetails.isActive ? 'Active' : 'Inactive' }}</span></p>
        <p><strong>Date Added:</strong> {{ productDetails.DateAdded }}</p>
        <p><strong>Date Modified:</strong> {{ productDetails.DateModified }}</p>
      </div>
      <div class="modal-actions">
        <div class="edit-button">
          <button @click="editProduct">Edit</button>
        </div>
        <div class="delete-button">
          <button @click="deleteProduct">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productDetails: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    } 
  },
  methods: {
    close() {
      this.$emit('close');
    },
    editProduct() {
      this.$emit('edit', this.productDetails);
    },
    deleteProduct() {
      this.$emit('delete', this.productDetails.ProductID);
      this.close();
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
  width: 500px;
  height: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.close-btn {
  float: right;
  border: none;
  background: none;
  cursor: pointer;
}


.modal-actions {
  display: flex;
  justify-content: flex-end; /* Aligns the buttons to the right */
}

.edit-button button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: rgba(103, 138, 6, 0.637);
  color: white;
}
.delete-button button {
  padding: 10px 20px;
  margin-left: 20px;
  background-color: rgba(255, 0, 0, 0.637);
  color: white;
}

</style>