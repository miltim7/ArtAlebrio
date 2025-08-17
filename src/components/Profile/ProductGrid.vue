<!-- src/components/Profile/ProductGrid.vue -->

<template>
  <div class="product-grid-container">
    <div class="product-grid">
      <ProductCard 
        v-for="product in paginatedProducts" 
        :key="product.id" 
        :product="product"
        @toggle-favorite="handleToggleFavorite"
        @add-to-cart="handleAddToCart"
      />
    </div>
    
    <div v-if="products.length === 0" class="no-products">
      <p class="no-products-text">Товары не найдены</p>
      <p class="no-products-subtitle">Попробуйте изменить параметры поиска или фильтры</p>
    </div>
    
    <Pagination 
      v-if="products.length > 0"
      :current-page="currentPage"
      :total-items="products.length"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'ProductGrid',
  components: {
    ProductCard,
    Pagination
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    }
  },
  methods: {
    handleToggleFavorite(productId) {
      this.$emit('toggle-favorite', productId);
    },
    handleAddToCart(productId) {
      this.$emit('add-to-cart', productId);
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.$emit('page-change', page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },
  watch: {
    products() {
      this.currentPage = 1;
    },
    itemsPerPage() {
      this.currentPage = 1;
    }
  }
}
</script>

<style scoped>
@import "/src/assets/profile/productGrid.css";
</style>