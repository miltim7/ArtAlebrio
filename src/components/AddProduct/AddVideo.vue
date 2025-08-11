<!-- src\components\AddProduct\AddVideo.vue -->

<template>
  <div class="add-video-container">
    <div class="video-upload-section">
      <div class="video-preview-area">
        <div class="play-icon">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M21 18L37 28L21 38V18Z" stroke="#9A9AAD" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" fill="#9A9AAD"/>
          </svg>
        </div>
      </div>
      
      <div class="video-content">
        <h3 class="upload-title">Добавить ссылку на видео</h3>
        
        <div class="upload-description">
          <p>Допустимые форматы: mp4, ogy, webm; размер до 20Mb</p>
          
          <p>Оживите свой продукт с помощью видеоролика продолжительностью от 5 до 15 секунд. Это может помочь вам увеличить ваши продажи. В видео не будет звука, поэтому пусть говорит ваш продукт</p>
          
          <p>Настройте параметры для записи с высоким разрешением - стремитесь к 1080p</p>
          
          <p>Обережите ваше видео по завершении загрузки</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddVideo",
  data() {
    return {};
  },
};
</script>

<style>
@import "/src/assets/add-product/add-video.css";
</style>