<template>
    <div class="transactions-dashboard-container">
        <div class="transactions-info-container">
            <div class="transactions-total"> 
                <h2>Total Transactions made: {{ TransactionCount }}</h2>
            </div>      
        </div>
    </div>
  </template>
  

<script>

export default {
    data() {
    return {
        TransactionCount: 0
    };
  },
  mounted() {
    this.fetchTransactionsCount();
  },
  methods: {
    fetchTransactionsCount() {
        fetch("http://localhost:18080/transactions/count")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // This parses the JSON body text as a JavaScript object
        })
        .then(data => {
            console.log('Total sales data:', data);
            this.TransactionCount = data.TransactionCount; // Now it expects an object with a totalSales property
        })
        .catch(error => console.error('Error fetching total sales:', error));
    },
  }
}

</script>


<style scoped>

.transactions-total h2 {
    font-size: 16px;
}


</style>