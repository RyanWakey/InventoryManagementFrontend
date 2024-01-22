<template>
  <div class="sales-dashboard-container">
    <div class="sales-info-container">
      <div class="sales-total">
        <h2>Total sales made: {{ totalSales }}</h2>
      </div>
      <div class="sales-revenue">
        <h2>All time revenue: £{{ totalRevenue }}</h2>
      </div>
    </div>
    <div class="sales-revenue-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="total-revenue-last-twelve-months">
      Total Revenue for the Last 12 Months: £{{ totalRevenueLastTwelveMonths.toFixed(2) }}
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
      totalRevenueLastTwelveMonths: 0,
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
    // Sort the revenues by date from oldest to newest
    monthlyRevenues.sort((a, b) => {
      const dateA = new Date(a.year, a.month - 1); // JS months are 0-indexed
      const dateB = new Date(b.year, b.month - 1);
      return dateA - dateB;
    });

    // Slice the array to get the last 12 entries after sorting
    const lastTwelveMonthsData = monthlyRevenues.slice(-12);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Map the sorted twelve months to their respective names and years
    const labels = lastTwelveMonthsData.map(rev => {
      const monthName = monthNames[rev.month - 1];
      return `${monthName} ${rev.year}`;
    });

    const dataPoints = lastTwelveMonthsData.map(rev => rev.totalRevenue);

    // Calculate the total revenue for the last 12 months
    const totalRevenueLastTwelveMonths = dataPoints.reduce((acc, value) => acc + value, 0);

    // Update a new data property if you want to display this total on your page
    this.totalRevenueLastTwelveMonths = totalRevenueLastTwelveMonths;

    this.renderChart(labels, dataPoints);
  },
    

    renderChart(labels, dataPoints) {
      const ctx = this.$refs.canvas.getContext('2d');

      if (this.myChart) {
        this.myChart.destroy(); // Destroy the previous instance if it exists
      }

      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels, 
          datasets: [{
            label: "Monthly Revenues",
            data: dataPoints,
            borderColor: 'rgb(75,192,192)',
            backgroundColor: 'rgba(75,192,192)', 
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                callback: function(value) {
                  return '£' + value;
                }
              }
            }
          },
          plugins: {
            legend: {
              onClick: null,
              labels: {
                usePointStyle: true, // Use point style instead of box
                color: 'rgb(0,0,0)', // Text color
                boxWidth: 10, // Box width
                padding: 20    
              }
            }
          }
        },
        
      });
    },
  }
}
</script>



<style scoped>

.sales-info-container {
  display: flex;
  justify-content: space-between; /* This will place the child elements on opposite ends */
  align-items: center; /* This will vertically align them in the center */ 
}

.sales-total {
  background-color: #f0f0f0; 
  padding: 8px;
  border-radius: 8px;
}

.sales-total h2 {
  color: #1b1b1bd5; 
  margin: 0;
  margin-left: 8px; 
  font-size: 16px; 
}

.sales-revenue {
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 8px;
}

.sales-revenue h2 {
  color: #1b1b1bd3; 
  margin: 0;
  margin-left: 8px; /* Shift text to the right by 8px */
  font-size: 16px; 
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

.total-revenue-last-twelve-months {
  margin-top: 15px;
}

</style>