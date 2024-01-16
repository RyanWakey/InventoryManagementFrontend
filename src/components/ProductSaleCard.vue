<template>
    <div class="product-sales-dashboard-container">
        <div class="product--sales-info-container">
            <div class="product-sales-total">
                <h2>All time products sold: {{ totalProductsSold }}</h2>
            </div>     
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            totalProductsSold: 0 
        };
    },
    mounted() {
        this.fetchTotalProductsSold();
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

</style>