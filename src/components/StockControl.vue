<template>
    <div class="card">
        <div class="card-header">
            <h2>Stock Control</h2>
        </div>
        <div class="card-body">
            <div v-if="lowStockProducts.length > 0">
                <ul class="low-stock-products-list">
                    <li v-for="product in lowStockProducts" :key="product.id" class="low-stock-product-item">
                        <p><strong>ID:</strong> {{ product.id }}</p>
                        <p><strong>Name:</strong> {{ product.name }}</p>
                        <p><strong>Stock Quantity:</strong> {{ product.stockQuantity }}</p>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>All products are sufficiently stocked at this time.</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'StockControlCard',
    data() {
        return {
            lowStockProducts: [],
            isLoading: false,
            error: null,
        };
    },
    created() {
        this.fetchLowStockProducts();
    },
    methods: {
        async fetchLowStockProducts() {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:18080/products/low-stock');
                this.lowStockProducts = response.data.lowStockProducts || [];
                this.isLoading = false;
            } catch (error) {
                this.error = error;
                this.isLoading = false;
                console.error('There was an error fetching the low stock products:', error);
            }
        }
    }
};
</script>

<style scoped>

.card-header {

}
.card-body {

}
.low-stock-products-list {

}
.low-stock-product-item {

}

</style>