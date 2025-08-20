<!-- src\components\Contest\Pagination.vue -->

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
     default: 20
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
.pagination {
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 8px;
 margin-top: 40px;
 margin-bottom: 40px;
 flex-wrap: wrap;
}

.pagination-btn {
 width: 44px;
 height: 44px;
 border: none;
 border-radius: 50%;
 background: #F8F8FC;
 color: #9F9F9F;
 font-size: 16px;
 font-weight: 500;
 cursor: pointer;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: all 0.2s ease;
 flex-shrink: 0;
 min-width: 44px;
}

.pagination-btn:hover:not(:disabled):not(.pagination-active) {
 background: #EDEDFA;
 color: #5856D2;
 transform: scale(1.05);
}

.pagination-btn:disabled {
 opacity: 0.4;
 cursor: not-allowed;
}

.pagination-btn:disabled:hover {
 transform: none;
}

.pagination-active {
 background: #5856D2;
 color: #FFFFFF;
 font-weight: 600;
}

.pagination-active:hover {
 background: #4845B8;
 transform: scale(1.05);
}

.pagination-arrow {
 background: #FFFFFF;
 border: 1px solid #ECECEC;
}

.pagination-arrow:hover:not(:disabled) {
 background: #F8F8FC;
 border-color: #5856D2;
 transform: scale(1.05);
}

.arrow-icon {
 width: 16px;
 height: 16px;
}

@media (max-width: 1200px) {
 .pagination {
   gap: 6px;
   margin-top: 36px;
   margin-bottom: 36px;
 }

 .pagination-btn {
   width: 42px;
   height: 42px;
   min-width: 42px;
   font-size: 15px;
 }

 .arrow-icon {
   width: 15px;
   height: 15px;
 }
}

@media (max-width: 1024px) {
 .pagination {
   gap: 6px;
   margin-top: 32px;
   margin-bottom: 32px;
 }

 .pagination-btn {
   width: 40px;
   height: 40px;
   min-width: 40px;
   font-size: 14px;
 }

 .arrow-icon {
   width: 14px;
   height: 14px;
 }
}

@media (max-width: 768px) {
 .pagination {
   gap: 5px;
   margin-top: 28px;
   margin-bottom: 28px;
 }

 .pagination-btn {
   width: 38px;
   height: 38px;
   min-width: 38px;
   font-size: 14px;
 }

 .arrow-icon {
   width: 13px;
   height: 13px;
 }
}

@media (max-width: 480px) {
 .pagination {
   gap: 4px;
   margin-top: 24px;
   margin-bottom: 24px;
   line-height: 1.2;
 }

 .pagination-btn {
   width: 36px;
   height: 36px;
   min-width: 36px;
   font-size: 13px;
 }

 .arrow-icon {
   width: 12px;
   height: 12px;
 }
}

@media (max-width: 400px) {
 .pagination {
   gap: 3px;
   margin-top: 20px;
   margin-bottom: 20px;
 }

 .pagination-btn {
   width: 34px;
   height: 34px;
   min-width: 34px;
   font-size: 12px;
 }

 .arrow-icon {
   width: 11px;
   height: 11px;
 }
}

@media (max-width: 320px) {
 .pagination {
   gap: 2px;
   margin-top: 18px;
   margin-bottom: 18px;
 }

 .pagination-btn {
   width: 32px;
   height: 32px;
   min-width: 32px;
   font-size: 12px;
 }

 .arrow-icon {
   width: 10px;
   height: 10px;
 }
}

@media (min-width: 1920px) {
 .pagination {
   gap: 10px;
   margin-top: 50px;
   margin-bottom: 50px;
 }

 .pagination-btn {
   width: 48px;
   height: 48px;
   min-width: 48px;
   font-size: 18px;
 }

 .arrow-icon {
   width: 18px;
   height: 18px;
 }
}
</style>