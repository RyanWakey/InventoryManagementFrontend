<template>
  <div class="business-page">
    <div class="page-header">
      <h1>Products and Services</h1>
      <button class="new-item-btn">+ New Item</button>
    </div>
    
    <div class="products-table">
      <table>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Cost Price</th>
            <th>Sale Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.costPrice }}</td>
            <td>{{ product.salePrice }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessPage',
  data() {
    return {
      products: [
        // Populate this array with your products data
      ],
    };
  },
  methods: {
    addNewProduct() {
      // Logic to add a new product
    },
  },
};
</script>

<style scoped>
.business-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-item-btn {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.products-table {
  margin-top: 20px;
  overflow-y: auto;
  height: 300px; /* Set a fixed height to make table scrollable */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
