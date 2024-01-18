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
        <div class="most-popular-category">
            <h2>Most popular Category: {{ mostPopularCategory.name }}
            with {{ mostPopularCategory.unitsSold }} units sold. </h2>
        </div>
        <div class="button-container">
            <label for="toggle-chart">Switch Chart View:</label>
            <button id="toggle-chart" @click="toggleChartType">Toggle Chart</button>
        </div>
        <div class="chart-container">
            <canvas ref="chartCanvas"></canvas>
        </div>
     </div>
    </div>
</template>

<script>

import Chart from 'chart.js/auto';
import { LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// Register the line controller
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

let chartInstance = null; 

export default {
    data() {
        return {
            totalProductsSold: 0,
            topSellingProducts: [],
            mostPopularCategory: {
                name: '',
                unitsSold: 0
            },
            chartData: {},
            currentChartType: 'revenue',
        };
    },
    mounted() {
        this.fetchTotalProductsSold();
        this.fetchMostProductsSold();
        this.fetchMostPopularCategoryAndUnitsSold();

        this.fetchChartData();
        this.renderChart();
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
        },

        fetchMostPopularCategoryAndUnitsSold() {
         fetch("http://localhost:18080/sales/most-popular-category-units")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
                console.log('Most popular category data:', data);
                this.mostPopularCategory.name = data.mostPopularCategory;
                this.mostPopularCategory.unitsSold = data.unitsSold;
            })
            .catch(error => {
                console.error('Error fetching most popular category and units sold:', error);
            });
        },

        fetchChartData() {
            // Fetch both datasets
            Promise.all([
                fetch("http://localhost:18080/sales/revenue-by-category").then(res => res.json()),
                fetch("http://localhost:18080/sales/units-sold-by-category").then(res => res.json())
            ]).then(([revenueData, unitsSoldData]) => {
                this.chartData.revenue = this.prepareChartData(revenueData, 'Revenue by Category', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
                this.chartData.unitsSold = this.prepareChartData(unitsSoldData, 'Units Sold by Category', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');
                this.renderChart(this.currentChartType);
                
            }).catch(error => {
                console.error('Error fetching chart data:', error);
            });
        },

        prepareChartData(data, label, backgroundColor, borderColor) {
            // Assuming your data object has a nested structure based on your log
            const categories = Object.keys(data.revenueByCategory || data.unitsSoldByCategory);
            const values = Object.values(data.revenueByCategory || data.unitsSoldByCategory);

            return {
                labels: categories,
                datasets: [{
                    label: label,
                    data: values,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            };
        },


        renderChart(chartType) {
        if (this.$refs.chartCanvas) {
            const context = this.$refs.chartCanvas.getContext('2d');

            if (chartInstance) {
                chartInstance.destroy();        
            }

            // Define options for the chart
            const options = {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                // Only add the $ sign for the revenue chart
                                if (chartType === 'revenue') {
                                    return '$' + value;
                                }
                                return value;
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true, // Use point style instead of box
                        }
                    }
                },
            };

            chartInstance = new Chart(context, {
                type: 'bar',
                data: this.chartData[chartType],
                options: options,
            });
        } else {
            console.error('Canvas element is not available');
        }
    },

        toggleChartType() {
            this.currentChartType = this.currentChartType === 'revenue' ? 'unitsSold' : 'revenue';
            // Wait until Vue has updated the DOM
            this.$nextTick(() => {
                this.renderChart(this.currentChartType);
            });
        },

        beforeUnmount() {
            if (chartInstance) {
                chartInstance.destroy();
            }
        },
        
    }, 
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


.most-popular-category h2 {
  color: #1b1b1b; 
  margin: 0;
  margin-top: 12px; 
  margin-left: 8px; /* Shift text to the right by 8px */
  font-size: 15px; 
}

.chart-container {
  height: 250px; /* Adjust height as needed */
  width: 100%; /* Adjust width as needed */
  margin-top: 20px; /* Move the chart down */
}

.button-container {
  margin-left: 32px; /* Center align the button container */
  margin-top: 20px; /* Space above the button container */
}

.button-container label {
  margin-right: 10px; /* Space between the label and the button */
  font-size: 16px; /* Adjust label font size as needed */
}

button {
  padding: 10px 20px; /* Top/bottom and left/right padding */
  border: none; /* Remove default border */
  background-color: #19689c42; /* Button background color */
  color: white; /* Button text color */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Cursor to indicate it's clickable */
  font-size: 16px; /* Text size */
  transition: background-color 0.3s ease; /* Smooth background color transition on hover */
}

button:hover {
  background-color: #2980b9; /* Darker shade on hover */
}


</style>