<!-- src\components\Profile\Profile.vue -->

<template>
  <section class="breadcrumb-section">
    <div class="breadcrumb-container">
      <nav class="breadcrumb" aria-label="Навигация по разделам">
        <a href="#" class="breadcrumb-link" aria-label="Перейти на главную страницу"
          >Главная</a
        >
        <span class="breadcrumb-separator" aria-hidden="true">››</span>
        <a href="#" class="breadcrumb-link" aria-label="Перейти к разделу авторов"
          >Авторы</a
        >
        <span class="breadcrumb-separator" aria-hidden="true">››</span>
        <span class="breadcrumb-current" aria-current="page">{{ authorName }}</span>
      </nav>
    </div>
  </section>

  <div class="profile-container">
    <!-- Мобильная структура для <480px -->
    <div class="profile-mobile-tiny">
      <div class="mobile-tiny-header">
        <div class="mobile-tiny-avatar">
          <img
            class="avatar-icon"
            src="/images/profile/avatar.png"
            alt="Аватар профиля"
          />
        </div>
        <div class="mobile-tiny-info">
          <h1 class="profile-name">Anthony Short</h1>
          <h2 class="profile-title">Кабулова-Веприски</h2>
          <p class="profile-location">
            <img src="/images/profile/map-pin.png" alt="Локация" class="location-icon" />
            Россия, Краснодар
          </p>
        </div>
      </div>

      <div class="mobile-tiny-stats">
        <div class="rating">
          <img src="/images/profile/star.png" alt="Рейтинг" class="star-icon" />
          <span class="rating-value">4.7</span>
          <span class="rating-count">(325)</span>
        </div>
        <div class="sales">
          <span class="sales-label">Продаж</span>
          <span class="sales-count">(634)</span>
        </div>
        <p class="profile-experience-tiny">12 лет на Alebrio</p>
      </div>

      <div class="mobile-tiny-social">
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

      <div class="mobile-tiny-followers">
        <div class="followers-item">
          <span class="followers-label">Подписчики</span>
          <span class="followers-count">45</span>
        </div>
        <div class="followers-separator">|</div>
        <div class="following-item">
          <span class="following-label">Подписки</span>
          <span class="following-count">634</span>
        </div>
      </div>

      <div class="mobile-tiny-buttons">
        <button class="connect-btn-tiny">
          <img src="/images/profile/chat.png" alt="Чат" class="chat-icon" />
          Связаться
        </button>
        <button class="subscribe-btn-tiny">
          <img
            src="/images/profile/subscribe-plus.png"
            alt="Подписаться"
            class="subscribe-plus-icon"
          />
        </button>
        <button class="share-btn-tiny">
          <img src="/images/profile/share.png" alt="Поделиться" class="share-icon" />
        </button>
      </div>

      <div class="mobile-tiny-details">
        <button class="details-btn" @click="toggleDetails">
          Подробнее
          <img
            src="/images/profile/select-arrow.png"
            alt="Стрелка"
            class="details-arrow"
            :class="{ 'arrow-up': isDetailsOpen }"
          />
        </button>
        <div class="details-content" :class="{ 'details-open': isDetailsOpen }">
          <div class="shop-category" @click="toggleGoods">
            <div class="category-info">
              <span class="category-title" :class="{ active: isGoodsActive }"
                >Товары</span
              >
              <span class="category-count" :class="{ active: isGoodsActive }">567</span>
            </div>
            <img
              src="/images/profile/arrow.png"
              alt="Стрелка"
              class="goods-arrow"
              :class="{ 'arrow-up': isGoodsOpen }"
            />
          </div>
          <div class="goods-subcategories" :class="{ 'subcategories-open': isGoodsOpen }">
            <p
              @click="setActiveSection('abstraction')"
              :class="{ active: activeSection === 'abstraction' }"
            >
              Абстракция
            </p>
            <p
              @click="setActiveSection('pasta')"
              :class="{ active: activeSection === 'pasta' }"
            >
              Макароны с сыром
            </p>
            <p
              @click="setActiveSection('hats')"
              :class="{ active: activeSection === 'hats' }"
            >
              Шапки и кепки
            </p>
          </div>

          <div class="shop-item" @click="setActiveSection('reviews')">
            <div class="item-info">
              <span class="item-title" :class="{ active: activeSection === 'reviews' }"
                >Отзывы</span
              >
              <span class="item-count" :class="{ active: activeSection === 'reviews' }"
                >12</span
              >
            </div>
          </div>

          <div class="shop-item" @click="setActiveSection('payment')">
            <span class="item-title" :class="{ active: activeSection === 'payment' }"
              >Оплата и доставка</span
            >
          </div>

          <div class="shop-item" @click="setActiveSection('custom')">
            <span class="item-title" :class="{ active: activeSection === 'custom' }"
              >Персональный заказ</span
            >
          </div>

          <div class="shop-item" @click="setActiveSection('awards')">
            <div class="item-info">
              <span class="item-title" :class="{ active: activeSection === 'awards' }"
                >Награды</span
              >
              <span class="item-count" :class="{ active: activeSection === 'awards' }"
                >67</span
              >
            </div>
          </div>

          <div class="shop-item" @click="setActiveSection('blog')">
            <div class="item-info">
              <span class="item-title" :class="{ active: activeSection === 'blog' }"
                >Блог</span
              >
              <span class="item-count" :class="{ active: activeSection === 'blog' }"
                >456</span
              >
            </div>
          </div>

          <div class="shop-item" @click="setActiveSection('exhibitions')">
            <div class="item-info">
              <span
                class="item-title"
                :class="{ active: activeSection === 'exhibitions' }"
                >Выставки</span
              >
              <span
                class="item-count"
                :class="{ active: activeSection === 'exhibitions' }"
                >78</span
              >
            </div>
          </div>

          <div class="shop-item" @click="setActiveSection('events')">
            <div class="item-info">
              <span class="item-title" :class="{ active: activeSection === 'events' }"
                >Мероприятия</span
              >
              <span class="item-count" :class="{ active: activeSection === 'events' }"
                >179</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shop-header-mobile">
      <ShopHeader
        v-if="activeSection === 'goods' || ['abstraction', 'pasta', 'hats'].includes(activeSection)"
        :totalProducts="totalProducts"
        @sort-change="handleSortChange"
        @per-page-change="handlePerPageChange"
        @category-change="handleCategoryChange"
        @collection-change="handleCollectionChange"
        @search-change="handleSearchChange"
      />
    </div>

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
                <img
                  src="/images/profile/map-pin.png"
                  alt="Локация"
                  class="location-icon"
                />
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
                <div 
                  class="shop-tab"
                  :class="{ active: activeSection === 'about' }"
                  @click="setActiveSection('about')"
                >
                  <span 
                    class="shop-title"
                    :class="{ active: activeSection === 'about' }"
                  >О магазине</span>
                </div>

                <div
                  class="shop-tab shop-category-mobile"
                  :class="{ active: isGoodsActive }"
                  @click="setActiveSection('goods')"
                >
                  <div class="category-info">
                    <span class="category-title" :class="{ active: isGoodsActive }"
                      >Товары</span
                    >
                    <span class="category-count" :class="{ active: isGoodsActive }"
                      >567</span
                    >
                  </div>
                </div>

                <div
                  class="shop-tab shop-item"
                  :class="{ active: activeSection === 'reviews' }"
                  @click="setActiveSection('reviews')"
                >
                  <div class="item-info">
                    <span
                      class="item-title"
                      :class="{ active: activeSection === 'reviews' }"
                      >Отзывы</span
                    >
                    <span
                      class="item-count"
                      :class="{ active: activeSection === 'reviews' }"
                      >12</span
                    >
                  </div>
                </div>

                <div
                  class="shop-tab shop-item"
                  :class="{ active: activeSection === 'payment' }"
                  @click="setActiveSection('payment')"
                >
                  <span
                    class="item-title"
                    :class="{ active: activeSection === 'payment' }"
                    >Оплата и доставка</span
                  >
                </div>

                <div
                  class="shop-tab shop-item"
                  :class="{ active: activeSection === 'custom' }"
                  @click="setActiveSection('custom')"
                >
                  <span class="item-title" :class="{ active: activeSection === 'custom' }"
                    >Персональный заказ</span
                  >
                </div>

                <div
                  class="shop-tab shop-item"
                  :class="{ active: activeSection === 'awards' }"
                  @click="setActiveSection('awards')"
                >
                  <div class="item-info">
                    <span
                      class="item-title"
                      :class="{ active: activeSection === 'awards' }"
                      >Награды</span
                    >
                    <span
                      class="item-count"
                      :class="{ active: activeSection === 'awards' }"
                      >67</span
                    >
                  </div>
                </div>

                <div
                  class="shop-tab shop-item"
                  :class="{ active: activeSection === 'blog' }"
                  @click="setActiveSection('blog')"
                >
                  <div class="item-info">
                    <span class="item-title" :class="{ active: activeSection === 'blog' }"
                      >Блог</span
                    >
                    <span class="item-count" :class="{ active: activeSection === 'blog' }"
                      >456</span
                    >
                  </div>
                </div>

                <div
                  class="shop-tab shop-item"
                  :class="{ active: activeSection === 'exhibitions' }"
                  @click="setActiveSection('exhibitions')"
                >
                  <div class="item-info">
                    <span
                      class="item-title"
                      :class="{ active: activeSection === 'exhibitions' }"
                      >Выставки</span
                    >
                    <span
                      class="item-count"
                      :class="{ active: activeSection === 'exhibitions' }"
                      >78</span
                    >
                  </div>
                </div>

                <div
                  class="shop-tab shop-item"
                  :class="{ active: activeSection === 'events' }"
                  @click="setActiveSection('events')"
                >
                  <div class="item-info">
                    <span
                      class="item-title"
                      :class="{ active: activeSection === 'events' }"
                      >Мероприятия</span
                    >
                    <span
                      class="item-count"
                      :class="{ active: activeSection === 'events' }"
                      >179</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="shop-content-desktop">
              <h3 
                class="shop-title clickable-title"
                :class="{ active: activeSection === 'about' }"
                @click="setActiveSection('about')"
              >О магазине</h3>

              <div class="shop-category" @click="toggleGoods">
                <div class="category-info">
                  <span class="category-title" :class="{ active: isGoodsActive }"
                    >Товары</span
                  >
                  <span class="category-count" :class="{ active: isGoodsActive }"
                    >567</span
                  >
                </div>
                <img
                  src="/images/profile/arrow.png"
                  alt="Стрелка"
                  class="category-arrow"
                  :class="{ 'arrow-up': isGoodsOpen }"
                />
              </div>
              <div class="subcategories" :class="{ 'subcategories-open': isGoodsOpen }">
                <p
                  @click="setActiveSection('abstraction')"
                  :class="{ active: activeSection === 'abstraction' }"
                >
                  Абстракция
                </p>
                <p
                  @click="setActiveSection('pasta')"
                  :class="{ active: activeSection === 'pasta' }"
                >
                  Макароны с сыром
                </p>
                <p
                  @click="setActiveSection('hats')"
                  :class="{ active: activeSection === 'hats' }"
                >
                  Шапки и кепки
                </p>
              </div>

              <div class="shop-item" @click="setActiveSection('reviews')">
                <div class="item-info">
                  <span
                    class="item-title"
                    :class="{ active: activeSection === 'reviews' }"
                    >Отзывы</span
                  >
                  <span
                    class="item-count"
                    :class="{ active: activeSection === 'reviews' }"
                    >12</span
                  >
                </div>
              </div>

              <div class="shop-item" @click="setActiveSection('payment')">
                <span class="item-title" :class="{ active: activeSection === 'payment' }"
                  >Оплата и доставка</span
                >
              </div>

              <div class="shop-item" @click="setActiveSection('custom')">
                <span class="item-title" :class="{ active: activeSection === 'custom' }"
                  >Персональный заказ</span
                >
              </div>

              <div class="shop-item" @click="setActiveSection('awards')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'awards' }"
                    >Награды</span
                  >
                  <span class="item-count" :class="{ active: activeSection === 'awards' }"
                    >67</span
                  >
                </div>
              </div>

              <div class="separator"></div>

              <div class="shop-item" @click="setActiveSection('blog')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'blog' }"
                    >Блог</span
                  >
                  <span class="item-count" :class="{ active: activeSection === 'blog' }"
                    >456</span
                  >
                </div>
              </div>

              <div class="separator"></div>

              <div class="shop-item" @click="setActiveSection('exhibitions')">
                <div class="item-info">
                  <span
                    class="item-title"
                    :class="{ active: activeSection === 'exhibitions' }"
                    >Выставки</span
                  >
                  <span
                    class="item-count"
                    :class="{ active: activeSection === 'exhibitions' }"
                    >78</span
                  >
                </div>
              </div>

              <div class="separator"></div>

              <div class="shop-item" @click="setActiveSection('events')">
                <div class="item-info">
                  <span class="item-title" :class="{ active: activeSection === 'events' }"
                    >Мероприятия</span
                  >
                  <span class="item-count" :class="{ active: activeSection === 'events' }"
                    >179</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-right">
        <ShopHeader
          v-if="activeSection === 'goods' || ['abstraction', 'pasta', 'hats'].includes(activeSection)"
          :totalProducts="filteredProducts.length"
          @sort-change="handleSortChange"
          @per-page-change="handlePerPageChange"
          @category-change="handleCategoryChange"
          @collection-change="handleCollectionChange"
          @search-change="handleSearchChange"
        />

        <component :is="currentComponent" 
          :products="filteredProducts"
          :items-per-page="currentPageSize"
          @toggle-favorite="handleToggleFavorite"
          @add-to-cart="handleAddToCart"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from "./ShopHeader.vue";
