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
          <tbody class="table-body">
            <tr v-for="supplier in filteredSuppliers" :key="supplier.SupplierID">
              <td>
                <a href="#" @click="openPurchaseOrders(supplier.SupplierID)" style="color: blue; text-decoration: underline;">
                  {{ supplier.SupplierID }}
                </a>
              </td>
              <td>{{ supplier.Name }}</td>
              <td>{{ supplier.ContactPerson }}</td>
              <td>{{ supplier.ContactNumber }}</td>
              <td>{{ supplier.Email }}</td>
              <td>{{ supplier.Address }}</td>
              <td>{{ supplier.Notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <PurchaseOrdersModal 
    :supplierId="selectedSupplierId"
    :visible="showPurchaseOrdersModal" 
    :orders="purchaseOrders" 
    @close="showPurchaseOrdersModal = false"
    @showOrderDetails="handleOrderSelected"
    ></PurchaseOrdersModal>  

    <PurchaseOrderDetailsModal
    :supplierId="selectedSupplierId"
    :orderId="selectedOrderId"
    :visible="showOrderDetailsModal"
    @close="showOrderDetailsModal"
    ></PurchaseOrderDetailsModal>
  </template>
  
  <script>
  
  import axios from 'axios';
  import PurchaseOrdersModal from '@/components/PurchaseOrderModal.vue'
  import PurchaseOrderDetailsModal from '@/components/PurchaseOrderDetailsModal.vue'

  export default {
    data() {
      return {
        purchaseOrders: [],
        searchQuery: '',
        suppliers: [],
        selectedSupplierId: null,
        selectedOrderId: null,  
        showPurchaseOrdersModal: false,
        showOrderDetailsModal: false,
      };
    },

    mounted() {
      this.fetchSuppliers(); // Fetch suppliers when component mounts
    },

    components: {
      PurchaseOrdersModal,
      PurchaseOrderDetailsModal
    },  

    computed: {
      filteredSuppliers() {
        if (!this.searchQuery) {
          return this.suppliers;
        }
        return this.suppliers.filter((supplier) =>
          supplier.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },

    methods: {
      async fetchSuppliers() {
        this.isLoading = true;
        try {
          const response = await axios.get(`http://localhost:18080/suppliers`);
          console.log('Fetched Suppliers:', response.data); // Log the fetched products
          this.suppliers = response.data; 
          this.isLoading = false;
        } catch (error) {
          this.error = error;
          this.isLoading = false;
          console.error('There was an error fetching the suppliers:', error);
        }
      },
    

    async openPurchaseOrders(supplierId) {
      this.isLoading = true;
      try {
        const response = await axios.get(`http://localhost:18080/suppliers/${supplierId}/purchaseorders`);
        console.log('Fetched Purchase Orders:', response.data);
        this.purchaseOrders = response.data; 
        this.selectedSupplierId = supplierId;
        this.showPurchaseOrdersModal = true;
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
        this.isLoading = false;
      }
    },

    handleOrderSelected(orderId) {
      this.selectedOrderId = orderId;
      this.showPurchaseOrderModal = false;
      this.showOrderDetailsModal = true;
    },

    handleCloseOrderDetails() {
      this.showOrderDetailsModal = false;
    }
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
  table-layout: fixed;
}

.table-container .table-body {
  max-height: 700px; /* Adjust the height to display the number of rows you want */
  overflow-y: auto; /* Adds a scrollbar when the content overflows */
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


.table-container th, .table-container td {
  word-wrap: break-word; /* This will break long words or URLs to the next line */
  overflow-wrap: break-word; /* Use this as well for better compatibility */
}

/* To decrease the width of the Supplier ID field, set a smaller width */
.table-container th:nth-child(1), /* First column */
.table-container td:nth-child(1) {
  width: 80px; 
}

</style>