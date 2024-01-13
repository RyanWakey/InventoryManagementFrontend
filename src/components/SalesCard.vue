<template>
    <div class="sales-total">
        <h2> Total Sales Sold: {{ totalSales }}</h2>
    </div>
</template>

<script>
export default {
  data() {
    return {
      totalSales: 0,
    };
  },
  mounted() {
    this.fetchTotalSales();
  },
  methods: {
    fetchTotalSales() {
    fetch("http://localhost:18080/sales/count")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // This parses the JSON body text as a JavaScript object
      })
      .then(data => {
        console.log('Total sales data:', data);
        this.totalSales = data; // Now it expects an object with a totalSales property
      })
      .catch(error => console.error('Error fetching total sales:', error));
    }
  }
}
</script>



<style scoped>

.sales-total {
  background-color: #f0f0f0; /* Light grey background */
  padding: 16px;
  border-radius: 8px;
}

.sales-total h2 {
  color: #1b1b1b; /* Dark grey text for less blackness */
  margin: 0;
  margin-left: 8px; /* Shift text to the right by 8px */
  font-size: 16px; /* Smaller font size */
}


</style>