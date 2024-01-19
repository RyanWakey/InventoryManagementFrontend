<template>
    <div class="transactions-dashboard-container">
        <div class="transactions-info-container">
            <div class="transactions-total"> 
                <h2>Total Transactions made: {{ TransactionCount }}</h2>
            </div>    
            <div class="transactions-type">
                <h2>Overview of type of transactions made: </h2>
            </div> 
            <ul>
            <li v-for="(count, type) in transactionCountsByType" :key="type">
                {{ type }}: {{ count }}
            </li>
            </ul> 
        </div>
    </div>
  </template>
  

<script>

export default {
    data() {
    return {
        TransactionCount: 0,
        transactionCountsByType: {}
    };
  },
  mounted() {
    this.fetchTransactionsCount();
    this.fetchTransactionCountsByType();
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
    fetchTransactionCountsByType() {
      
      fetch("http://localhost:18080/transactions/count-by-type")
        .then(response => response.json())
        .then(data => {
          this.transactionCountsByType = data;
        })
        .catch(error => console.error('Error fetching transaction counts:', error));
    }
  }
}

</script>


<style scoped>

.transactions-total h2 {
    font-size: 16px;
}

.transactions-type h2 {
    font-size: 16px;
}

ul li {
  margin-bottom: 12px; 
}

ul li:last-child {
  margin-bottom: 0; /* Removes the margin from the last item to prevent extra space at the end of the list */
}

</style>