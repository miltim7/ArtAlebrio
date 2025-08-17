<!-- src/components/Profile/Pagination.vue -->

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button 
      class="pagination-btn pagination-arrow" 
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <img src="/images/profile/arrow-left.png" alt="Предыдущая" class="arrow-icon" />
    </button>
    
    <button 
      v-for="page in visiblePages" 
      :key="page"
      class="pagination-btn"
      :class="{ 'pagination-active': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    
    <button 
      class="pagination-btn pagination-arrow" 
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <img src="/images/profile/arrow-right.png" alt="Следующая" class="arrow-icon" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 24
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    visiblePages() {
      const pages = [];
      let maxVisible = 7;
      
      if (window.innerWidth <= 480) {
        maxVisible = 3;
      } else if (window.innerWidth <= 768) {
        maxVisible = 5;
      } else if (window.innerWidth <= 1024) {
        maxVisible = 6;
      }
      
      if (this.totalPages <= maxVisible) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        let start, end;
        
        if (window.innerWidth <= 480) {
          if (this.currentPage === 1) {
            start = 1;
            end = Math.min(3, this.totalPages);
          } else if (this.currentPage === this.totalPages) {
            start = Math.max(this.totalPages - 2, 1);
            end = this.totalPages;
          } else {
            start = Math.max(this.currentPage - 1, 1);
            end = Math.min(this.currentPage + 1, this.totalPages);
          }
        } else {
          const halfVisible = Math.floor(maxVisible / 2);
          start = Math.max(1, this.currentPage - halfVisible);
          end = Math.min(this.totalPages, start + maxVisible - 1);
          
          if (end === this.totalPages) {
            start = Math.max(1, end - maxVisible + 1);
          }
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.$emit('page-change', page);
      }
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.$forceUpdate();
    });
  }
}
</script>

<style scoped>
@import "/src/assets/profile/pagination.css";
</style>