<template>
    <div class="suppliers-management">
      <h1>Suppliers Management</h1>
      <div class="table-container">
        <!-- Table search -->
        <div class="table-header">
          <input type="text" placeholder="Search..." v-model="searchQuery">
        </div>
        <!-- Suppliers table -->
        <table>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Name</th>
              <th>Contact Person</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="supplier in filteredSuppliers" :key="supplier.SupplierID">
              <td>{{ supplier.SupplierID }}</td>
              <td>{{ supplier.Name }}</td>
              <td>{{ supplier.Contactperson }}</td>
              <td>{{ supplier.ContactNumber }}</td>
              <td>{{ supplier.Email }}</td>
              <td>{{ supplier.Address }}</td>
              <td>{{ supplier.Notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        searchQuery: '',
        suppliers: [], // You'll populate this array with your suppliers from the backend
        showAddSupplierModal: false,
      };
    },
    computed: {
      filteredSuppliers() {
        if (!this.searchQuery) {
          return this.suppliers;
        }
        // Simple search functionality
        return this.suppliers.filter((supplier) =>
          supplier.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },

    methods: {
        
     fetchSuppliers() {
      // Replace with your actual API endpoint
      const apiEndpoint = 'http://localhost:8080/suppliers';

      // Fetch the supplier data from the backend
      fetch(apiEndpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          this.suppliers = data;
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
     },
    }

  };
  </script>




<style scoped>
.suppliers-management {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.suppliers-management h1 {
  background-color: #cecbcb1a;
  width: 150%;
  text-align: center;
  padding: 10px 0;
  box-shadow: 1px 4px 4px rgb(250, 248, 248);
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  margin-right: 700px;
}

.table-container {
  width: 100%;
  max-width: 1000px;
  overflow-x: auto;
  margin-top: 60px;
  border: 1px solid #0000002a;
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
  padding: 16px 1px 16px 12px;
  border-bottom: 1px solid #ddd;
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
  border-right: 2px solid #ddd;
}

th:last-child::after {
  display: none;
}

thead {
  width: calc(100% - 1em);
}

thead, tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

tbody {
  display: block;
  max-height: 600px;
  overflow-y: auto;
}

tbody tr:hover {
  background-color: #f0f0f0;
}

/* Additional styles as needed for specific columns */
/* You can add classes as you did for the product table if you need specific widths */
</style>