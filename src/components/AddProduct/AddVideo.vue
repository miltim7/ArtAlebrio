<!-- src\components\AddProduct\AddVideo.vue -->

<template>
  <div class="add-video-container">
    <div class="video-upload-section">
      <div class="video-preview-area" :class="{ 'has-video': videoData.thumbnail }">
        <!-- Превью видео -->
        <div v-if="videoData.thumbnail" class="video-thumbnail">
          <img :src="videoData.thumbnail" :alt="videoData.title || 'Video thumbnail'" />
          <div class="video-overlay">
            <div class="play-button">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="28" fill="rgba(0,0,0,0.7)"/>
                <path d="M21 18L37 28L21 38V18Z" fill="white"/>
              </svg>
            </div>
          </div>
          <button class="remove-video-btn" @click="removeVideo">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        
        <!-- Обычная иконка -->
        <div v-else class="play-icon">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M21 18L37 28L21 38V18Z" stroke="#9A9AAD" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" fill="#9A9AAD"/>
          </svg>
        </div>
      </div>
      
      <div class="video-content">
        <!-- Контент для активированного режима -->
        <div v-if="isActivated" class="premium-content">
          <h3 class="upload-title">Добавить ссылку на видео</h3>
          
          <!-- Input для ссылки -->
          <div class="video-url-input-container">
            <input 
              type="url" 
              v-model="videoUrl"
              @input="handleUrlInput"
              @paste="handleUrlPaste"
              class="video-url-input"
              placeholder="Вставьте ссылку на видео"
              :class="{ 'error': error, 'success': videoData.thumbnail }"
            />
            <button 
              v-if="videoUrl" 
              @click="clearUrl" 
              class="clear-url-btn"
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <!-- Статус загрузки и ошибки -->
          <div v-if="loading" class="status-message loading">
            <svg class="loading-spinner" width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="7" stroke="#5856D2" stroke-width="2" fill="none" stroke-dasharray="44" stroke-dashoffset="44">
                <animate attributeName="stroke-dashoffset" dur="1s" values="44;0" repeatCount="indefinite"/>
              </circle>
            </svg>
            Загрузка превью...
          </div>
          
          <div v-if="error" class="status-message error">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 15H1L8 1Z" stroke="#EF4444" stroke-width="1.5" fill="none"/>
              <path d="M8 6V10M8 12V12.5" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            {{ error }}
          </div>
          
          <div v-if="videoData.thumbnail && !error" class="status-message success">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 4L6 11L3 8" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Видео успешно загружено
            <span v-if="videoData.title" class="video-title">: {{ videoData.title }}</span>
          </div>
          
          <div class="upload-description">
            <p><strong>Поддерживаемые сервисы:</strong> YouTube, ВКонтакте, Vimeo</p>
          </div>
        </div>
        
        <!-- Заблокированный режим -->
        <div v-else class="premium-lock-content">
          <h3 class="premium-title">Доступно в тарифе Premium</h3>
          
          <button class="upgrade-to-premium-btn" @click="activateFeature">
            К тарифу
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddVideo",
  data() {
    return {
      isActivated: false, // простое локальное состояние
      videoUrl: '',
      loading: false,
      error: null,
      videoData: {
        url: null,
        thumbnail: null,
        title: null,
        service: null,
        videoId: null
      }
    };
  },
  methods: {
    // Просто активируем функцию
    activateFeature() {
      this.isActivated = true;
    },
    
    async handleUrlInput() {
      if (!this.videoUrl.trim()) {
        this.clearVideoData();
        return;
      }
      
      clearTimeout(this.inputTimeout);
      this.inputTimeout = setTimeout(() => {
        this.processVideoUrl();
      }, 500);
    },
    
    handleUrlPaste(event) {
      setTimeout(() => {
        this.processVideoUrl();
      }, 100);
    },
    
    async processVideoUrl() {
      const url = this.videoUrl.trim();
      if (!url) return;
      
      this.loading = true;
      this.error = null;
      
      try {
        const videoInfo = this.parseVideoUrl(url);
        
        if (!videoInfo) {
          throw new Error('Неподдерживаемая ссылка. Используйте YouTube, ВКонтакте или Vimeo');
        }
        
        const thumbnail = await this.getThumbnail(videoInfo);
        
        this.videoData = {
          url: url,
          thumbnail: thumbnail,
          title: videoInfo.title,
          service: videoInfo.service,
          videoId: videoInfo.videoId
        };
        
      } catch (err) {
        this.error = err.message;
        this.clearVideoData();
      } finally {
        this.loading = false;
      }
    },
    
    parseVideoUrl(url) {
      const youtubePatterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
      ];
      
      const vkPatterns = [
        /vk\.com\/video(-?\d+_\d+)/,
        /vk\.com\/clip(-?\d+_\d+)/
      ];
      
      const vimeoPatterns = [
        /vimeo\.com\/(\d+)/,
        /player\.vimeo\.com\/video\/(\d+)/
      ];
      
      for (const pattern of youtubePatterns) {
        const match = url.match(pattern);
        if (match) {
          return {
            service: 'youtube',
            videoId: match[1],
            title: null
          };
        }
      }
      
      for (const pattern of vkPatterns) {
        const match = url.match(pattern);
        if (match) {
          return {
            service: 'vk',
            videoId: match[1],
            title: null
          };
        }
      }
      
      for (const pattern of vimeoPatterns) {
        const match = url.match(pattern);
        if (match) {
          return {
            service: 'vimeo',
            videoId: match[1],
            title: null
          };
        }
      }
      
      return null;
    },
    
    async getThumbnail(videoInfo) {
      const { service, videoId } = videoInfo;
      
      switch (service) {
        case 'youtube':
          return this.getYouTubeThumbnail(videoId);
          
        case 'vk':
          return this.getVKThumbnail(videoId);
          
        case 'vimeo':
          return this.getVimeoThumbnail(videoId);
          
        default:
          throw new Error('Неизвестный сервис');
      }
    },
    
    async getYouTubeThumbnail(videoId) {
      const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default'];
      
      for (const quality of qualities) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
        
        try {
          await this.checkImageExists(thumbnailUrl);
          return thumbnailUrl;
        } catch (e) {
          continue;
        }
      }
      
      throw new Error('Не удалось загрузить превью YouTube видео');
    },
    
    async getVKThumbnail(videoId) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjM5IiBoZWlnaHQ9IjIxNSIgdmlld0JveD0iMCAwIDIzOSAyMTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMzkiIGhlaWdodD0iMjE1IiByeD0iMTIiIGZpbGw9IiM0QzZEQkYiLz4KPHN2ZyB4PSI5MS41IiB5PSI3Ny41IiB3aWR0aD0iNTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA1NiA2MCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yOCAzMEwxNCAyMEgxNFY0MEwyOCAzMFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yOCAzMEw0MiAyMEg0MlY0MEwyOCAzMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K';
    },
    
    async getVimeoThumbnail(videoId) {
      try {
        const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
        
        if (!response.ok) {
          throw new Error('Видео не найдено');
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0].thumbnail_large) {
          this.videoData.title = data[0].title;
          return data[0].thumbnail_large;
        }
        
        throw new Error('Превью не найдено');
      } catch (e) {
        throw new Error('Не удалось загрузить превью Vimeo видео');
      }
    },
    
    checkImageExists(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error('Image not found'));
        img.src = url;
      });
    },
    
    clearUrl() {
      this.videoUrl = '';
      this.clearVideoData();
    },
    
    clearVideoData() {
      this.videoData = {
        url: null,
        thumbnail: null,
        title: null,
        service: null,
        videoId: null
      };
      this.error = null;
    },
    
    removeVideo() {
      this.clearUrl();
    }
  },
  
  beforeUnmount() {
    if (this.inputTimeout) {
      clearTimeout(this.inputTimeout);
    }
  }
};
</script>

<style scoped>
@import "/src/assets/add-product/add-video.css";
</style>