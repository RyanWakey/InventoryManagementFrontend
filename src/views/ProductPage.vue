<template>
  <div class="products-services">
    <h1>Products and Services</h1>
    <div class="table-container">
      <!-- Table search and button -->
      <div class="table-header">
        <input type="text" placeholder="Search..." v-model="searchQuery" @input="filterTable">
        <button class="new-item-btn">+ New Item</button>
      </div>
      <!-- Products table -->
      <table>
        <thead>
          <tr>
            <th class="item-code">Item Code</th>
            <th class="item-name">Item Name</th>
            <th class="cost-price">Cost Price</th>
            <th class="sale-price">Sale Price</th>
            <th class="quantity">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.ProductID">
            <td class="item-code">{{ product.ProductID }}</td>
            <td class="item-name">{{ product.Name }}</td>
            <td class="cost-price">{{ product.Cost }}</td>
            <td class="sale-price">{{ product.Price }}</td>
            <td class="quantity">{{ product.StockQuantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsServices',
  data() {
    return {
      products: [],
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
        const response = await axios.get('http://localhost:18080/products/table-info');
        this.products = response.data; 
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
        console.error('There was an error fetching the products:', error);
      }
    }
  }
};
</script>



<style scoped>
.products-services {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.table-container {
  width: 100%;
  max-width: 800px; /* Adjust this value to match the desired width */
  overflow-x: auto; /* Allows table to scroll on small screens */
  margin-bottom: 20px;
  border: 2px solid #000; /* Solid border around the table */
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

input[type="text"] {
  width: 70%;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Helps to ensure uniform column sizing */
}


th, td {
  text-align: center;
  padding: 12px;
  border-bottom: 1px solid #ddd; /* Horizontal lines between rows */
}

th {
  background-color: #f4f4f4;
  position: relative;
  padding: 4px;
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
  width: 50%; /* Adjust the width as needed */
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
  max-height: 500px; 
  overflow-y: auto;
}

tbody tr:hover {
  background-color: #f0f0f0;
}

.new-item-btn {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.new-item-btn:hover {
  background-color: #45a049;
}
</style>