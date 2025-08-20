<!-- src\components\Contest\MobileRatingModal.vue -->

<template>
  <Teleport to="body" v-if="isOpen">
    <div class="mobile-rating-overlay" @click="closeModal">
      <div class="mobile-rating-container" @click.stop>
        <button class="close-btn" @click="closeModal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <div class="stars-grid">
          <button 
            v-for="star in 10" 
            :key="star"
            class="star-btn"
            @click="selectRating(star)"
          >
            <span class="star-number">{{ star }}</span>
            <img 
              :src="(selectedRating >= star) ? '/images/contest/star-active.png' : '/images/contest/star.png'" 
              alt="" 
              class="star-icon"
            >
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'MobileRatingModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  emits: ['close', 'rating-selected'],
  data() {
    return {
      selectedRating: 0
    }
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden';
        this.selectedRating = 0;
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  methods: {
    selectRating(rating) {
      this.selectedRating = rating;
      this.$emit('rating-selected', rating);
      setTimeout(() => {
        this.closeModal();
      }, 300);
    },
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.mobile-rating-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.mobile-rating-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 60px 20px 30px 20px;
  width: 100%;
  max-width: 100%;
  position: relative;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(243, 244, 246, 0.8);
}

.stars-grid {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.star-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-radius: 8px;
  gap: 4px;
}

.star-btn:hover {
  background: rgba(248, 249, 255, 0.8);
  transform: scale(1.1);
}

.star-btn:active {
  transform: scale(0.95);
}

.star-number {
  font-size: 14px;
  font-weight: 600;
  color: #3F3F3F;
  margin-bottom: 2px;
}

.star-icon {
  width: 24px;
  height: 24px;
}

@media (max-width: 480px) {
  .mobile-rating-container {
    padding: 50px 16px 24px 16px;
    margin: 10px;
  }
  
  .close-btn {
    top: 16px;
    right: 16px;
  }
  
  .stars-grid {
    gap: 4px;
  }
  
  .star-btn {
    padding: 6px 4px;
  }
  
  .star-number {
    font-size: 12px;
  }
  
  .star-icon {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 360px) {
  .stars-grid {
    gap: 2px;
  }
  
  .star-btn {
    padding: 4px 2px;
  }
  
  .star-number {
    font-size: 11px;
  }
  
  .star-icon {
    width: 18px;
    height: 18px;
  }
}
</style>