<!-- src\components\Contest\ImageLightbox.vue -->

<template>
  <Teleport to="body" v-if="isOpen">
    <div class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-container" @click.stop>
        <button class="close-btn" @click="closeLightbox">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <img :src="image" :alt="title" class="lightbox-image" />
        
        <div class="image-info">
          <h3 class="image-title">{{ title }}</h3>
          <p class="image-author">{{ author }}</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'ImageLightbox',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      required: true
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
  emits: ['close'],
  mounted() {
    if (this.isOpen) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', this.handleKeyDown);
      } else {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', this.handleKeyDown);
      }
    }
  },
  methods: {
    closeLightbox() {
      this.$emit('close');
    },
    handleKeyDown(event) {
      if (event.key === 'Escape' && this.isOpen) {
        this.closeLightbox();
      }
    }
  }
}
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 40px;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.close-btn {
  position: absolute;
  top: -60px;
  right: -10px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 1;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.lightbox-image {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.8);
}

.image-info {
  margin-top: 30px;
  text-align: center;
  color: white;
  max-width: 100%;
}

.image-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: white;
  line-height: 1.3;
}

.image-author {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

@media (max-width: 768px) {
  .lightbox-overlay {
    padding: 10px;
  }
  
  .close-btn {
    top: -40px;
    width: 36px;
    height: 36px;
  }
  
  .lightbox-image {
    max-height: calc(90vh - 80px);
  }
  
  .image-title {
    font-size: 20px;
  }
  
  .image-author {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .close-btn {
    top: -35px;
    width: 32px;
    height: 32px;
  }
  
  .lightbox-image {
    max-height: calc(90vh - 70px);
  }
  
  .image-title {
    font-size: 18px;
  }
  
  .image-author {
    font-size: 13px;
  }
  
  .image-info {
    margin-top: 15px;
  }
}
</style>