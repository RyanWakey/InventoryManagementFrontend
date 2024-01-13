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



<style scoped

></style>