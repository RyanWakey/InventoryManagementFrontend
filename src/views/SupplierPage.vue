<template>
    <div class="suppliers">
      <h1>Suppliers</h1>
      <div class="table-container">
        <!-- Table search -->
        <div class="table-header">
          <input type="text" placeholder="Search..." v-model="searchQuery">
          <button class="new-supplier-btn" @click="showAddSupplierModal = true">+ Add Supplier</button>
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
      const apiEndpoint = 'http://localhost:8080/api/suppliers';

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