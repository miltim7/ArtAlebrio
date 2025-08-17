<!-- src/components/Profile/ProductCard.vue -->

<template>
  <div class="product-card">
    <div class="product-image-container">
      <img :src="product.image" :alt="product.title" class="product-image" />
      
      <div class="product-badges">
        <span v-if="product.discount" class="badge badge-discount">
          Скидка {{ product.discount }}%
        </span>
        <span v-if="product.freeDelivery" class="badge badge-delivery">
          Бесплатная доставка
        </span>
        <span v-if="product.isHit" class="badge badge-hit">
          Хит продаж
        </span>
      </div>
      
      <div class="favorite-btn" @click="toggleFavorite">
        <img 
          :src="product.isFavorite ? '/images/profile/heart-active.png' : '/images/profile/heart.png'" 
          alt="В избранное" 
          class="heart-icon" 
        />
      </div>
    </div>
    
    <div class="product-info">
      <h3 class="product-title">{{ product.title }}</h3>
      
      <div class="product-price">
        <span class="current-price">{{ formatPrice(product.currentPrice) }} ₽</span>
        <span v-if="product.oldPrice" class="old-price">{{ formatPrice(product.oldPrice) }}</span>
        <span v-if="product.discount" class="discount-percent">-{{ product.discount }}%</span>
      </div>
      
      <div class="product-type-container">
        <span class="product-type">Цифровой товар</span>
      </div>
      
      <button class="add-to-cart-btn" @click="addToCart">
        Добавить в корзину
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    toggleFavorite() {
      this.$emit('toggle-favorite', this.product.id);
    },
    addToCart() {
      this.$emit('add-to-cart', this.product.id);
    }
  }
}
</script>

<style scoped>
@import "/src/assets/profile/productCard.css";
</style>