<template>
    <div class="product-sales-dashboard-container">
      <div class="product-sales-info-container">
        <div class="product-sales-total">
            <h2>All time products sold: {{ totalProductsSold }}</h2>
        </div>
        <div class="top-selling-products">
            <h2>The top 6 selling products in the last 6 months:</h2>
            <ul><li v-for="product in topSellingProducts" :key="product.productName">
                {{ product.productName }}: {{ product.quantitySold }} </li></ul>
        </div>
     </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            totalProductsSold: 0,
            topSellingProducts: 0
        };
    },
    mounted() {
        this.fetchTotalProductsSold();
        this.fetchMostProductsSold();
    },
    methods: {
        fetchTotalProductsSold() {
            fetch("http://localhost:18080/sales/total-products-sold")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // This parses the JSON body text as a JavaScript object
            })
            .then(data => {
                console.log('Total sales data:', data);
                this.totalProductsSold = data.totalProductsSold; // Now it expects an object with a totalSales property
            })
            .catch(error => console.error('Error fetching total products sold:', error));
        },

        fetchMostProductsSold() {
            fetch("http://localhost:18080/sales/top-6-products")
            .then(response => {
                if (!response.ok){
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Top 6 product data:', data);
                this.topSellingProducts = data;
            })
            .catch(error => console.error('Error fetching top selling projects:', error));
        }
    }
}

</script>

<style scoped>


.product-sales-total {
  background-color: #f0f0f0; 
  padding: 16px;
  border-radius: 8px;
}

.product-sales-total h2 {
  color: #1b1b1b; 
  margin: 0;
  margin-left: 8px; /* Shift text to the right by 8px */
  font-size: 16px; 
}


.top-selling-products h2 {
    margin-left: 8px;
    font-size: 16px;      
}

.top-selling-products ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.top-selling-products li {
  flex: 1 1 50%; /* Causes each item to take up half the width of the parent container */
  box-sizing: border-box;
  padding: 8px; /* Adjust the padding as necessary */
  margin-bottom: 4px; /* Adds space between rows */
}

.top-selling-products li::before {
  content: '—'; /* en dash */
  margin-right: 8px; /* Adjust the margin as necessary */
}

</style>