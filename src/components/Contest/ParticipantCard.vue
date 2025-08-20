<!-- src\components\Contest\ParticipantCard.vue -->

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
            :src="isLiked ? '/images/contest/like-active.png' : '/images/contest/like.png'" 
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
      
      <div v-if="showRating" class="votes-container">
        <div class="votes-section">
          <span class="votes-count">Голосов <span class="voutes-count-number"> {{ formatNumber(userVotes) }}</span></span>
          <div class="rating">
            <img src="/images/contest/star-active.png" alt="" class="star-icon">
            <span class="rating-value">{{ userRating }}</span>
          </div>
        </div>
      </div>
      
      <div v-else-if="showStars && !isMobile" class="rating-container">
        <div class="stars-rating">
          <button 
            v-for="star in 10" 
            :key="star"
            class="star-btn"
            :class="{ 'no-hover': lightboxOpen }"
            @click="selectRating(star)"
            @mouseenter="!lightboxOpen && (hoveredRating = star)"
            @mouseleave="!lightboxOpen && (hoveredRating = 0)"
          >
            <img 
              :src="(hoveredRating >= star || selectedRating >= star) ? '/images/contest/star-active.png' : '/images/contest/star.png'" 
              alt="" 
              class="star-icon"
            >
          </button>
        </div>
      </div>
      
      <button v-else class="vote-btn" @click="startVoting">
        Голосовать за работу
      </button>
    </div>

    <ImageLightbox 
      :is-open="lightboxOpen"
      :image="participant.image"
      :title="participant.title"
      :author="participant.author"
      @close="closeLightbox"
    />

    <MobileRatingModal
      :is-open="mobileRatingOpen"
      :title="participant.title"
      :author="participant.author"
      @close="closeMobileRating"
      @rating-selected="handleMobileRating"
    />
  </div>
</template>

<script>
import ImageLightbox from './ImageLightbox.vue'
import MobileRatingModal from './MobileRatingModal.vue'

export default {
  name: 'ParticipantCard',
  components: {
    ImageLightbox,
    MobileRatingModal
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
      showStars: false,
      showRating: false,
      selectedRating: 0,
      hoveredRating: 0,
      userVotes: 12,
      userRating: 4.7,
      lightboxOpen: false,
      mobileRatingOpen: false
    }
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 480;
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('ru-RU').format(price)
    },
    formatNumber(number) {
      return new Intl.NumberFormat('ru-RU').format(number)
    },
    toggleLike() {
      this.isLiked = !this.isLiked
    },
    startVoting() {
      if (this.isMobile) {
        this.mobileRatingOpen = true;
      } else {
        this.showStars = true;
      }
    },
    selectRating(rating) {
      if (this.lightboxOpen) return;
      
      this.selectedRating = rating
      this.userRating = (rating / 2).toFixed(1)
      
      setTimeout(() => {
        this.showStars = false
        this.showRating = true
      }, 500)
    },
    handleMobileRating(rating) {
      this.selectedRating = rating;
      this.userRating = (rating / 2).toFixed(1);
      this.showRating = true;
    },
    closeMobileRating() {
      this.mobileRatingOpen = false;
    },
    openLightbox() {
      this.lightboxOpen = true
    },
    closeLightbox() {
      this.lightboxOpen = false
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

.like-btn {
  padding: 2px;
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

.vote-btn {
  width: 100%;
  background: #F3F3FF;
  color: #5856D2;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.vote-btn:hover {
  background: #5856eb;
  color: white
}

.rating-container {
  width: 100%;
  padding: 0 16px;
}

.stars-rating {
  display: flex;
  justify-content: center;
  gap: 2px;
  padding: 8px 0;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  padding: 2px;
  border-radius: 4px;
}

.star-btn:hover {
  transform: scale(1.1);
}

.star-btn.no-hover:hover {
  transform: none;
}

.star-icon {
  width: 16px;
  height: 16px;
  transition: all 0.2s;
}

.votes-container {
  width: calc(100% - 12px);
  margin: 0 auto;
}

.votes-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ECECEC;
  border-radius: 12px;
  padding: 12px 16px;
  background: white;
}

.votes-count {
  font-size: 13px;
  color: #9F9F9F;
  font-weight: 600;
}

.voutes-count-number {
  color: #3F3F3F;
  font-weight: 600;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating .star-icon {
  width: 16px;
  height: 16px;
}

.rating-value {
  font-size: 14px;
  font-weight: 700;
  margin-top: 3px;
  color: #3F3F3F;
}

@media (max-width: 550px) {
  .star-icon {
    width: 14px;
    height: 14px;
  }
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
  
  .vote-btn {
    padding: 10px;
    font-size: 13px;
  }
  
  .votes-section {
    padding: 10px 12px;
  }
  
  .votes-count,
  .rating-value {
    font-size: 13px;
  }
  
  .star-icon {
    width: 12px;
    height: 12px;
  }
  
  .rating .star-icon {
    width: 14px;
    height: 14px;
  }
  
  .rating-container {
    padding: 0 12px;
  }
  
  .stars-rating {
    gap: 1px;
  }
}
</style>