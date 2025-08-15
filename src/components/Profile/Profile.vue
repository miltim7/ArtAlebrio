<!-- src\components\Profile\Profile.vue -->

<template>
  <section class="breadcrumb-section">
    <div class="breadcrumb-container">
      <nav class="breadcrumb" aria-label="Навигация по разделам">
        <a href="#" class="breadcrumb-link" aria-label="Перейти на главную страницу">Главная</a>
        <span class="breadcrumb-separator" aria-hidden="true">››</span>
        <a href="#" class="breadcrumb-link" aria-label="Перейти к разделу авторов">Авторы</a>
        <span class="breadcrumb-separator" aria-hidden="true">››</span>
        <span class="breadcrumb-current" aria-current="page">{{ authorName }}</span>
      </nav>
    </div>
  </section>
  <div class="profile-container">
    <div class="profile-header">
      <div class="avatar">
        <img class="avatar-icon" src="/images/profile/avatar.png" alt="Аватар профиля" />
      </div>
    </div>
    
    <div class="profile-content">
      <div class="profile-left">
        <div class="profile-info">
          <div class="profile-main-info">
            <div class="profile-left-info">
              <h1 class="profile-name">Anthony Short</h1>
              <h2 class="profile-title">Кабулова-Веприски</h2>
            </div>
            <div class="profile-right-info">
              <p class="profile-location">
                <img src="/images/profile/map-pin.png" alt="Локация" class="location-icon" />
                Нидерланды, Нижневартовск
              </p>
              <div class="profile-stats-mobile">
                <div class="rating">
                  <img src="/images/profile/star.png" alt="Рейтинг" class="star-icon" />
                  <span class="rating-value">4.7</span>
                  <span class="rating-count">325</span>
                </div>
                <div class="sales">
                  <span class="sales-label">Продаж</span>
                  <span class="sales-count">634</span>
                </div>
                <p class="profile-experience-mobile">12 лет на Alebrio</p>
              </div>
            </div>
          </div>
          
          <div class="profile-stats">
            <div class="rating">
              <img src="/images/profile/star.png" alt="Рейтинг" class="star-icon" />
              <span class="rating-value">4.7</span>
              <span class="rating-count">325</span>
            </div>
            <div class="sales">
              <span class="sales-label">Продаж</span>
              <span class="sales-count">634</span>
            </div>
          </div>
          
          <p class="profile-experience">12 лет на Alebrio</p>
          
          <div class="followers-social-row">
            <div class="followers-stats">
              <div class="followers">
                <span class="followers-label">Подписчики</span>
                <span class="followers-count">45</span>
              </div>
              <div class="following">
                <span class="following-label">Подписки</span>
                <span class="following-count">634</span>
              </div>
            </div>
            
            <div class="social-links">
              <a href="#" class="social-link">
                <img src="/images/profile/telegramm.png" alt="Telegram" />
              </a>
              <a href="#" class="social-link">
                <img src="/images/profile/facebook.png" alt="Facebook" />
              </a>
              <a href="#" class="social-link">
                <img src="/images/profile/watsapp.png" alt="WhatsApp" />
              </a>
              <a href="#" class="social-link">
                <img src="/images/profile/instagramm.png" alt="Instagram" />
              </a>
              <a href="#" class="social-link">
                <img src="/images/profile/youtube.png" alt="YouTube" />
              </a>
            </div>
          </div>
          
          <div class="action-buttons-mobile">
            <button class="connect-btn">
              <img src="/images/profile/chat.png" alt="Чат" class="chat-icon" />
              Связаться
            </button>
            <button class="subscribe-btn">Подписаться</button>
            <button class="share-btn">
              Поделиться 
              <img src="/images/profile/share.png" alt="Поделиться" class="share-icon" />
            </button>
          </div>
          
          <button class="connect-btn connect-btn-desktop">
            <img src="/images/profile/chat.png" alt="Чат" class="chat-icon" />
            Связаться
          </button>
          
          <div class="action-buttons action-buttons-desktop">
            <button class="subscribe-btn">Подписаться</button>
            <button class="share-btn">
              Поделиться 
              <img src="/images/profile/share.png" alt="Поделиться" class="share-icon" />
            </button>
          </div>
          
          <div class="shop-section">
            <div class="shop-tabs-container">
              <div class="shop-tabs">
                <div class="shop-tab">
                  <span class="shop-title">О магазине</span>
                </div>
                
                <div class="shop-tab shop-category-mobile" @click="setActiveSection('goods')">
                  <div class="category-info">
                    <span class="category-title" :class="{ active: activeSection === 'goods' }">Товары</span>
                    <span class="category-count" :class="{ active: activeSection === 'goods' }">567</span>
                  </div>
                </div>
                
                <div class="shop-tab shop-item" @click="setActiveSection('reviews')">
                  <div class="item-info">
                    <span class="item-title" :class="{ active: activeSection === 'reviews' }">Отзывы</span>
                    <span class="item-count" :class="{ active: activeSection === 'reviews' }">12</span>
                  </div>
                </div>
                
                <div class="shop-tab shop-item" @click="setActiveSection('payment')">
                  <span class="item-title" :class="{ active: activeSection === 'payment' }">Оплата и доставка</span>
                </div>
                
                <div class="shop-tab shop-item" @click="setActiveSection('custom')">
                  <span class="item-title" :class="{ active: activeSection === 'custom' }">Персональный заказ</span>
                </div>
                
                <div class="shop-tab shop-item" @click="setActiveSection('awards')">
                  <div class="item-info">
                    <span class="item-title" :class="{ active: activeSection === 'awards' }">Награды</span>
                    <span class="item-count" :class="{ active: activeSection === 'awards' }">67</span>
                  </div>
                </div>
                
                <div class="shop-tab shop-item" @click="setActiveSection('blog')">
                  <div class="item-info">
                    <span class="item-title" :class="{ active: activeSection === 'blog' }">Блог</span>
                    <span class="item-count" :class="{ active: activeSection === 'blog' }">456</span>
                  </div>
                </div>
                
                <div class="shop-tab shop-item" @click="setActiveSection('exhibitions')">
                  <div class="item-info">
                    <span class="item-title" :class="{ active: activeSection === 'exhibitions' }">Выставки</span>
                    <span class="item-count" :class="{ active: activeSection === 'exhibitions' }">78</span>
                  </div>
                </div>
                
                <div class="shop-tab shop-item" @click="setActiveSection('events')">
                  <div class="item-info">
                    <span class="item-title" :class="{ active: activeSection === 'events' }">Мероприятия</span>
                    <span class="item-count" :class="{ active: activeSection === 'events' }">179</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="shop-content-desktop">
              <h3 class="shop-title">О магазине</h3>
              
              <div class="shop-category" @click="toggleGoods">
                <div class="category-info">
                  <span class="category-title" :class="{ active: activeSection === 'goods' }">Товары</span>
                  <span class="category-count" :class="{ active: activeSection === 'goods' }">567</span>
                </div>
                <img 
                  src="/images/profile/arrow.png" 
                  alt="Стрелка" 
                  class="category-arrow"
                  :class="{ 'arrow-up': isGoodsOpen }"
                />
              </div>
              <div class="subcategories" :class="{ 'subcategories-open': isGoodsOpen }">
                <p>Абстракция</p>
                <p>Макароны с сыром</p>
                <p>Шапки и кепки</p>
              </div>
              
              <div class="shop-item" @click="setActiveSection('reviews')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'reviews' }">Отзывы</span>
                  <span class="item-count" :class="{ active: activeSection === 'reviews' }">12</span>
                </div>
              </div>
              
              <div class="shop-item" @click="setActiveSection('payment')">
                <span class="item-title" :class="{ active: activeSection === 'payment' }">Оплата и доставка</span>
              </div>
              
              <div class="shop-item" @click="setActiveSection('custom')">
                <span class="item-title" :class="{ active: activeSection === 'custom' }">Персональный заказ</span>
              </div>
              
              <div class="shop-item" @click="setActiveSection('awards')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'awards' }">Награды</span>
                  <span class="item-count" :class="{ active: activeSection === 'awards' }">67</span>
                </div>
              </div>
              
              <div class="separator"></div>
              
              <div class="shop-item" @click="setActiveSection('blog')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'blog' }">Блог</span>
                  <span class="item-count" :class="{ active: activeSection === 'blog' }">456</span>
                </div>
              </div>
              
              <div class="separator"></div>
              
              <div class="shop-item" @click="setActiveSection('exhibitions')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'exhibitions' }">Выставки</span>
                  <span class="item-count" :class="{ active: activeSection === 'exhibitions' }">78</span>
                </div>
              </div>
              
              <div class="separator"></div>
              
              <div class="shop-item" @click="setActiveSection('events')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'events' }">Мероприятия</span>
                  <span class="item-count" :class="{ active: activeSection === 'events' }">179</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    authorName: {
      type: String,
      default: 'Елена Смирнова'
    }
  },
  data() {
    return {
      isGoodsOpen: true,
      activeSection: 'goods'
    }
  },
  methods: {
    toggleGoods() {
      this.isGoodsOpen = !this.isGoodsOpen;
      this.activeSection = 'goods';
    },
    setActiveSection(section) {
      this.activeSection = section;
    }
  }
}
</script>

<style scoped>
@import "/src/assets/profile/profile.css";
@import "/src/assets/breadcrumb.css";
</style>