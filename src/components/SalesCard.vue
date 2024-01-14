<template>
    <div class="sales-total">
        <h2> Total Sales Sold: {{ totalSales }}</h2>
    </div>    <div class="sales-revenue">
        <h2> Total Revenue: £{{ totalRevenue }}</h2>
    </div>
</template>

<script>
export default {
  data() {
    return {
      totalSales: 0,
      totalRevenue: 0,
    };
  },
  mounted() {
    this.fetchTotalSales();
    setTimeout(() => {
    this.fetchTotalRevenue();
  }, 1000); // Delay of 1000 milliseconds (1 second)
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
        this.totalSales = data.totalSales; // Now it expects an object with a totalSales property
      })
      .catch(error => console.error('Error fetching total sales:', error));
    },
    fetchTotalRevenue() {
      fetch("http://localhost:18080/sales/revenue")
        .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Total sales data: ', data);
        this.totalRevenue = data.totalRevenue;
      })
      .catch(error => console.error('Error fetching total revenue: ', error));
    }
  }
}
</script>



<style scoped>

.sales-total {
  background-color: #f0f0f0; 
  padding: 16px;
  border-radius: 8px;
}

.sales-total h2 {
  color: #1b1b1b; 
  margin: 0;
  margin-left: 8px; /* Shift text to the right by 8px */
  font-size: 16px; 
}

.sales-revenue {
  background-color: #f0f0f0;
  padding: 16px;
  border-radius: 8px;
}

.sales-revenue h2 {
  color: #1b1b1b; 
  margin: 0;
  margin-left: 8px; /* Shift text to the right by 8px */
  font-size: 16px; 
}

</style>