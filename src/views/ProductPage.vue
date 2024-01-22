<template>
  <div class="products-services">
    <h1>Products and Services</h1>
    <div class="table-container">
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
          <!-- Table rows will be inserted here -->
        </tbody>
      </table>
    </div>
    <button class="new-item-btn">+ New Item</button>
  </div>
</template>

<script>
export default {
  name: 'ProductsServices',
  // Your component's data and methods will go here
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
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.new-item-btn {
  align-self: flex-end;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.new-item-btn:hover {
  background-color: #45a049;
}
</style>
