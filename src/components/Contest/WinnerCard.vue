<!-- src\components\Contest\WinnerCard.vue -->

<template>
  <div class="participant-card">
    <div class="card-image">
      <img :src="participant.image" :alt="participant.title" />
      <div class="card-actions">
        <button class="action-btn expand-btn" @click="openLightbox">
          <img src="/images/contest/maximize.png" alt="" class="action-icon">
        </button>
        <button class="action-btn like-btn" @click="toggleLike">
          <img 
            :src="isLiked ? '/images/contest/heart-active.png' : '/images/contest/heart.png'" 
            alt="" 
            class="action-icon"
          >
        </button>
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">{{ participant.title }}</h3>
      <div class="card-price">{{ formatPrice(participant.price) }} ₽</div>
      <div class="card-author">
        <span class="author-name">{{ participant.author }}</span>
        <img :src="participant.countryFlag" :alt="participant.country" class="country-flag">
      </div>
      
      <div class="place-btn">
        {{ getPlaceText(participant.place) }}
      </div>
    </div>

    <ImageLightbox 
      :is-open="lightboxOpen"
      :image="participant.image"
      :title="participant.title"
      :author="participant.author"
      @close="closeLightbox"
    />
  </div>
</template>

<script>
import ImageLightbox from './ImageLightbox.vue'

export default {
  name: 'WinnerCard',
  components: {
    ImageLightbox
  },
  props: {
    participant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLiked: this.participant.isLiked,
      lightboxOpen: false
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU').format(price)
    },
    toggleLike() {
      this.isLiked = !this.isLiked
    },
    openLightbox() {
      this.lightboxOpen = true
    },
    closeLightbox() {
      this.lightboxOpen = false
    },
    getPlaceText(place) {
      if (place === 1) return '1-е место'
      if (place === 2) return '2-е место'
      if (place === 3) return '3-е место'
      return `${place}-е место`
    }
  }
}
</script>

<style scoped>
.participant-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.participant-card:hover {
  transform: translateY(-2px);
}

.card-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: white;
}

.card-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.card-actions {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
}

.action-btn {
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 6px;
  background: #3f3f3f7d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #2a2a2a;
}

.action-icon {
  width: 18px;
  height: 18px;
}

.card-content {
  padding: 16px 0 0 0;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-price {
  font-size: 18px;
  font-weight: 700;
  color: #5856D2;
  margin: 0 0 8px 0;
}

.card-author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.author-name {
  font-size: 12px;
  color: #3F3F3F;
  text-decoration: underline;
  cursor: pointer;
}

.author-name:hover {
  color: #5856D2;
}

.country-flag {
  width: 24px;
  height: 16px;
  border-radius: 2px;
  object-fit: cover;
}

.place-btn {
  width: 100%;
  background: #FFD700;
  color: #8B4513;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  pointer-events: none;
}

@media (max-width: 480px) {
  .card-content {
    padding: 12px 0 0 0;
  }
  
  .card-title {
    font-size: 14px;
  }
  
  .card-price {
    font-size: 16px;
  }
  
  .place-btn {
    padding: 10px;
    font-size: 13px;
  }
}
</style>