<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <button class="close-btn" @click="close">X</button>
      <h3>Product Details</h3>
      
      <div class="product-details" v-if="!isEditing">
        <!-- Display product details in read-only mode -->
        <p><strong>ID:</strong> {{ productDetails.ProductID }}</p>
        <p><strong>Name:</strong> {{ productDetails.Name }}</p>
        <p><strong>Description:</strong> {{ productDetails.Description }}</p>
        <p><strong>Price:</strong> £{{ productDetails.Price }}</p>
        <p><strong>Cost:</strong> £{{ productDetails.Cost }}</p>
        <p><strong>Weight:</strong> {{ productDetails.Weight }} kg</p>
        <p><strong>Dimensions (LxWxH):</strong> {{ productDetails.Length }} x {{ productDetails.Width }} x {{ productDetails.Height }} cm</p>
        <p><strong>Stock Quantity:</strong> {{ productDetails.StockQuantity }}</p>
        <p><strong>Status:</strong> <span :class="{ 'status-active': productDetails.isActive, 'status-inactive': !productDetails.isActive }">{{ productDetails.isActive ? 'Active' : 'Inactive' }}</span></p>
        <p><strong>Date Added:</strong> {{ productDetails.DateAdded }}</p>
        <p><strong>Date Modified:</strong> {{ productDetails.DateModified }}</p>
      </div>

      <div class="product-details-edit" v-else>
        <!-- Display product details in edit mode with input fields -->
        <p><strong>ID:</strong> {{ productDetails.ProductID }}</p>
        <p><strong>Name:</strong> <input type="text" v-model="editableProductDetails.Name"></p>
        <p><strong>Description:</strong> <textarea v-model="editableProductDetails.Description"></textarea></p>
        <p><strong>Price:</strong> <input type="number" v-model="editableProductDetails.Price"></p>
        <p><strong>Cost:</strong> <input type="number" v-model="editableProductDetails.Cost"></p>
        <p><strong>Weight:</strong> <input type="number" v-model="editableProductDetails.Weight"></p>
        <p><strong>Dimensions (LxWxH):</strong> <input type="number" v-model="editableProductDetails.Length"> x <input type="number" v-model="editableProductDetails.Width"> x <input type="number" v-model="editableProductDetails.Height"></p>
        <p><strong>Stock Quantity:</strong> <input type="number" v-model="editableProductDetails.StockQuantity"></p>
        <p><strong>Status:</strong> <input type="checkbox" v-model="editableProductDetails.isActive"> Active</p>
        <p><strong>Date Added:</strong> {{ productDetails.DateAdded }}</p>
        <p><strong>Date Modified:</strong> {{ productDetails.DateModified }}</p>
      </div>

      <div class="modal-actions">
        <div class="edit-button" v-if="!isEditing">
          <button @click="toggleEdit">Edit</button>
        </div>
        <div class="save-delete-buttons" v-else>
          <button @click="saveChanges">Save</button>
          <button @click="toggleEdit">Cancel</button>
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
  data() {
    return {
      isEditing: false,
      editableProductDetails: {}
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        // Clone the details for editing
        this.editableProductDetails = { ...this.productDetails };
      }
    },
    saveChanges() {
      // Call your API to save changes
      // Replace with your actual API call and handle the promise accordingly
      console.log('Saving changes:', this.editableProductDetails);
      this.close(); // Close the modal after saving
      // Emit an event to inform the parent component about the update
      this.$emit('update', this.editableProductDetails);
    },
    deleteProduct() {
      // Call your API to delete the product
      // Replace with your actual API call and handle the promise accordingly
      console.log('Deleting product:', this.productDetails.ProductID);
      this.close(); // Close the modal after deleting
      // Emit an event to inform the parent component about the deletion
      this.$emit('delete', this.productDetails.ProductID);
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