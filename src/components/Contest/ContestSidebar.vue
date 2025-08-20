<!-- src\components\Contest\ContestSidebar.vue -->

<template>
  <div class="sidebar">
    <div class="desktop-nav">
      <button 
        class="participants-btn"
        :class="{ active: activeTab === 'participants' }"
        @click="$emit('tab-changed', 'participants')"
      >
        <img 
          :src="activeTab === 'participants' ? '/images/contest/person-active.png' : '/images/contest/person.png'" 
          alt="" 
          class="participants-icon"
        >
        <span class="participants-text">Участники (567)</span>
      </button>

      <button 
        class="participants-btn"
        :class="{ active: activeTab === 'winners' }"
        @click="$emit('tab-changed', 'winners')"
      >
        <span class="participants-text">Победители (12)</span>
      </button>

      <button 
        class="nav-item" 
        :class="{ active: activeTab === 'description' }"
        @click="$emit('tab-changed', 'description')"
      >
        Описание
      </button>
      
      <button 
        class="nav-item"
        :class="{ active: activeTab === 'awards' }"
        @click="$emit('tab-changed', 'awards')"
      >
        Награда
      </button>
      
      <button 
        class="nav-item"
        :class="{ active: activeTab === 'jury' }"
        @click="$emit('tab-changed', 'jury')"
      >
        Жюри
      </button>

      <button class="participate-btn" @click="$emit('open-modal')" v-if="!contestEnded">
        <img src="/images/contest/plus.png" alt="" class="btn-icon">
        Принять участие
      </button>

      <button class="vote-btn" v-else>
        Голосовать
      </button>
    </div>

    <select class="mobile-select" v-model="selectedOption" @change="handleSelectChange">
      <option value="participants">Участники (567)</option>
      <option value="winners">Победители (12)</option>
      <option value="description">Описание</option>
      <option value="awards">Награда</option>
      <option value="jury">Жюри</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ContestSidebar',
  props: {
    activeTab: {
      type: String,
      default: 'participants'
    },
    contestEnded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['tab-changed', 'open-modal'],
  data() {
    return {
      selectedOption: 'participants'
    }
  },
  watch: {
    activeTab(newTab) {
      this.selectedOption = newTab
    }
  },
  methods: {
    handleSelectChange() {
      this.$emit('tab-changed', this.selectedOption)
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 250px;
}

.desktop-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-select {
  display: none;
}

.participants-btn {
  background: #F8F8FC;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  color: #3F3F3F;
}

.participants-btn:hover {
  background-color: #f8f9fa;
  color: #333;
}

.participants-btn.active {
  background-color: #e0e7ff;
  color: #5856D2;
}

.participants-icon {
  width: 16px;
  height: 16px;
  margin-left: 30px
}

.participants-text {
  font-size: 18px;
  color: inherit;
  font-weight: 500;
  width: 100%;
  margin-right: 10px
}

.nav-item {
  background: #F8F8FC;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  text-align: center;
  font-size: 18px;
  color: #3F3F3F;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #f8f9fa;
  color: #333;
}

.nav-item.active {
  background-color: #e0e7ff;
  color: #5856D2;
}

.participate-btn {
  background: #5856D2;
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

.participate-btn:hover {
  background: #5856eb;
}

.vote-btn {
  background: #28A745;
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

.vote-btn:hover {
  background: #218838;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 1024px) {
  .sidebar {
    margin-top: -20px;
    max-width: none;
  }
  
  .desktop-nav {
    flex-direction: row;
    gap: 16px;
    width: 100%;
  }
  
  .participate-btn,
  .vote-btn {
    display: none;
  }
  
  .participants-btn,
  .nav-item {
    flex: 1;
    text-align: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 500;
  }

  .participants-text {
    font-size: 15px;
    font-weight: 500;
  }
  
  .participants-icon {
    display: none;
  }
}

@media (max-width: 768px) {
  .desktop-nav {
    gap: 12px;
  }
  
  .participants-btn,
  .nav-item {
    padding: 12px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-select {
    display: block;
    width: 100%;
    background: #F8F8FC;
    border: 1px solid #ECECEC;
    border-radius: 12px;
    padding: 16px 20px;
    font-size: 14px;
    color: #5856D2;
    font-weight: 500;
    cursor: pointer;
  }
  
  .mobile-select:focus {
    outline: none;
    border-color: #5856D2;
  }
}
</style>