<!-- src\components\AddProduct\AddProduct.vue -->
<template>
  <section class="breadcrumb-section">
    <div class="breadcrumb-container">
      <nav class="breadcrumb">
        <a href="#" class="breadcrumb-link">Главная</a>
        <span class="breadcrumb-separator">››</span>
        <span class="breadcrumb-current">Редактирование профиля</span>
      </nav>
    </div>
  </section>

  <div class="add-product-container">
    <h2 class="title">Добавить новый товар</h2>

    <div class="content-wrapper">
      <!-- Main image upload area -->
      <div class="main-image-area">
        <!-- Главное изображение -->
        <div class="main-image-section">
          <div class="main-upload-zone" :class="{ 'has-image': mainImage }" @click="triggerMainUpload">
            <div v-if="!mainImage" class="upload-placeholder">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="14" width="36" height="26" rx="4" stroke="#9ca3af" stroke-width="2" fill="none"/>
                <path d="M16 14L18 8H30L32 14" stroke="#9ca3af" stroke-width="2" fill="none"/>
                <circle cx="24" cy="27" r="8" stroke="#9ca3af" stroke-width="2" fill="none"/>
                <circle cx="24" cy="27" r="5" stroke="#9ca3af" stroke-width="1.5" fill="none"/>
                <circle cx="36" cy="20" r="2" fill="#9ca3af"/>
                <rect x="10" y="32" width="4" height="2" rx="1" fill="#9ca3af"/>
              </svg>
              <span class="upload-text">Нажмите для загрузки</span>
            </div>

            <div v-if="mainImage" class="main-image-container">
              <img :src="mainImage" alt="Main product image" class="main-image" />
              
              <!-- Кнопки для главного изображения -->
              <div class="main-image-actions">
                <button class="action-btn crop-btn" @click.stop="openCropModal(mainImage, 'main')">
                  <span>Обрезать</span>
                </button>
                <button class="action-btn" @click.stop="removeMainImage">
                  <span>Удалить</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Дополнительные изображения -->
        <div class="additional-images-section">
          <div class="additional-images">
            <div
              v-for="(image, index) in additionalImages"
              :key="index"
              class="additional-image"
            >
              <img :src="image" alt="Additional image" />
              <div class="image-actions">
                <button
                  class="corner-btn delete-btn"
                  @click.stop.prevent="removeAdditionalImage(index)"
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path
                      d="M8 5V11M4 5V11M1 3V12C1 12.5523 1.44772 13 2 13H10C10.5523 13 11 12.5523 11 12V4M1 3H3M1 3H-1M3 3L4 1H8L9 3M3 3H9M9 3H11M11 3H13"
                      stroke="white"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  class="corner-btn crop-btn"
                  @click.stop.prevent="openCropModal(image, index)"
                >
                  <img src="/images/add-product/cut-icon2.png" alt="Crop icon"/>
                </button>
              </div>
            </div>

            <!-- Add more images buttons -->
            <div
              v-for="slot in emptySlots"
              :key="`empty-${slot}`"
              class="add-image-btn"
              @click="triggerAdditionalUpload"
            >
              <span class="plus-icon">+</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side content -->
      <div class="right-content">
        <div class="section">
          <h3 class="section-title">Живопись</h3>
          <ul class="tips-list">
            <li>1. Максимальный формат - 2пг, в RGB цвете (не CMYK)</li>
            <li>2. Разрешение не менее 1500px</li>
            <li>3. в RGB цвете (не CMYK)</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">Советы:</h3>
          <ul class="advice-list">
            <li>Используйте до восьми фотографий</li>
            <li>Используйте естественный свет и без вспышки</li>
            <li>Старайтесь передать все цвета корректно, без пересветов и отражений</li>
            <li>Показать продукт, который вы держите, нужно или используете</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Checkbox -->
    <div class="checkbox-container">
      <label class="checkbox-label">
        <input type="checkbox" v-model="agreement" class="checkbox-input" />
        <span class="checkbox-custom"></span>
        <span class="checkbox-text">
          Отмечу, если изображения содержит обнаженное тело, эротику, насилие или другое
          деликатное содержание (18+).
        </span>
      </label>
    </div>

    <!-- Crop Modal -->
    <div v-if="showCropModal" class="crop-modal-overlay" @click.self="closeCropModal">
      <div class="crop-modal">
        <div class="crop-modal-header">
          <div class="crop-modal-title-wrapper">
            <img src="/images/add-product/cut-icon.png" alt="Cut icon" class="cut-icon" />
            <h3 class="crop-modal-title">Обрезать изображение</h3>
          </div>
          <button class="close-btn" @click="closeCropModal">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="#9F9F9F"
                stroke-width="1"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div class="crop-container">
          <div class="crop-image-wrapper" ref="cropImageWrapper">
            <img
              ref="cropImage"
              :src="currentCropImage"
              alt="Crop image"
              class="crop-image"
              :style="{ transform: `rotate(${cropAngle}deg)` }"
            />
            <div class="crop-overlay">
              <div class="crop-selection" :style="cropSelectionStyle">
                <!-- Corner handles -->
                <div
                  class="crop-handle corner-tl"
                  @mousedown="startResize('tl', $event)"
                  @touchstart="startResize('tl', $event)"
                ></div>
                <div
                  class="crop-handle corner-tr"
                  @mousedown="startResize('tr', $event)"
                  @touchstart="startResize('tr', $event)"
                ></div>
                <div
                  class="crop-handle corner-bl"
                  @mousedown="startResize('bl', $event)"
                  @touchstart="startResize('bl', $event)"
                ></div>
                <div
                  class="crop-handle corner-br"
                  @mousedown="startResize('br', $event)"
                  @touchstart="startResize('br', $event)"
                ></div>

                <!-- Edge handles -->
                <div
                  class="crop-handle edge-t"
                  @mousedown="startResize('t', $event)"
                  @touchstart="startResize('t', $event)"
                ></div>
                <div
                  class="crop-handle edge-r"
                  @mousedown="startResize('r', $event)"
                  @touchstart="startResize('r', $event)"
                ></div>
                <div
                  class="crop-handle edge-b"
                  @mousedown="startResize('b', $event)"
                  @touchstart="startResize('b', $event)"
                ></div>
                <div
                  class="crop-handle edge-l"
                  @mousedown="startResize('l', $event)"
                  @touchstart="startResize('l', $event)"
                ></div>

                <!-- Move handle -->
                <div
                  class="crop-move-area"
                  @mousedown="startMove($event)"
                  @touchstart="startMove($event)"
                ></div>
              </div>
            </div>
          </div>

          <div class="crop-controls">
            <label class="crop-angle-label">Угол {{ cropAngle }}°</label>
            <div class="angle-slider-container">
              <input
                type="range"
                v-model="cropAngle"
                min="-90"
                max="90"
                step="1"
                class="angle-slider"
                list="angle-marks"
              />
              <datalist id="angle-marks">
                <option value="-90"></option>
                <option value="-60"></option>
                <option value="-45"></option>
                <option value="-30"></option>
                <option value="-15"></option>
                <option value="0"></option>
                <option value="15"></option>
                <option value="30"></option>
                <option value="45"></option>
                <option value="60"></option>
                <option value="90"></option>
              </datalist>
              <div class="angle-marks">
                <span class="angle-mark" style="left: 0%">-90°</span>
                <span class="angle-mark" style="left: 16.67%">-60°</span>
                <span class="angle-mark" style="left: 25%">-45°</span>
                <span class="angle-mark" style="left: 33.33%">-30°</span>
                <span class="angle-mark" style="left: 41.67%">-15°</span>
                <span class="angle-mark" style="left: 50%">0°</span>
                <span class="angle-mark" style="left: 58.33%">15°</span>
                <span class="angle-mark" style="left: 66.67%">30°</span>
                <span class="angle-mark" style="left: 75%">45°</span>
                <span class="angle-mark" style="left: 83.33%">60°</span>
                <span class="angle-mark" style="left: 100%">90°</span>
              </div>
            </div>
          </div>
        </div>

        <div class="crop-modal-footer">
          <button class="crop-btn-primary" @click="applyCrop">Сохранить</button>
          <button class="crop-btn-secondary" @click="closeCropModal">Отменить</button>
        </div>
      </div>
    </div>

    <!-- Hidden file inputs -->
    <input
      ref="mainFileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="handleMainFileSelect"
    />
    <input
      ref="additionalFileInput"
      type="file"
      accept="image/*"
      multiple
      style="display: none"
      @change="handleAdditionalFileSelect"
    />
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      mainImage: null,
      additionalImages: [],
      agreement: false,
      maxAdditionalImages: 8,
      showCropModal: false,
      currentCropImage: null,
      currentCropIndex: null,
      cropAngle: 0,
      cropSelection: {
        x: 20,
        y: 20,
        width: 260,
        height: 160,
      },
      isDragging: false,
      isResizing: false,
      resizeHandle: null,
      lastMousePos: { x: 0, y: 0 },
    };
  },
  computed: {
    emptySlots() {
      return Math.max(0, this.maxAdditionalImages - this.additionalImages.length);
    },
    cropSelectionStyle() {
      return {
        left: this.cropSelection.x + "px",
        top: this.cropSelection.y + "px",
        width: this.cropSelection.width + "px",
        height: this.cropSelection.height + "px",
      };
    },
    cropContainerDimensions() {
      const width = window.innerWidth;
      if (width <= 480) {
        return { width: width - 64, height: 200 };
      } else if (width <= 767) {
        return { width: width - 48, height: 250 };
      } else {
        return { width: 452, height: 350 };
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.cleanupEventListeners();
  },
  methods: {
    triggerMainUpload() {
      this.$refs.mainFileInput.click();
    },

    triggerAdditionalUpload() {
      this.$refs.additionalFileInput.click();
    },

    handleMainFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        this.processMainImage(file);
      }
      event.target.value = "";
    },

    handleAdditionalFileSelect(event) {
      const files = Array.from(event.target.files);
      const remainingSlots = this.maxAdditionalImages - this.additionalImages.length;
      const filesToProcess = files.slice(0, remainingSlots);
      
      filesToProcess.forEach((file) => {
        this.processAdditionalImage(file);
      });
      
      event.target.value = "";
    },

    processMainImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.mainImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    processAdditionalImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.additionalImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    removeMainImage() {
      console.log("DELETING main image");
      this.mainImage = null;
    },

    removeAdditionalImage(index) {
      console.log("DELETING image at index:", index);
      this.additionalImages.splice(index, 1);
    },

    openCropModal(image, index) {
      console.log("OPENING CROP MODAL for index:", index);
      this.currentCropImage = image;
      this.currentCropIndex = index;
      this.showCropModal = true;
      this.cropAngle = 0;

      this.$nextTick(() => {
        this.updateCropSelection();
      });
    },

    updateCropSelection() {
      const dimensions = this.cropContainerDimensions;
      const defaultWidth = Math.min(200, dimensions.width * 0.5);
      const defaultHeight = Math.min(120, dimensions.height * 0.4);

      this.cropSelection = {
        x: (dimensions.width - defaultWidth) / 2,
        y: (dimensions.height - defaultHeight) / 2,
        width: defaultWidth,
        height: defaultHeight,
      };
    },

    closeCropModal() {
      this.showCropModal = false;
      this.currentCropImage = null;
      this.currentCropIndex = null;
      this.cleanupEventListeners();
    },

    handleWindowResize() {
      if (this.showCropModal) {
        this.updateCropSelection();
      }
    },

    getEventPos(event) {
      if (event.touches && event.touches.length > 0) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }
      return { x: event.clientX, y: event.clientY };
    },

    startMove(event) {
      this.isDragging = true;
      const pos = this.getEventPos(event);
      this.lastMousePos = { x: pos.x, y: pos.y };

      document.addEventListener("mousemove", this.handleMove);
      document.addEventListener("mouseup", this.stopMove);
      document.addEventListener("touchmove", this.handleMove, { passive: false });
      document.addEventListener("touchend", this.stopMove);

      event.preventDefault();
    },

    handleMove(event) {
      if (!this.isDragging) return;

      const pos = this.getEventPos(event);
      const deltaX = pos.x - this.lastMousePos.x;
      const deltaY = pos.y - this.lastMousePos.y;

      const dimensions = this.cropContainerDimensions;

      this.cropSelection.x = Math.max(
        0,
        Math.min(
          dimensions.width - this.cropSelection.width,
          this.cropSelection.x + deltaX
        )
      );
      this.cropSelection.y = Math.max(
        0,
        Math.min(
          dimensions.height - this.cropSelection.height,
          this.cropSelection.y + deltaY
        )
      );

      this.lastMousePos = { x: pos.x, y: pos.y };

      if (event.type.startsWith("touch")) {
        event.preventDefault();
      }
    },

    stopMove() {
      this.isDragging = false;
      this.cleanupEventListeners();
    },

    startResize(handle, event) {
      this.isResizing = true;
      this.resizeHandle = handle;
      const pos = this.getEventPos(event);
      this.lastMousePos = { x: pos.x, y: pos.y };

      document.addEventListener("mousemove", this.handleResize);
      document.addEventListener("mouseup", this.stopResize);
      document.addEventListener("touchmove", this.handleResize, { passive: false });
      document.addEventListener("touchend", this.stopResize);

      event.preventDefault();
    },

    handleResize(event) {
      if (!this.isResizing) return;

      const pos = this.getEventPos(event);
      const deltaX = pos.x - this.lastMousePos.x;
      const deltaY = pos.y - this.lastMousePos.y;

      const handle = this.resizeHandle;
      const selection = { ...this.cropSelection };

      if (handle.includes("t")) {
        selection.y += deltaY;
        selection.height -= deltaY;
      }
      if (handle.includes("b")) {
        selection.height += deltaY;
      }
      if (handle.includes("l")) {
        selection.x += deltaX;
        selection.width -= deltaX;
      }
      if (handle.includes("r")) {
        selection.width += deltaX;
      }

      const dimensions = this.cropContainerDimensions;
      const minSize = window.innerWidth <= 767 ? 30 : 50;

      if (
        selection.width >= minSize &&
        selection.height >= minSize &&
        selection.x >= 0 &&
        selection.y >= 0 &&
        selection.x + selection.width <= dimensions.width &&
        selection.y + selection.height <= dimensions.height
      ) {
        this.cropSelection = selection;
      }

      this.lastMousePos = { x: pos.x, y: pos.y };

      if (event.type.startsWith("touch")) {
        event.preventDefault();
      }
    },

    stopResize() {
      this.isResizing = false;
      this.resizeHandle = null;
      this.cleanupEventListeners();
    },

    cleanupEventListeners() {
      document.removeEventListener("mousemove", this.handleMove);
      document.removeEventListener("mouseup", this.stopMove);
      document.removeEventListener("mousemove", this.handleResize);
      document.removeEventListener("mouseup", this.stopResize);
      document.removeEventListener("touchmove", this.handleMove);
      document.removeEventListener("touchend", this.stopMove);
      document.removeEventListener("touchmove", this.handleResize);
      document.removeEventListener("touchend", this.stopResize);
    },

    applyCrop() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;

        const dimensions = this.cropContainerDimensions;
        const containerWidth = dimensions.width;
        const containerHeight = dimensions.height;

        const containerAspect = containerWidth / containerHeight;
        const imageAspect = originalWidth / originalHeight;

        let displayWidth, displayHeight, offsetX, offsetY;

        if (imageAspect > containerAspect) {
          displayWidth = containerWidth;
          displayHeight = containerWidth / imageAspect;
          offsetX = 0;
          offsetY = (containerHeight - displayHeight) / 2;
        } else {
          displayHeight = containerHeight;
          displayWidth = containerHeight * imageAspect;
          offsetX = (containerWidth - displayWidth) / 2;
          offsetY = 0;
        }

        const scaleX = originalWidth / displayWidth;
        const scaleY = originalHeight / displayHeight;

        const cropX = (this.cropSelection.x - offsetX) * scaleX;
        const cropY = (this.cropSelection.y - offsetY) * scaleY;
        const cropWidth = this.cropSelection.width * scaleX;
        const cropHeight = this.cropSelection.height * scaleY;

        const finalCropX = Math.max(0, Math.min(originalWidth - cropWidth, cropX));
        const finalCropY = Math.max(0, Math.min(originalHeight - cropHeight, cropY));
        const finalCropWidth = Math.min(cropWidth, originalWidth - finalCropX);
        const finalCropHeight = Math.min(cropHeight, originalHeight - finalCropY);

        if (this.cropAngle !== 0) {
          const angle = Math.abs((this.cropAngle * Math.PI) / 180);
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          canvas.width = Math.ceil(
            this.cropSelection.width * cos + this.cropSelection.height * sin
          );
          canvas.height = Math.ceil(
            this.cropSelection.width * sin + this.cropSelection.height * cos
          );
        } else {
          canvas.width = this.cropSelection.width;
          canvas.height = this.cropSelection.height;
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((this.cropAngle * Math.PI) / 180);

        ctx.drawImage(
          img,
          finalCropX,
          finalCropY,
          finalCropWidth,
          finalCropHeight,
          -this.cropSelection.width / 2,
          -this.cropSelection.height / 2,
          this.cropSelection.width,
          this.cropSelection.height
        );

        ctx.restore();

        const croppedImageData = canvas.toDataURL("image/jpeg", 0.9);

        if (this.currentCropIndex === 'main') {
          this.mainImage = croppedImageData;
        } else if (this.currentCropIndex !== null) {
          this.additionalImages.splice(this.currentCropIndex, 1, croppedImageData);
        }

        this.closeCropModal();
      };

      img.src = this.currentCropImage;
    },
  },
};
</script>

<style>
@import "/src/assets/add-product/add-product.css";
</style>