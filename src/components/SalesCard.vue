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
      // Fetch data from the API
      fetch("http://localhost:18080/sales/count")
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.totalSales = data.totalSales;
        })
        .catch(error => console.error('Error fetching total sales:', error));
    }
  }
}
</script>



<style scoped

></style>