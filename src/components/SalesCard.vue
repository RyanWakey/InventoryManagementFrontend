<template>
  <div class="dashboard-container">
    <div class="sales-info-container">
      <div class="sales-total">
        <h2>Total Sales Sold: {{ totalSales }}</h2>
      </div>
      <div class="sales-revenue">
        <h2>Total Revenue: £{{ totalRevenue }}</h2>
      </div>
    </div>
    <div class="sales-revenue-chart">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>

import Chart from 'chart.js/auto';
import { LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// Register the line controller
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

export default {
  data() {
    return {
      totalSales: 0,
      totalRevenue: 0,
    };
  },
  mounted() {
    this.fetchTotalSales();
    this.fetchTotalRevenue();
    this.fetchMonthlyRevenue();
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
    },

    
    fetchMonthlyRevenue() {
      fetch("http://localhost:18080/sales/monthly-revenue")
        .then(response => response.json())
        .then(data => { // 'data' should be the array based on your Postman output
          this.prepareChartData(data); // Pass the array directly to 'prepareChartData'
        })
        .catch(error => console.error('Error fetching monthly revenue', error));
    },

    prepareChartData(monthlyRevenues) {
      // Make sure 'monthlyRevenues' is actually an array before proceeding
      if (!Array.isArray(monthlyRevenues)) {
        console.error('Data is not an array:', monthlyRevenues);
        return;
      }

      const labels = monthlyRevenues.map(rev => `${rev.month}/${rev.year}`);
      const dataPoints = monthlyRevenues.map(rev => rev.totalRevenue);

      this.renderChart(labels, dataPoints);
    },

    renderChart(labels, dataPoints) {
      const ctx = this.$refs.canvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels, 
          datasets: [{
            label: "Monthly Revenues",
            data: dataPoints,
            borderColor: 'rgb(75,192,192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    },
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

.sales-info-container {
  display: flex;
  justify-content: space-between; /* This will place the child elements on opposite ends */
  align-items: center; /* This will vertically align them in the center */ 
}

.sales-revenue-chart {
  width: 100%; /* Adjust width as needed */
  max-width: 700px; /* Or however wide you want the chart to be */
  height: 300px; /* Adjust height as needed */
}

/* Add some media queries if you need responsiveness */
@media (max-width: 768px) {
  .sales-revenue-chart {
    width: 100%;
    height: 300px;
  }
}

</style>