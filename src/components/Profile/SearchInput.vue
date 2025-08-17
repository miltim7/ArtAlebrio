<!-- src/components/Profile/SearchInput.vue -->

<template>
  <div class="search-input-wrapper">
    <input 
      type="text" 
      v-model="searchValue" 
      :placeholder="placeholder"
      class="search-input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div class="search-separator"></div>
    <div class="search-icon-wrapper">
      <img src="/images/profile/search.png" alt="Поиск" class="search-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String,
      default: 'Поиск по товарам'
    },
    value: {
      type: String,
      default: ''
    },
    debounceTime: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      searchValue: this.value,
      isFocused: false
    }
  },
  watch: {
    value(newValue) {
      this.searchValue = newValue;
    }
  },
  methods: {
    handleInput() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.$emit('input', this.searchValue);
        this.$emit('search', this.searchValue);
      }, this.debounceTime);
    },
    handleFocus() {
      this.isFocused = true;
      this.$emit('focus');
    },
    handleBlur() {
      this.isFocused = false;
      this.$emit('blur');
    }
  },
  beforeDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  }
}
</script>

<style scoped>
@import "/src/assets/profile/searchInput.css";
</style>