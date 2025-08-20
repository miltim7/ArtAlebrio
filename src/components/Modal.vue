<!-- src\components\Modal.vue -->

<template>
  <div></div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "Modal",
  data() {
    return {
      isInfoModalOpen: false,
      isTooltipPinned: false,

      selectedTab: "card",
      selectedArtworks: [],
      searchQuery: "",
      sortBy: "default",
      preorderPrint: false,
      balance: 105,
      participationCost: 36,
      nextWorkCost: 18,

      currentPage: 1,
      itemsPerPage: 12,

      artworks: [
        {
          id: 1,
          price: 14850,
          image: "/images/artworks/artwork1.jpg",
          title: "Sunset Dreams",
        },
        {
          id: 2,
          price: 12400,
          image: "/images/artworks/artwork2.jpg",
          title: "Ocean Waves",
        },
        {
          id: 3,
          price: 16700,
          image: "/images/artworks/artwork3.jpg",
          title: "Mountain Peak",
        },
        {
          id: 4,
          price: 11200,
          image: "/images/artworks/artwork4.jpg",
          title: "City Lights",
        },
        {
          id: 5,
          price: 18900,
          image: "/images/artworks/artwork1.jpg",
          title: "Forest Path",
        },
        {
          id: 6,
          price: 13500,
          image: "/images/artworks/artwork2.jpg",
          title: "Desert Storm",
        },
        {
          id: 7,
          price: 15800,
          image: "/images/artworks/artwork3.jpg",
          title: "River Flow",
        },
        {
          id: 8,
          price: 10900,
          image: "/images/artworks/artwork4.jpg",
          title: "Sky Portal",
        },
        {
          id: 9,
          price: 17600,
          image: "/images/artworks/artwork1.jpg",
          title: "Aurora Dance",
        },
        {
          id: 10,
          price: 14200,
          image: "/images/artworks/artwork2.jpg",
          title: "Crystal Cave",
        },
        {
          id: 11,
          price: 16300,
          image: "/images/artworks/artwork3.jpg",
          title: "Wind Song",
        },
        {
          id: 12,
          price: 12800,
          image: "/images/artworks/artwork4.jpg",
          title: "Fire Spirit",
        },
        {
          id: 13,
          price: 19200,
          image: "/images/artworks/artwork1.jpg",
          title: "Ice Kingdom",
        },
        {
          id: 14,
          price: 11600,
          image: "/images/artworks/artwork2.jpg",
          title: "Thunder Strike",
        },
        {
          id: 15,
          price: 15400,
          image: "/images/artworks/artwork3.jpg",
          title: "Moon Glow",
        },
        {
          id: 16,
          price: 13900,
          image: "/images/artworks/artwork4.jpg",
          title: "Star Dust",
        },
        {
          id: 17,
          price: 17800,
          image: "/images/artworks/artwork1.jpg",
          title: "Earth Song",
        },
        {
          id: 18,
          price: 12100,
          image: "/images/artworks/artwork2.jpg",
          title: "Water Spirit",
        },
        {
          id: 19,
          price: 16500,
          image: "/images/artworks/artwork3.jpg",
          title: "Air Dance",
        },
        {
          id: 20,
          price: 14700,
          image: "/images/artworks/artwork4.jpg",
          title: "Light Beam",
        },
        {
          id: 21,
          price: 18400,
          image: "/images/artworks/artwork1.jpg",
          title: "Shadow Play",
        },
        {
          id: 22,
          price: 13200,
          image: "/images/artworks/artwork2.jpg",
          title: "Dream Catcher",
        },
        {
          id: 23,
          price: 15900,
          image: "/images/artworks/artwork3.jpg",
          title: "Soul Mirror",
        },
        {
          id: 24,
          price: 11800,
          image: "/images/artworks/artwork4.jpg",
          title: "Time Portal",
        },
        {
          id: 25,
          price: 17200,
          image: "/images/artworks/artwork1.jpg",
          title: "Space Voyage",
        },
        {
          id: 26,
          price: 14600,
          image: "/images/artworks/artwork2.jpg",
          title: "Mystic Garden",
        },
        {
          id: 27,
          price: 16100,
          image: "/images/artworks/artwork3.jpg",
          title: "Magic Circle",
        },
        {
          id: 28,
          price: 12500,
          image: "/images/artworks/artwork4.jpg",
          title: "Energy Flow",
        },
        {
          id: 29,
          price: 18600,
          image: "/images/artworks/artwork1.jpg",
          title: "Cosmic Dance",
        },
        {
          id: 30,
          price: 13800,
          image: "/images/artworks/artwork2.jpg",
          title: "Harmony",
        },
      ],
    };
  },

  computed: {
    filteredArtworks() {
      if (!this.searchQuery.trim()) {
        return this.artworks;
      }
      return this.artworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          artwork.price.toString().includes(this.searchQuery)
      );
    },

    totalPages() {
      return Math.ceil(this.filteredArtworks.length / this.itemsPerPage);
    },

    paginatedArtworks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredArtworks.slice(start, end);
    },

    paginationInfo() {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(
        this.currentPage * this.itemsPerPage,
        this.filteredArtworks.length
      );
      return {
        start,
        end,
        total: this.filteredArtworks.length,
      };
    },
  },

  methods: {
    setupMasonryLayout() {
      const items = document.querySelectorAll(".artwork-item");

      items.forEach((item) => {
        const img = item.querySelector(".artwork-image");

        img.addEventListener("load", () => {
          const height = img.offsetHeight;
          const spans = Math.ceil((height + 16) / 10);
          item.style.gridRowEnd = `span ${spans}`;
        });

        if (img.complete) {
          const height = img.offsetHeight;
          const spans = Math.ceil((height + 16) / 10);
          item.style.gridRowEnd = `span ${spans}`;
        }
      });
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updateGallery();
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updateGallery();
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateGallery();
      }
    },

    updateGallery() {
      const galleryElement = document.getElementById("artGallery");
      if (galleryElement) {
        galleryElement.innerHTML = this.renderGallery();
        this.setupMasonryLayout();
        this.attachGalleryEvents();
      }
      this.updatePaginationUI();
    },

    updatePaginationUI() {
      const paginationInfo = document.getElementById("paginationInfo");
      if (paginationInfo) {
        const info = this.paginationInfo;
        paginationInfo.textContent = `${info.start}-${info.end} из ${info.total}`;
      }

      const paginationNumbers = document.querySelector(".pagination-numbers");
      if (paginationNumbers) {
        paginationNumbers.innerHTML = this.renderPaginationNumbers();
        this.attachPaginationNumberEvents();
      }

      this.updateNavigationButtons();
    },

    updateNavigationButtons() {
      const prevBtn = document.getElementById("prevPageBtn");
      const nextBtn = document.getElementById("nextPageBtn");

      if (prevBtn) {
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.classList.toggle("disabled", this.currentPage === 1);
      }

      if (nextBtn) {
        nextBtn.disabled = this.currentPage === this.totalPages;
        nextBtn.classList.toggle("disabled", this.currentPage === this.totalPages);
      }
    },

    attachPaginationNumberEvents() {
      document.querySelectorAll(".pagination-number").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const page = parseInt(e.target.dataset.page);
          this.goToPage(page);
        });
      });
    },

    getVisiblePages() {
      const total = this.totalPages;
      const current = this.currentPage;
      const pages = [];

      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 4) {
          pages.push(1, 2, 3, 4, 5, "...", total);
        } else if (current >= total - 3) {
          pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
        } else {
          pages.push(1, "...", current - 1, current, current + 1, "...", total);
        }
      }

      return pages;
    },

    resetPagination() {
      this.currentPage = 1;
    },

    showModal() {
      Swal.fire({
        html: this.getModalContent(),
        showConfirmButton: false,
        showCancelButton: false,
        showDenyButton: false,
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
          popup: "art-modal",
          closeButton: "art-modal__close",
          actions: "swal2-actions-hidden",
        },
        width: "1384px",
        didOpen: () => {
          this.initModalEvents();
        },
      });
    },

    getModalContent() {
      return `
    <div class="art-modal-content">
      <div class="art-modal__header">
        <div class="art-modal__search-section">
          <div class="search-input-wrapper">
            <input
              type="text"
              placeholder="Поиск"
              class="search-input"
              id="searchInput"
              value="${this.searchQuery}"
            >
            <button class="search-button" id="searchBtn">
              <svg width="18" height="18" viewBox="0 0 16 16">
                <path fill="#604093" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
            <button class="clear-button" id="clearBtn" style="display: ${
              this.searchQuery ? "flex" : "none"
            }">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="sort-dropdown">
            <img src="/images/frame.png" alt="Sort icon" class="sort-left-icon">
            <select class="sort-select" id="sortSelect">
              <option value="default">По умолчанию</option>
              <option value="price">По цене</option>
              <option value="name">По названию</option>
              <option value="number">По номеру</option>
            </select>
            <svg class="sort-arrow" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.7193 6.46658L7.06596 10.8132C7.5793 11.3266 8.4193 11.3266 8.93263 10.8132L13.2793 6.46658" stroke="#3F3F3F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="art-modal__balance">
          <span class="balance-label">Ваш баланс:</span>
          <span class="balance-amount">${
            this.balance
          } <span class="artcoins">Artcoins</span></span>
        </div>
      </div>

      <div class="art-modal__payment-section">
        <div class="art-modal__payment">
          <div class="payment-label">Оплата:</div>
          <div class="payment-tabs">
  <button class="payment-tab ${this.selectedTab === "card" ? "active" : ""}"
          data-tab="card" type="button">
    По карте
  </button>
  <button class="payment-tab ${this.selectedTab === "points" ? "active" : ""}"
          data-tab="points" type="button">
    Artcoins
  </button>
</div>
        </div>

        <button class="balance-btn" id="topUpBtn">Пополнить</button>
      </div>

      <div class="art-modal__info">
        <div class="info-item">
          <span class="info-label">Стоимость участия (для первых двух работ) <span class="info-value">- ${
            this.participationCost
          }</span></span>
        </div>
        <div class="info-item">
          <span class="info-label">Каждая последующая</span>
          <span class="info-dash"> - </span>
          <span class="info-value">${this.nextWorkCost}</span>
        </div>
      </div>

      <div class="art-modal__counters">
        <div class="counter-item">
          <span class="counter-label">Выбранные работы</span>
          <span class="counter-dash"> - </span>
          <span class="counter-value" id="selectedCount">${
            this.selectedArtworks.length
          }</span>
        </div>
        <div class="counter-item">
          <span class="counter-label">К оплате</span>
          <span class="counter-dash"> - </span>
          <span class="counter-value" id="totalAmount">${this.calculateTotal()}</span>
        </div>
      </div>

      <div class="art-modal__preorder">
        <div class="preorder-checkbox">
          <div class="checkbox-wrapper">
            <input type="checkbox" id="preorderCheck" ${
              this.preorderPrint ? "checked" : ""
            }>
            <span class="checkmark" id="checkmarkSpan"></span>
          </div>
          <span class="checkbox-label">Оформить предзаказ на печатную версию</span>
          <img
            src="${
              this.isInfoModalOpen ? "/images/vopros-active.png" : "/images/vopros.png"
            }"
            alt="Info"
            class="info-icon"
            id="infoIcon"
            width="20"
            height="20"
          >
        </div>
      </div>

      <div class="art-modal__gallery" id="artGallery">
        ${this.renderGallery()}
      </div>

      <div class="art-modal__pagination">
        <div class="pagination-info">
          <span id="paginationInfo">${this.paginationInfo.start}-${
        this.paginationInfo.end
      } из ${this.paginationInfo.total}</span>
        </div>

        <div class="pagination-controls">
          <button class="pagination-btn pagination-btn--prev ${
            this.currentPage === 1 ? "disabled" : ""
          }"
                  id="prevPageBtn" ${this.currentPage === 1 ? "disabled" : ""}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="pagination-btn__text">Назад</span>
          </button>

          <div class="pagination-numbers">
            ${this.renderPaginationNumbers()}
          </div>

          <button class="pagination-btn pagination-btn--next ${
            this.currentPage === this.totalPages ? "disabled" : ""
          }"
                  id="nextPageBtn" ${
                    this.currentPage === this.totalPages ? "disabled" : ""
                  }>
            <span class="pagination-btn__text">Далее</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="art-modal__footer">
        <button class="btn btn-primary" id="confirmBtn" ${
          this.selectedArtworks.length === 0 ? "disabled" : ""
        }>Подтвердить</button>
        <button class="btn btn-secondary" id="backBtn">Назад</button>
      </div>
    </div>
  `;
    },

    renderPaginationNumbers() {
      const pages = this.getVisiblePages();
      return pages
        .map((page) => {
          if (page === "...") {
            return '<span class="pagination-dots">...</span>';
          }

          const isActive = page === this.currentPage;
          return `
          <button class="pagination-number ${isActive ? "active" : ""}"
                  data-page="${page}">
            ${page}
          </button>
        `;
        })
        .join("");
    },

    showInfoModal(pinned = false) {
      this.isInfoModalOpen = true;
      this.isTooltipPinned = pinned;

      const infoIcon = document.getElementById("infoIcon");
      if (infoIcon) {
        infoIcon.src = "/images/vopros-active.png";
      }

      if (!document.querySelector(".custom-tooltip")) {
        this.createTooltip();
      }
    },

    hideTooltip() {
      const tooltip = document.querySelector(".custom-tooltip");
      if (tooltip) {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateY(-10px) scale(0.95)";

        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.remove();
          }
        }, 200);
      }

      this.isInfoModalOpen = false;
      this.isTooltipPinned = false;

      const infoIcon = document.getElementById("infoIcon");
      if (infoIcon) {
        infoIcon.src = "/images/vopros.png";
      }

      if (this.tooltipClickHandler) {
        document.removeEventListener("click", this.tooltipClickHandler);
      }
    },

    createTooltip() {
      const existingTooltip = document.querySelector(".custom-tooltip");
      if (existingTooltip) {
        existingTooltip.remove();
      }

      const tooltip = document.createElement("div");
      tooltip.className = "custom-tooltip";
      tooltip.innerHTML = `
        <div class="tooltip-arrow"></div>
        <div class="tooltip-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        </div>
      `;

      tooltip.style.opacity = "0";
      tooltip.style.transform = "translateY(-10px) scale(0.95)";

      const modalContent = document.querySelector(".art-modal-content");
      modalContent.appendChild(tooltip);

      const infoIcon = document.getElementById("infoIcon");
      const modalRect = modalContent.getBoundingClientRect();
      const iconRect = infoIcon.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      const left =
        iconRect.left - modalRect.left + iconRect.width / 2 - tooltipRect.width / 2;
      const top = iconRect.bottom - modalRect.top + 10;

      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";

      const arrow = tooltip.querySelector(".tooltip-arrow");
      arrow.style.left = tooltipRect.width / 2 - 8 + "px";

      requestAnimationFrame(() => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateY(0) scale(1)";
      });

      tooltip.addEventListener("mouseenter", () => {
        this.isInfoModalOpen = true;
      });

      tooltip.addEventListener("mouseleave", () => {
        if (!this.isTooltipPinned) {
          this.hideTooltip();
        }
      });

      this.tooltipClickHandler = (e) => {
        const tooltip = document.querySelector(".custom-tooltip");
        const infoIcon = document.getElementById("infoIcon");

        if (
          this.isTooltipPinned &&
          tooltip &&
          !tooltip.contains(e.target) &&
          e.target !== infoIcon
        ) {
          this.hideTooltip();
        }
      };

      document.addEventListener("click", this.tooltipClickHandler);
    },

    renderGallery() {
      return this.paginatedArtworks
        .map(
          (artwork) => `
      <div class="artwork-item" data-id="${artwork.id}">
        <img src="${artwork.image}" alt="${artwork.title}" class="artwork-image">
        <div class="artwork-price">#${artwork.price}</div>
        <div class="artwork-overlay"></div>
      </div>
    `
        )
        .join("");
    },

    attachGalleryEvents() {
      document.querySelectorAll(".artwork-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          const artworkId = parseInt(e.currentTarget.dataset.id);
          this.toggleArtworkSelection(artworkId);
        });
      });
    },

    initModalEvents() {
      // Инициализация вкладок оплаты (обновленная версия)
      const paymentTabs = document.querySelectorAll(".payment-tab");
      paymentTabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
          e.preventDefault();
          this.selectedTab = tab.dataset.tab;

          // Обновляем стили вкладок
          paymentTabs.forEach((t) => {
            t.classList.toggle("active", t.dataset.tab === this.selectedTab);

            // Дополнительные стили для мобильных
            if (window.innerWidth <= 768) {
              t.style.backgroundColor =
                t.dataset.tab === this.selectedTab ? "#5856D2" : "white";
              t.style.color = t.dataset.tab === this.selectedTab ? "white" : "#5856D2";
            }
          });
        });
      });

      // Обработчик для чекбокса предзаказа
      document.getElementById("preorderCheck").addEventListener("change", (e) => {
        this.preorderPrint = e.target.checked;
      });

      // Инициализация галереи
      this.attachGalleryEvents();

      // Обработчики пагинации
      document.getElementById("prevPageBtn").addEventListener("click", () => {
        this.prevPage();
      });

      document.getElementById("nextPageBtn").addEventListener("click", () => {
        this.nextPage();
      });

      // Обработчики номеров страниц
      this.attachPaginationNumberEvents();

      // Поиск и фильтрация
      document.getElementById("searchInput").addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.resetPagination();
        this.updateGallery();
        this.updateClearButton();
      });

      document.getElementById("clearBtn").addEventListener("click", () => {
        this.searchQuery = "";
        document.getElementById("searchInput").value = "";
        this.resetPagination();
        this.updateGallery();
        this.updateClearButton();
      });

      // Кнопки подтверждения и назад
      document.getElementById("confirmBtn").addEventListener("click", () => {
        if (this.selectedArtworks.length > 0) {
          this.confirmSelection();
        }
      });

      document.getElementById("backBtn").addEventListener("click", () => {
        Swal.close();
      });

      // Кнопка пополнения баланса
      document.getElementById("topUpBtn").addEventListener("click", () => {
        console.log("Пополнить баланс");
      });

      // Информационная иконка (тултип)
      const infoIcon = document.getElementById("infoIcon");
      let hoverTimeout;

      infoIcon.addEventListener("mouseenter", (e) => {
        clearTimeout(hoverTimeout);
        if (!this.isInfoModalOpen) {
          hoverTimeout = setTimeout(() => {
            this.showInfoModal(false);
          }, 100);
        }
      });

      infoIcon.addEventListener("mouseleave", (e) => {
        clearTimeout(hoverTimeout);
        if (this.isInfoModalOpen && !this.isTooltipPinned) {
          setTimeout(() => {
            if (!this.isTooltipPinned && this.isInfoModalOpen) {
              this.hideTooltip();
            }
          }, 100);
        }
      });

      infoIcon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (this.isInfoModalOpen && this.isTooltipPinned) {
          this.hideTooltip();
        } else {
          this.showInfoModal(true);
        }
      });

      // Дополнительные обработчики для чекбокса
      document.getElementById("checkmarkSpan").addEventListener("click", (e) => {
        const checkbox = document.getElementById("preorderCheck");
        checkbox.checked = !checkbox.checked;
        this.preorderPrint = checkbox.checked;
      });

      // Инициализация masonry-раскладки
      this.setupMasonryLayout();

      // Дополнительный вызов для мобильных устройств
      if (window.innerWidth <= 768) {
        this.updatePaymentTabs();
      }
    },

    updateClearButton() {
      const clearBtn = document.getElementById("clearBtn");
      if (clearBtn) {
        clearBtn.style.display = this.searchQuery ? "flex" : "none";
      }
    },

    // В methods добавьте:
    initPaymentTabs() {
      const tabs = document.querySelectorAll(".payment-tab");
      tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
          e.preventDefault();
          this.selectedTab = tab.dataset.tab;
          this.updatePaymentTabs();

          // Добавляем небольшой timeout для мобильных устройств
          setTimeout(() => {
            this.updatePaymentTabs();
          }, 50);
        });
      });
    },

    updatePaymentTabs() {
      const tabs = document.querySelectorAll(".payment-tab");
      tabs.forEach((tab) => {
        const isActive = tab.dataset.tab === this.selectedTab;
        tab.classList.toggle("active", isActive);

        // Для мобильных устройств добавляем дополнительные стили
        if (window.innerWidth <= 768) {
          if (isActive) {
            tab.style.backgroundColor = "#5856D2";
            tab.style.color = "white";
          } else {
            tab.style.backgroundColor = "white";
            tab.style.color = "#5856D2";
          }
        }
      });
    },

    toggleArtworkSelection(artworkId) {
      const index = this.selectedArtworks.indexOf(artworkId);
      if (index > -1) {
        this.selectedArtworks.splice(index, 1);
      } else {
        this.selectedArtworks.push(artworkId);
      }

      this.updateCounters();
      this.updateArtworkSelection(artworkId);
      this.updateConfirmButton();
    },

    updateArtworkSelection(artworkId) {
      const artworkElement = document.querySelector(`[data-id="${artworkId}"]`);
      if (artworkElement) {
        artworkElement.classList.toggle(
          "selected",
          this.selectedArtworks.includes(artworkId)
        );
      }
    },

    updateConfirmButton() {
      const confirmBtn = document.getElementById("confirmBtn");
      if (confirmBtn) {
        confirmBtn.disabled = this.selectedArtworks.length === 0;
      }
    },

    updateCounters() {
      const selectedCountElement = document.getElementById("selectedCount");
      const totalAmountElement = document.getElementById("totalAmount");

      if (selectedCountElement)
        selectedCountElement.textContent = this.selectedArtworks.length;
      if (totalAmountElement) totalAmountElement.textContent = this.calculateTotal();
    },

    calculateTotal() {
      const count = this.selectedArtworks.length;
      if (count === 0) return 0;
      if (count <= 2) return this.participationCost;
      return this.participationCost + (count - 2) * this.nextWorkCost;
    },

    confirmSelection() {
      console.log("Selected artworks:", this.selectedArtworks);
      console.log("Total amount:", this.calculateTotal());
      console.log("Payment method:", this.selectedTab);
      console.log("Preorder print:", this.preorderPrint);
      console.log("Current page:", this.currentPage);
      Swal.close();
    },
  },
};
</script>

<style>
@import "/src/assets/modal.css";
</style>