import ProductGrid from "./ProductGrid.vue";
import AboutShopContent from "./content/AboutShopContent.vue";
import ReviewsContent from "./content/ReviewsContent.vue";
import PaymentContent from "./content/PaymentContent.vue";
import CustomOrderContent from "./content/CustomOrderContent.vue";
import AwardsContent from "./content/AwardsContent.vue";
import BlogContent from "./content/BlogContent.vue";
import ExhibitionsContent from "./content/ExhibitionsContent.vue";
import EventsContent from "./content/EventsContent.vue";

export default {
  name: "Profile",
  components: {
    ShopHeader,
    ProductGrid,
    AboutShopContent,
    ReviewsContent,
    PaymentContent,
    CustomOrderContent,
    AwardsContent,
    BlogContent,
    ExhibitionsContent,
    EventsContent,
  },
  props: {
    authorName: {
      type: String,
      default: "Елена Смирнова",
    },
  },
  data() {
    return {
      isGoodsOpen: true,
      activeSection: "goods",
      isDetailsOpen: false,
      shopFilters: {
        sort: "default",
        perPage: "20",
        category: "all",
        collection: "all",
        search: "",
      },
      totalProducts: 456,
      allProducts: this.generateProducts(150),
    };
  },
  computed: {
    isGoodsActive() {
      return ["goods", "abstraction", "pasta", "hats"].includes(this.activeSection);
    },
    filteredProducts() {
      let products = [...this.allProducts];

      if (this.shopFilters.search.trim()) {
        const searchTerm = this.shopFilters.search.toLowerCase().trim();
        products = products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
      }

      if (this.shopFilters.category !== "all") {
        products = products.filter(
          (product) => product.category === this.shopFilters.category
        );
      }

      if (
        this.activeSection !== "goods" &&
        ["abstraction", "pasta", "hats"].includes(this.activeSection)
      ) {
        products = products.filter((product) => product.category === this.activeSection);
      }

      if (this.shopFilters.collection !== "all") {
        switch (this.shopFilters.collection) {
          case "bestsellers":
            products = products.filter((product) => product.isHit);
            break;
          case "new":
            products = products.filter((product) => product.isNew);
            break;
          case "discounted":
            products = products.filter((product) => product.discount > 0);
            break;
          case "featured":
            products = products.filter((product) => product.isFeatured);
            break;
        }
      }

      switch (this.shopFilters.sort) {
        case "price-asc":
          products.sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case "price-desc":
          products.sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case "name-asc":
          products.sort((a, b) => a.title.localeCompare(b.title, "ru"));
          break;
        case "name-desc":
          products.sort((a, b) => b.title.localeCompare(a.title, "ru"));
          break;
        case "date-new":
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "date-old":
          products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default:
          products.sort((a, b) => b.isHit - a.isHit || b.isFeatured - a.isFeatured);
      }

      return products;
    },
    currentPageSize() {
      return parseInt(this.shopFilters.perPage);
    },
    currentComponent() {
      const componentMap = {
        about: "AboutShopContent",
        goods: "ProductGrid",
        abstraction: "ProductGrid",
        pasta: "ProductGrid",
        hats: "ProductGrid",
        reviews: "ReviewsContent",
        payment: "PaymentContent",
        custom: "CustomOrderContent",
        awards: "AwardsContent",
        blog: "BlogContent",
        exhibitions: "ExhibitionsContent",
        events: "EventsContent",
      };
      return componentMap[this.activeSection] || "AboutShopContent";
    },
  },
  methods: {
    generateProducts(count) {
      const products = [];
      const images = [
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=400&fit=crop",
      ];

      const categories = ["abstraction", "pasta", "hats"];
      const categoryNames = {
        abstraction: "Абстракция",
        pasta: "Макароны с сыром",
        hats: "Шапки и кепки",
      };

      const titles = [
        "Матрешка белая классическая",
        "Набор для кухни премиум",
        "Декоративная тарелка винтаж",
        "Подарочный набор делюкс",
        "Керамическая посуда ручной работы",
        "Текстильные изделия эко",
        "Деревянные игрушки натуральные",
        "Сувениры народные расписные",
        "Украшения этнические уникальные",
        "Предметы интерьера стильные",
      ];

      for (let i = 1; i <= count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const basePrice = Math.floor(Math.random() * 200000) + 10000;
        const hasDiscount = Math.random() > 0.4;
        const discountPercent = hasDiscount
          ? [10, 20, 30, 40, 50][Math.floor(Math.random() * 5)]
          : 0;
        const currentPrice = hasDiscount
          ? Math.floor(basePrice * (1 - discountPercent / 100))
          : basePrice;

        const createdDaysAgo = Math.floor(Math.random() * 365);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - createdDaysAgo);

        products.push({
          id: i,
          title: `${titles[Math.floor(Math.random() * titles.length)]} ${
            categoryNames[category]
          } в 2 строки название товар ${i}...`,
          image: images[(i - 1) % images.length],
          currentPrice: currentPrice,
          oldPrice: hasDiscount ? basePrice : 0,
          discount: discountPercent,
          category: category,
          freeDelivery: Math.random() > 0.4,
          isHit: Math.random() > 0.7,
          isNew: createdDaysAgo < 30,
          isFeatured: Math.random() > 0.8,
          isFavorite: Math.random() > 0.85,
          createdAt: createdAt.toISOString(),
        });
      }

      return products;
    },
    toggleGoods() {
      this.isGoodsOpen = !this.isGoodsOpen;
    },
    setActiveSection(section) {
      this.activeSection = section;
      if (["abstraction", "pasta", "hats"].includes(section)) {
        this.isGoodsOpen = true;
        this.shopFilters.category = section;
      } else {
        this.shopFilters.category = "all";
      }
    },
    toggleDetails() {
      this.isDetailsOpen = !this.isDetailsOpen;
    },
    handleSortChange(sortValue) {
      this.shopFilters.sort = sortValue;
    },
    handlePerPageChange(perPageValue) {
      this.shopFilters.perPage = perPageValue;
    },
    handleCategoryChange(categoryValue) {
      this.shopFilters.category = categoryValue;
      if (categoryValue !== "all") {
        this.activeSection = categoryValue;
      }
    },
    handleCollectionChange(collectionValue) {
      this.shopFilters.collection = collectionValue;
    },
    handleSearchChange(searchValue) {
      this.shopFilters.search = searchValue;
    },
    handleToggleFavorite(productId) {
      const product = this.allProducts.find((p) => p.id === productId);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
    handleAddToCart(productId) {
      console.log("Добавить в корзину товар:", productId);
    },
    handlePageChange(page) {
      console.log("Переход на страницу:", page);
    },
  },
};
</script>

<style scoped>
@import "/src/assets/profile/profile.css";
@import "/src/assets/breadcrumb.css";
</style>