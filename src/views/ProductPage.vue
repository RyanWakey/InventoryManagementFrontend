<template>
  <div class="products-services">
    <h1>Products and Services</h1>
    <div class="table-container">
      <!-- Table search and button -->
      <div class="table-header">
        <input type="text" placeholder="Search..." v-model="searchQuery" @input="filterTable">
        <button class="new-item-btn">+ Add Product</button>
      </div>
      <!-- Products table -->
      <table>
        <thead>
          <tr>
            <th class="item-code-header">Product Code</th>
            <th class="item-name">Product Name</th>
            <th class="cost-price">Cost Price</th>
            <th class="sale-price">Sale Price</th>
            <th class="quantity">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.ProductID">
            <td class="item-code" @click="fetchProductByID(product.ProductID)">{{ product.ProductID }}</td>
            <td class="item-name">{{ product.Name }}</td>
            <td class="cost-price">£{{ product.Cost }}</td>
            <td class="sale-price">£{{ product.Price }}</td>
            <td class="quantity">{{ product.StockQuantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

   <!-- Product Details Modal -->
   <ProductDetailsModal
    :product-details="selectedProductDetails"
    :visible="showModal"
    @close="showModal = false"
  />
</template>

<script>
import axios from 'axios';
import ProductDetailsModal from '@/components/ProductDetailsModal.vue';

export default {
  name: 'ProductsServices',
  components: {
    ProductDetailsModal,
  },
  data() {
    return {
      products: [],
      selectedProduct: null,
      showModal: false,
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      try {
        const response = await axios.get(`http://localhost:18080/products/table-info`);
        this.products = response.data; 
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
        console.error('There was an error fetching the products:', error);
      }
    },

    async fetchProductByID(productID) {
      try {
        const response = await axios.get(`http://localhost:18080/products/${productID}`)
        this.selectedProduct = response.data;
        this.showModal = true; // Show the modal after setting the selectedProduct
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
        console.error('There was an error fetching the product details:', error);
      }
    },

  }
};
</script>



<style scoped>
.products-services {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.products-services h1{
  background-color: #cecbcb1a; /* A light grey background for the header */
  width: 150%;
  text-align: center;
  padding: 10px 0; 
  box-shadow: 1px 4px 4px rgb(250, 248, 248); /* Optional: adds a shadow for depth */
  margin-bottom: 20px; /* Adds space below the header */
  border-bottom: 2px solid #e0e0e0; /* A solid line below the header */
  margin-right: 700px;
}

.table-container {
  width: 100%;
  max-width: 1000px; /* Adjust this value to match the desired width */
  overflow-x: auto; /* Allows table to scroll on small screens */
  margin-top: 60px;
  border: 1px solid #0000002a; /* Solid border around the table */
  padding: 30px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

input[type="text"] {
  width: 70%;
  padding: 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; 
}

th, td {
  text-align: left;
  padding:  16px 1px 16px 12px; /* top, right, bottom, left */
  border-bottom: 1px solid #ddd; /* Horizontal lines between rows */
}

th {
  background-color: #f4f4f4;
  position: relative;
  padding: 12px;
}

th::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border-right: 2px solid #ddd; /* Vertical lines between headers */
}

th:last-child::after {
  display: none; /* Remove the line from the last header cell */
}

th.item-code, td.item-code {
  width: 10%; /* Adjust the width as needed */
}

th.item-name, td.item-name {
  text-align: center; 
}

th.cost-price, td.cost-price,
th.sale-price, td.sale-price,
th.quantity, td.quantity {
  width: 13.33%; /* Adjust the width as needed */
}

thead {
  width: calc( 100% - 1em ); /* Adjust this value if scrollbar width is different */
}

thead, tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed; /* This makes sure that the table layout is fixed even when body has a scrollbar */
}

tbody {
  display: block;
  max-height: 600px; 
  overflow-y: auto;
}

tbody tr:hover {
  background-color: #f0f0f0;
}

.item-code {
  text-decoration: underline;
  color: #1a73e8; 
  cursor: pointer;
}

.item-code-header {
  width: 15%;
}

.new-item-btn {
  padding: 10px 20px;
  background-color: #077777;
  color: white;
  border: none;
  cursor: pointer;
}

.new-item-btn:hover {
  background-color: #45a049;
}
</style>