<!-- src/components/Profile/ShopHeader.vue -->

<template>
  <div class="shop-header">
    <div class="shop-title-section">
      <div class="shop-title-info">
        <h2 class="shop-title">Магазин</h2>
        <span class="shop-count">{{ totalProducts }} товаров</span>
      </div>
      
      <div class="shop-search-top">
        <SearchInput 
          :value="searchQuery"
          placeholder="Поиск по товарам"
          @search="handleSearchInput"
        />
      </div>
    </div>
    
    <div class="shop-controls">
      <div class="shop-filters">
        <!-- Сортировка -->
        <div class="select-wrapper">
          <select v-model="selectedSort" class="shop-select sort-select" @change="handleSortChange">
            <option value="default">Сортировка</option>
            <option value="price-asc">По цене (возрастание)</option>
            <option value="price-desc">По цене (убывание)</option>
            <option value="name-asc">По названию (А-Я)</option>
            <option value="name-desc">По названию (Я-А)</option>
            <option value="date-new">Сначала новые</option>
            <option value="date-old">Сначала старые</option>
          </select>
          <img src="/images/profile/sort.png" alt="Сортировка" class="sort-icon" />
          <img src="/images/profile/select-arrow.png" alt="Стрелка" class="select-arrow" />
        </div>

        <!-- Количество на странице -->
        <div class="select-wrapper">
          <select v-model="selectedPerPage" class="shop-select items-count-select" @change="handlePerPageChange">
            <option value="20">20Шт</option>
            <option value="40">40Шт</option>
            <option value="60">60Шт</option>
            <option value="100">100Шт</option>
          </select>
          <img src="/images/profile/select-arrow.png" alt="Стрелка" class="select-arrow" />
        </div>

        <!-- Категории товаров -->
        <div class="select-wrapper">
          <select v-model="selectedCategory" class="shop-select" @change="handleCategoryChange">
            <option value="all">Все товары</option>
            <option value="abstraction">Абстракция</option>
            <option value="pasta">Макароны с сыром</option>
            <option value="hats">Шапки и кепки</option>
          </select>
          <img src="/images/profile/select-arrow.png" alt="Стрелка" class="select-arrow" />
        </div>

        <!-- Подборка товаров -->
        <div class="select-wrapper">
          <select v-model="selectedCollection" class="shop-select goods-selection-select" @change="handleCollectionChange">
            <option value="all">Подборка товаров</option>
            <option value="bestsellers">Хиты продаж</option>
            <option value="new">Новинки</option>
            <option value="discounted">Со скидкой</option>
            <option value="featured">Рекомендуемые</option>
          </select>
          <img src="/images/profile/select-arrow.png" alt="Стрелка" class="select-arrow" />
        </div>
      </div>

      <div class="shop-search-bottom">
        <SearchInput 
          :value="searchQuery"
          placeholder="Поиск по товарам"
          @search="handleSearchInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from './SearchInput.vue';

export default {
  name: 'ShopHeader',
  components: {
    SearchInput
  },
  props: {
    totalProducts: {
      type: Number,
      default: 456
    }
  },
  data() {
    return {
      selectedSort: 'default',
      selectedPerPage: '20',
      selectedCategory: 'all',
      selectedCollection: 'all',
      searchQuery: ''
    }
  },
  methods: {
    handleSortChange() {
      this.$emit('sort-change', this.selectedSort);
    },
    handlePerPageChange() {
      this.$emit('per-page-change', this.selectedPerPage);
    },
    handleCategoryChange() {
      this.$emit('category-change', this.selectedCategory);
    },
    handleCollectionChange() {
      this.$emit('collection-change', this.selectedCollection);
    },
    handleSearchInput(searchValue) {
      this.searchQuery = searchValue;
      this.$emit('search-change', searchValue);
    }
  }
}
</script>

<style scoped>
@import "/src/assets/profile/shopHeader.css";
</style>