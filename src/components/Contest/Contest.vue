<!-- src\components\Contest\Contest.vue -->

<template>
  <section class="breadcrumb-section">
    <div class="breadcrumb-container">
      <nav class="breadcrumb" aria-label="Навигация по разделам">
        <a href="#" class="breadcrumb-link" aria-label="Перейти на главную страницу"
          >Главная</a
        >
        <span class="breadcrumb-separator" aria-hidden="true">››</span>
        <a href="#" class="breadcrumb-link" aria-label="Перейти на главную страницу"
          >Конкурсы</a
        >
        <span class="breadcrumb-separator" aria-hidden="true">››</span>
        <span class="breadcrumb-current" aria-current="page">Lucky 2024</span>
      </nav>
    </div>
  </section>

  <div class="contest-header-section">
    <div class="breadcrumb-container">
      <div class="header-container">
        <h1 class="contest-main-title">
          Jorney into the world of<br />landscape by Natalia Levushkina
        </h1>
        <div class="header-right">
          <div class="timer-section">
            <span class="timer-label">До окончания осталось:</span>
            <ContestTimer />
          </div>
          <button class="share-btn">
            <img src="/images/contest/bag.png" alt="" class="share-icon" />
            Пожертвовать в приз.фонд
          </button>
        </div>
        <div class="mobile-buttons">
          <button class="participate-btn-mobile" @click="openModal">
            <img src="/images/contest/plus.png" alt="" class="btn-icon" />
            Принять участие
          </button>
          <button class="share-btn-mobile">
            <img src="/images/contest/bag.png" alt="" class="share-icon" />
            Пожертвовать в приз.фонд
          </button>
        </div>
      </div>
    </div>
  </div>

    <div class="contest-main">
    <div class="breadcrumb-container">
      <div class="contest-container">
        <ContestSidebar 
          @tab-changed="handleTabChange" 
          @open-modal="openModal" 
          :active-tab="activeTab"
          :contest-ended="contestEnded"
        />
        <ContestContent :active-tab="activeTab" />
      </div>
    </div>
  </div>

  <Modal ref="modal" />
</template>

<script>
import ContestSidebar from "./ContestSidebar.vue";
import ContestContent from "./ContestContent.vue";
import ContestTimer from "./ContestTimer.vue";
import Modal from "../Modal.vue";

export default {
  name: "Contest",
  components: {
    ContestSidebar,
    ContestContent,
    ContestTimer,
    Modal,
  },
  data() {
    return {
      activeTab: "participants",
    };
  },
  methods: {
    handleTabChange(tab) {
      this.activeTab = tab;
    },
    openModal() {
      this.$refs.modal.showModal();
    },
  },
};
</script>

<style scoped>
@import "/src/assets/contest/contest.css";
@import "/src/assets/breadcrumb.css";

.contest-header-section {
  padding: 24px 0;
}

.header-container {
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contest-main {
  padding-bottom: 50px;
}

.contest-container {
  margin-top: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;
}

.contest-main-title {
  font-size: 28px;
  font-weight: 700;
  color: #3f3f3f;
  line-height: 1.3;
  margin: 0;
  white-space: nowrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 40px;
}

.timer-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.timer-label {
  font-size: 16px;
  font-weight: 500;
  color: #3f3f3f;
}

.share-btn {
  background-color: transparent;
  color: #5856d2;
  border: 2px solid #5856d2;
  border-radius: 26px;
  padding: 12px 26px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  white-space: nowrap;
}

.share-btn:hover {
  background: #c7d2fe;
}

.share-icon {
  width: 16px;
  height: 16px;
}

.mobile-buttons {
  display: none;
  gap: 16px;
  margin-top: 20px;
}

.participate-btn-mobile {
  background: #5856d2;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.participate-btn-mobile:hover {
  background: #5856eb;
}

.share-btn-mobile {
  background-color: transparent;
  color: #5856d2;
  border: 2px solid #5856d2;
  border-radius: 26px;
  padding: 12px 26px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  white-space: nowrap;
}

.share-btn-mobile:hover {
  background: #c7d2fe;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 1400px) {
  .contest-main-title {
    font-size: clamp(20px, 2vw, 28px);
  }

  .header-container {
    padding: clamp(16px, 2vw, 24px);
  }

  .header-right {
    gap: clamp(24px, 3vw, 40px);
  }

  .timer-label {
    font-size: clamp(14px, 1.2vw, 16px);
  }

  .share-btn {
    padding: clamp(8px, 1vw, 12px) clamp(12px, 1.2vw, 16px);
    font-size: clamp(12px, 1vw, 14px);
  }

  .share-icon {
    width: clamp(14px, 1.2vw, 16px);
    height: clamp(14px, 1.2vw, 16px);
  }
}

@media (max-width: 1200px) {
  .contest-main-title {
    font-size: clamp(18px, 2.2vw, 24px);
  }

  .header-right {
    gap: clamp(16px, 2vw, 24px);
  }

  .timer-label {
    font-size: clamp(13px, 1.3vw, 15px);
  }

  .share-btn {
    padding: clamp(6px, 0.8vw, 10px) clamp(10px, 1vw, 14px);
    font-size: clamp(11px, 1vw, 13px);
  }
}

@media (max-width: 1024px) {
  .header-container {
    flex-direction: column;
    text-align: center;
    gap: 0;
    padding: clamp(16px, 2vw, 20px);
  }

  .contest-main-title {
    white-space: normal;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-bottom: 16px;
  }

  .header-right {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 0;
  }

  .timer-label {
    font-size: clamp(14px, 1.5vw, 16px);
  }

  .share-btn {
    display: none;
  }

  .mobile-buttons {
    display: flex;
    justify-content: center;
    gap: clamp(12px, 2vw, 16px);
  }

  .participate-btn-mobile {
    border-radius: 12px;
    font-size: 16px;
    padding: 15px 50px;
  }

  .share-btn-mobile {
    border-radius: 12px;
    font-size: 12px;
  }

  .contest-container {
    margin-top: 20px;
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .contest-main {
    padding-bottom: 40px;
  }
}

@media (max-width: 600px) {
  .participate-btn-mobile {
    border-radius: 12px;
    font-size: 12px;
    padding: 12px 30px;
  }

  .share-btn-mobile {
    border-radius: 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .timer-section {
    flex-direction: column;
    gap: 16px;
  }

  .contest-container {
    margin-top: 16px;
    gap: 16px;
  }

  .header-container {
    padding: 16px;
  }

  .mobile-buttons {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .participate-btn-mobile,
  .share-btn-mobile {
    width: 100%;
    justify-content: center;
  }

  .contest-main {
    padding-bottom: 30px;
  }
}
</style>
