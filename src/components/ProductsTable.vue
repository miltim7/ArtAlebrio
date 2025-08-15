<!-- src\components\ProductsTable.vue -->

<template>
  <section class="breadcrumb-section">
    <div class="breadcrumb-container">
      <nav class="breadcrumb">
        <a href="#" class="breadcrumb-link">Главная</a>
        <span class="breadcrumb-separator">››</span>
        <a href="#" class="breadcrumb-link">Профиль</a>
        <span class="breadcrumb-separator">››</span>
        <span class="breadcrumb-current">Листинг товаров</span>
      </nav>
    </div>
  </section>

  <div class="container">
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: activeTab === 'proposals' }"
        @click="setActiveTab('proposals')"
      >
        Товары
        <span class="tab-badge">12</span>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'galleries' }"
        @click="setActiveTab('galleries')"
      >
        Папки
        <span class="tab-badge">78</span>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'favorites' }"
        @click="setActiveTab('favorites')"
      >
        Избранное
        <span class="tab-badge">179</span>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'exhibitions' }"
        @click="setActiveTab('exhibitions')"
      >
        Мероприятия
        <span class="tab-badge">2</span>
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'news' }"
        @click="setActiveTab('news')"
      >
        Новости
        <span class="tab-badge">2</span>
      </button>
    </div>

    <div class="tabs-mobile">
      <select class="tabs-select" v-model="activeTab" @change="setActiveTab(activeTab)">
        <option value="proposals">Товары 12</option>
        <option value="galleries">Папки 78</option>
        <option value="favorites">Избранное 179</option>
        <option value="exhibitions">Мероприятия 2</option>
        <option value="news">Новости 2</option>
      </select>
    </div>

    <div class="filters">
      <div class="filters-left">
        <div class="filters-selects-container">
          <select class="filter-select">
            <option value="active">Активные</option>
            <option value="pending">Не активные</option>
          </select>

          <select class="filter-select">
            <option value="inactive">На продажу</option>
            <option value="expired">Для примера</option>
            <option value="auction">Аукцион</option>
            <option value="sold">Продано</option>
          </select>

          <select class="filter-select">
            <option value="date">По дате</option>
            <option value="price">По цене</option>
            <option value="name">По номеру</option>
          </select>
          <select class="filter-select filter-select-small" v-model="itemsPerPage">
            <option value="20шт">20шт</option>
            <option value="40шт">40шт</option>
            <option value="60шт">60шт</option>
            <option value="80шт">80шт</option>
          </select>
        </div>
        <div class="filter-search">
          <input
            type="search"
            placeholder="Поиск по товарам"
            v-model="searchQuery"
            class="filter-search-input"
            @input="handleSearch"
          />
          <button class="filter-search-btn" @click="handleSearch">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="7" r="5" stroke="#666" stroke-width="1.5" />
              <path
                d="m11 11 3 3"
                stroke="#666"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="filters-right">
        <label class="toggle-switch">
          <input type="checkbox" v-model="editMode" />
          <span class="slider"></span>
        </label>
        <span>Редактировать</span>
        <div class="view-buttons">
          <button
            class="view-btn"
            :class="{ active: viewMode === 'list' }"
            @click="setViewMode('list')"
          >
            <img src="/images/burger-icon.png" alt="list" class="view-icon view-icon1" />
          </button>
          <button
            class="view-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="setViewMode('grid')"
          >
            <img src="/images/grid-icon.png" alt="grid" class="view-icon view-icon2" />
          </button>
        </div>
      </div>
    </div>

    <div class="products-list">
      <div
        v-for="(product, index) in products"
        :key="product.id + '_' + index"
        class="product-item"
        :class="{
          dragging: draggedIndex === index,
          'dropdown-open': dropdownIndex === index,
          'drag-over-top':
            dragOverIndex === index && draggedIndex !== index && draggedIndex > index,
          'drag-over-bottom':
            dragOverIndex === index && draggedIndex !== index && draggedIndex < index,
          'shifted-up': shouldShiftUp(index),
          'shifted-down': shouldShiftDown(index),
        }"
        draggable="true"
        @dragstart="handleDragStart(index, $event)"
        @dragend="handleDragEnd"
        @dragover="handleDragOver(index, $event)"
        @dragenter="handleDragEnter(index, $event)"
        @dragleave="handleDragLeave(index, $event)"
        @drop="handleDrop(index, $event)"
      >
        <div class="product-image-container">
          <img :src="product.image" :alt="product.title" class="product-image" />
          <div class="drag-icon">
            <img src="/images/arrows.png" alt="drag" class="arrows-icon" />
          </div>
        </div>

        <div class="product-info">
          <div class="product-title">{{ product.title }}</div>
        </div>

        <div class="product-id">#{{ product.id }}</div>

        <div class="product-price">
          {{ product.price }}
        </div>

        <button class="promo-btn" @click="openPromoModal">
          <img src="/images/promo-icon.png" alt="promo" class="promo-icon" />
          Promo
        </button>

        <div
          class="product-status"
          @mouseenter="showStatusTooltipHandler(index)"
          @mouseleave="hideStatusTooltip"
          @click="toggleStatusTooltip(index)"
        >
          <img
            :src="
              !product.isPromoting
                ? '/images/refresh-icon.png'
                : '/images/refresh-icon-red.png'
            "
            alt="refresh"
            class="status-icon"
            :class="{ 'status-icon-clickable': !product.isPromoting }"
            @click.stop="promoteToTop(index)"
          />
          <span
            class="status-text"
            :class="{ 'status-text--error': product.isPromoting }"
            @click="toggleStatusTooltipMobile(index)"
          >
            {{ formatTime(product.timeLeft) }}
          </span>

          <div
            class="status-tooltip"
            :class="{ show: showStatusTooltip && statusTooltipIndex === index }"
          >
            <div class="tooltip-content">
              {{
                !product.isPromoting
                  ? "Нажмите на иконку, чтобы поднять товар в топ каталога. Следующее обновление будет доступно через 15 дней."
                  : 'Товар поднят в топ. Используйте троеточие → "Редактировать" для изменения товара. Следующее поднятие в топ будет доступно через указанное время.'
              }}
            </div>
          </div>
        </div>

        <div
          class="product-actions"
          :class="{ 'dropdown-open': dropdownIndex === index }"
        >
          <button class="actions-btn" @click="toggleDropdown(index)">
            <span class="icon-dots"></span>
          </button>

          <div class="dropdown-menu" :class="{ show: dropdownIndex === index }">
            <button class="dropdown-item" @click="promoteToTop(index)">
              <img src="/images/pen-icon.png" alt="edit" class="dropdown-icon-img" />
              Редактировать
            </button>
            <button class="dropdown-item">
              <img src="/images/money-icon.png" alt="price" class="dropdown-icon-img" />
              Изменить цену
            </button>
            <button class="dropdown-item">
              <img
                src="/images/certificate-icon.png"
                alt="certificate"
                class="dropdown-icon-img"
              />
              Депозитный сертификат
            </button>
            <button class="dropdown-item">
              <img src="/images/trophy-icon.png" alt="trophy" class="dropdown-icon-img" />
              Участвуй в ...
            </button>
            <button class="dropdown-item">
              <img src="/images/trash-icon.png" alt="delete" class="dropdown-icon-img" />
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button
        class="pagination-btn pagination-arrow"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <template v-if="totalPages <= 7">
        <button
          v-for="page in totalPages"
          :key="page"
          class="pagination-btn pagination-number"
          :class="{ active: currentPage === page }"
          @click="setPage(page)"
        >
          {{ page }}
        </button>
      </template>

      <template v-else>
        <!-- Always show first page -->
        <button
          class="pagination-btn pagination-number"
          :class="{ active: currentPage === 1 }"
          @click="setPage(1)"
        >
          1
        </button>

        <!-- Show ellipsis or second page -->
        <template v-if="currentPage > 3">
          <button class="pagination-btn pagination-ellipsis" disabled>...</button>
        </template>
        <template v-else>
          <button
            class="pagination-btn pagination-number"
            :class="{ active: currentPage === 2 }"
            @click="setPage(2)"
          >
            2
          </button>
        </template>

        <!-- Dynamic middle pages -->
        <template v-if="currentPage <= 3">
          <button
            class="pagination-btn pagination-number"
            :class="{ active: currentPage === 3 }"
            @click="setPage(3)"
          >
            3
          </button>
          <button class="pagination-btn pagination-ellipsis" disabled>...</button>
        </template>
        <template v-else-if="currentPage >= totalPages - 2">
          <button class="pagination-btn pagination-ellipsis" disabled>...</button>
          <button
            class="pagination-btn pagination-number"
            :class="{ active: currentPage === totalPages - 2 }"
            @click="setPage(totalPages - 2)"
          >
            {{ totalPages - 2 }}
          </button>
        </template>
        <template v-else>
          <button
            class="pagination-btn pagination-number"
            @click="setPage(currentPage - 1)"
          >
            {{ currentPage - 1 }}
          </button>
          <button class="pagination-btn pagination-number active">
            {{ currentPage }}
          </button>
          <button
            class="pagination-btn pagination-number"
            @click="setPage(currentPage + 1)"
          >
            {{ currentPage + 1 }}
          </button>
        </template>

        <!-- Show ellipsis or second last page -->
        <template v-if="currentPage < totalPages - 2">
          <button class="pagination-btn pagination-ellipsis" disabled>...</button>
        </template>
        <template v-else>
          <button
            class="pagination-btn pagination-number"
            :class="{ active: currentPage === totalPages - 1 }"
            @click="setPage(totalPages - 1)"
          >
            {{ totalPages - 1 }}
          </button>
        </template>

        <!-- Always show last page -->
        <button
          class="pagination-btn pagination-number"
          :class="{ active: currentPage === totalPages }"
          @click="setPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </template>

      <button
        class="pagination-btn pagination-arrow"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div v-if="showPromoModal" class="promo-modal-overlay" @click="closePromoModal">
      <div class="promo-modal-content" @click.stop>
        <div class="promo-modal-header">
          <h3 class="modal-title">Получить больше просмотров</h3>
          <button class="modal-close" @click="closePromoModal">
            <img src="/images/x.png" alt="закрыть" class="close-icon" />
          </button>
        </div>

        <div class="modal-body">
          <div class="promo-option">
            <div class="option-title">Показывать на главной странице в блоке Promo:</div>
            <div class="option-row">
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="mainPage"
                  value="no"
                  v-model="promoData.mainPage"
                />
                <span class="checkbox-custom"></span>
                Нет
              </label>
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="mainPage"
                  value="coins"
                  v-model="promoData.mainPage"
                />
                <span class="checkbox-custom"></span>
                <span class="coins-badge">2 ArtCoins</span>
              </label>
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="mainPage"
                  value="points"
                  v-model="promoData.mainPage"
                />
                <span class="checkbox-custom"></span>
                1200 баллов
              </label>
            </div>
          </div>

          <div class="promo-option">
            <div class="option-title">Показывать работы в Vip-блоке:</div>
            <div class="option-row">
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="vipBlock"
                  value="no"
                  v-model="promoData.vipBlock"
                />
                <span class="checkbox-custom"></span>
                Нет
              </label>
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="vipBlock"
                  value="coins"
                  v-model="promoData.vipBlock"
                />
                <span class="checkbox-custom"></span>
                <span class="coins-badge">4 ArtCoins</span>
              </label>
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="vipBlock"
                  value="points"
                  v-model="promoData.vipBlock"
                />
                <span class="checkbox-custom"></span>
                2400 баллов
              </label>
            </div>
          </div>

          <div class="promo-option">
            <div class="option-title">Пост в социальных сетях:</div>
            <div class="option-row">
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="socialPost"
                  value="no"
                  v-model="promoData.socialPost"
                />
                <span class="checkbox-custom"></span>
                Нет
              </label>
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="socialPost"
                  value="coins"
                  v-model="promoData.socialPost"
                />
                <span class="checkbox-custom"></span>
                <span class="coins-badge">8 ArtCoins</span>
              </label>
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="socialPost"
                  value="points"
                  v-model="promoData.socialPost"
                />
                <span class="checkbox-custom"></span>
                4800 баллов
              </label>
            </div>
          </div>

          <div class="promo-option">
            <div class="option-title">Показывать на главной странице в блоке Promo:</div>
            <div class="option-row single">
              <label class="checkbox-option">
                <input
                  type="radio"
                  name="freePromo"
                  value="free"
                  v-model="promoData.freePromo"
                />
                <span class="checkbox-custom"></span>
                Бесплатно
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="apply-btn" @click="applyPromo">Применить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsListing",
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      totalPages: 7,
      viewMode: "list",
      itemsPerPage: "20шт",
      activeTab: "proposals",
      editMode: false,
      dropdownIndex: -1,
      showPromoModal: false,
      showStatusTooltip: false,
      statusTooltipIndex: -1,
      draggedIndex: -1,
      dragOverIndex: -1,
      timerInterval: null,
      promoData: {
        mainPage: "coins",
        vipBlock: "coins",
        socialPost: "coins",
        freePromo: "free",
      },
      products: [
        {
          id: "84634463",
          title: "Home decor Skull with roses for living room",
          price: "6 650,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый
          image:
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop&crop=center",
        },
        {
          id: "84634464",
          title: "Home decor Skull with roses for living room",
          price: "60,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый - как остальные
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=60&h=60&fit=crop&crop=center",
        },
        {
          id: "84634465",
          title: "Home decor Skull with roses for living room",
          price: "700,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый
          image:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=60&h=60&fit=crop&crop=center",
        },
        {
          id: "84634466",
          title: "Home decor Skull with roses for living room",
          price: "600,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый
          image:
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=60&h=60&fit=crop&crop=center",
        },
        {
          id: "84634467",
          title: "Home decor Skull with roses for living room",
          price: "61,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый
          image:
            "https://images.unsplash.com/photo-1558618666-fbd697c83667?w=60&h=60&fit=crop&crop=center",
        },
        {
          id: "84634468",
          title: "Home decor Skull with roses for living room",
          price: "8,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый
          image:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=60&h=60&fit=crop&crop=center",
        },
        {
          id: "84634469",
          title: "Home decor Skull with roses for living room",
          price: "70,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый
          image:
            "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=60&h=60&fit=crop&crop=center",
        },
        {
          id: "84634470",
          title: "Home decor Skull with roses for living room",
          price: "65,000 ₽",
          timeLeft: 1296000, // 15 дней
          isPromoting: false, // зеленый
          image:
            "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=60&h=60&fit=crop&crop=center",
        },
      ],
    };
  },
  methods: {
    handleSearch() {
      console.log("Поиск:", this.searchQuery);
    },
    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        console.log("Страница:", page);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    setViewMode(mode) {
      this.viewMode = mode;
      console.log("Режим просмотра:", mode);
    },
    handleItemsPerPageChange() {
      console.log("Количество на странице:", this.itemsPerPage);
    },
    setActiveTab(tabName) {
      this.activeTab = tabName;
      console.log("Активный таб:", tabName);
    },
    toggleDropdown(index) {
      this.dropdownIndex = this.dropdownIndex === index ? -1 : index;
    },
    openPromoModal() {
      this.showPromoModal = true;
      document.body.style.overflow = "hidden";
    },
    closePromoModal() {
      this.showPromoModal = false;
      document.body.style.overflow = "auto";
    },
    applyPromo() {
      console.log("Promo applied:", this.promoData);
      this.closePromoModal();
    },
    showStatusTooltipHandler(index) {
      this.statusTooltipIndex = index;
      this.showStatusTooltip = true;
    },
    hideStatusTooltip() {
      this.showStatusTooltip = false;
      this.statusTooltipIndex = -1;
    },
    toggleStatusTooltip(index) {
      if (this.statusTooltipIndex === index && this.showStatusTooltip) {
        this.hideStatusTooltip();
      } else {
        this.showStatusTooltipHandler(index);
      }
    },
    handleDragStart(index, event) {
      this.draggedIndex = index;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/html", "");
    },
    toggleStatusTooltipMobile(index) {
      // Только для мобильных устройств
      if (window.innerWidth <= 768) {
        if (this.statusTooltipIndex === index && this.showStatusTooltip) {
          this.hideStatusTooltip();
        } else {
          this.showStatusTooltipHandler(index);
        }
      }
    },
    handleDragEnd() {
      this.draggedIndex = -1;
      this.dragOverIndex = -1;
    },
    handleDragOver(index, event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    handleDragEnter(index, event) {
      event.preventDefault();
      if (this.draggedIndex !== -1 && this.draggedIndex !== index) {
        this.dragOverIndex = index;
      }
    },
    handleDragLeave(index, event) {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.dragOverIndex = -1;
      }
    },
    handleDrop(dropIndex, event) {
      event.preventDefault();
      if (this.draggedIndex !== -1 && this.draggedIndex !== dropIndex) {
        const draggedItem = this.products[this.draggedIndex];
        this.products.splice(this.draggedIndex, 1);
        this.products.splice(dropIndex, 0, draggedItem);
      }
      this.draggedIndex = -1;
      this.dragOverIndex = -1;
    },
    shouldShiftUp(index) {
      return (
        this.draggedIndex !== -1 &&
        this.dragOverIndex !== -1 &&
        this.draggedIndex !== index &&
        this.dragOverIndex !== index &&
        this.draggedIndex > this.dragOverIndex &&
        index >= this.dragOverIndex &&
        index < this.draggedIndex
      );
    },
    shouldShiftDown(index) {
      return (
        this.draggedIndex !== -1 &&
        this.dragOverIndex !== -1 &&
        this.draggedIndex !== index &&
        this.dragOverIndex !== index &&
        this.draggedIndex < this.dragOverIndex &&
        index <= this.dragOverIndex &&
        index > this.draggedIndex
      );
    },
    formatTime(seconds) {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      return `${days.toString().padStart(2, "0")} д. ${hours
        .toString()
        .padStart(2, "0")} ч. ${minutes.toString().padStart(2, "0")} м`;
    },
    promoteToTop(index) {
      if (!this.products[index].isPromoting) {
        this.products[index].isPromoting = true;
        this.products[index].timeLeft = 1295999;
        this.dropdownIndex = -1;
        console.log(`Товар ${this.products[index].title} поднят в топ каталога!`);
      } else {
        this.dropdownIndex = -1;
        console.log(`Редактирование товара ${this.products[index].title}`);
      }
    },
    updateTimers() {
      this.products.forEach((product) => {
        if (product.isPromoting && product.timeLeft > 0) {
          product.timeLeft--;
        }
        if (product.isPromoting && product.timeLeft === 0) {
          product.isPromoting = false;
          product.timeLeft = 1296000;
        }
      });
    },
    startTimers() {
      this.timerInterval = setInterval(() => {
        this.updateTimers();
      }, 1000);
    },
    stopTimers() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },
  },
  mounted() {
    this.startTimers();

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".product-actions")) {
        this.dropdownIndex = -1;
      }
      if (!e.target.closest(".product-status")) {
        this.hideStatusTooltip();
      }
    });
  },
  beforeDestroy() {
    this.stopTimers();
  },
};
</script>

<style scoped>
@import "/src/assets/product-listing.css";
@import "/src/assets/breadcrumb.css";
</style>
