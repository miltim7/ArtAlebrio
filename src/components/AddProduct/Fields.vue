<!-- src\components\AddProduct\Fields.vue -->

<template>
  <div class="fields-container fields-part1">
    <div class="field-group">
      <label class="field-label">Наименование:</label>
      <input 
        type="text" 
        class="field-input" 
        placeholder="(без скидок)"
        v-model="formData.name"
      />
    </div>

    <div class="field-group">
      <label class="field-label">Папка товаров:</label>
      <select class="field-select" v-model="formData.folder">
        <option value="" disabled selected>Выберите галерею</option>
      </select>
    </div>

    <div class="field-group">
      <label class="field-label">Категория:</label>
      <select class="field-select" v-model="formData.category">
        <option value="" disabled>Выберите категорию</option>
        <option value="architecture" selected>Архитектура</option>
      </select>
    </div>

    <div class="field-group">
      <label class="field-label">Подкатегория:</label>
      <select class="field-select" v-model="formData.subcategory">
        <option value="" disabled>Выберите подкатегорию</option>
        <option value="spirituality" selected>Духовность</option>
      </select>
    </div>

    <div class="field-group">
      <label class="field-label">Раздел:</label>
      <select class="field-select" v-model="formData.section">
        <option value="" disabled selected>Выберите</option>
      </select>
    </div>

    <div class="field-group">
      <label class="field-label">Описание:</label>
      <textarea 
        class="field-textarea" 
        placeholder="Введите описание работы"
        v-model="formData.description"
      ></textarea>
    </div>

    <div class="field-group">
  <label class="field-label">Ключевые слова <br>(необязательно):</label>
  <div class="keywords-container">
    <div class="keywords-input-wrapper">
      <input 
        type="text" 
        class="field-input keywords-input" 
        placeholder="(Максимальное количество для ввода - 13)"
        v-model="formData.keywords"
        @keydown.enter.prevent="addKeyword"
      />
      <button 
        class="keywords-add-btn" 
        @click="addKeyword"
        type="button"
        :disabled="!formData.keywords.trim() || formData.keywordsList.length >= 13"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <div class="keywords-tags" v-if="formData.keywordsList.length > 0">
      <div 
        class="keyword-tag" 
        v-for="(keyword, index) in formData.keywordsList" 
        :key="index"
      >
        <span class="keyword-text">{{ keyword }}</span>
        <button class="keyword-remove" @click="removeKeyword(index)">
        <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="#9F9F9F"
                stroke-width="1"
                stroke-linecap="round"
              />
            </svg></button>
      </div>
    </div>
  </div>
</div>
  </div>

  <div class="fields-container fields-part2">
    <div class="field-group">
  <label class="field-label">Материалы:</label>
  <select class="field-select" v-model="formData.materials">
    <option value="" disabled selected>(Максимальное количество для выбора - 5)</option>
    <option value="option1">Выберите</option>
    <option value="option2">Выберите</option>
    <option value="option3">Выберите</option>
    <option value="option4">Выберите</option>
    <option value="option5">Выберите</option>
    <option value="option6">Выберите</option>
    <option value="option7">Выберите</option>
    <option value="option8">Выберите</option>
    <option value="option9">Выберите</option>
    <option value="option10">Выберите</option>
    <option value="option11">Выберите</option>
    <option value="option12">Выберите</option>
  </select>
</div>

    <div class="field-group">
      <label class="field-label">Размеры:</label>
      <div class="dimensions-group">
        <input 
          type="text" 
          class="dimension-input size-input" 
          placeholder="Длина"
          v-model="formData.length"
        />
        <span class="dimension-separator">—</span>
        <input 
          type="text" 
          class="dimension-input size-input" 
          placeholder="Высота"
          v-model="formData.height"
        />
        <span class="dimension-separator">—</span>
        <input 
          type="text" 
          class="dimension-input size-input" 
          placeholder="Ширина"
          v-model="formData.width"
        />
      </div>
    </div>

    <div class="field-group">
  <label class="field-label">Укажите преобладающие цвета:</label>
  <div class="custom-select-container" ref="colorsContainer">
    <div class="custom-select-header" @click="toggleColorsDropdown">
      <div class="selected-colors-display">
        <template v-if="formData.colors.length === 0">
          <span class="custom-select-text">Выберите цвет</span>
        </template>
        <template v-else>
          <div class="selected-colors">
            <div 
              class="selected-color-item" 
              v-for="colorValue in formData.colors" 
              :key="colorValue"
            >
              <div 
                class="selected-color-circle" 
                :style="{ backgroundColor: getColorHex(colorValue) }"
              ></div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="custom-select-dropdown" v-if="isColorsOpen">
      <div 
        class="color-option" 
        v-for="color in colorOptions" 
        :key="color.value"
        @click="toggleColor(color.value)"
      >
        <input 
          type="checkbox" 
          class="color-checkbox"
          :checked="formData.colors.includes(color.value)"
          @click.stop
        />
        <div class="color-circle" :style="{ backgroundColor: color.hex }"></div>
        <span class="color-name">{{ color.name }}</span>
      </div>
    </div>
  </div>
</div>
  </div>

  <div class="fields-container fields-part3">
    <div class="field-group">
      <label class="field-label">Статус:</label>
      <select class="field-select" v-model="formData.status">
        <option value="" disabled>Выберите статус</option>
        <option value="for-sale" selected>На продажу</option>
      </select>
    </div>

    <div class="field-group">
      <label class="field-label">Тип товара:</label>
      <select class="field-select" v-model="formData.productType">
        <option value="" disabled selected>Тип товара:</option>
      </select>
    </div>

    <div class="pricing-section">
      <h3 class="pricing-title">Укажите стоимость <br>без учета доставки:</h3>
      
      <div class="pricing-row">
        <div class="price-group">
          <label class="price-label">Внутренние</label>
          <div class="price-inputs">
            <div class="price-field-with-currency">
              <label class="price-field-label">Ваша цена ₽</label>
              <div class="price-input-container">
                <input 
                  type="number" 
                  class="price-input-multiline" 
                  placeholder="0"
                  v-model="formData.internalPrice"
                />
                <span class="currency-symbol">₽</span>
              </div>
            </div>
            <div class="price-field-with-currency">
              <label class="price-field-label">Цена до скидки ₽</label>
              <div class="price-input-container">
                <input 
                  type="number" 
                  class="price-input-multiline" 
                  placeholder="0"
                  v-model="formData.discountPrice"
                />
                <span class="currency-symbol">₽</span>
              </div>
            </div>
            <div class="toggle-field">
              <label class="toggle-container">
                <span class="toggle-text">Внутренние и Мировые <br>цены (опционально)</span>
                <input type="checkbox" v-model="formData.globalPricing" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field-group">
        <label class="field-label">Где-либо еще</label>
        <div class="price-with-currency">
          <input 
            type="number" 
            class="price-input-small" 
            placeholder="0"
            v-model="formData.otherPrice"
          />
          <span class="currency-symbol">₽</span>
        </div>
      </div>
    </div>

    <div class="field-group">
      <label class="field-label">Количество шт.</label>
      <div class="quantity-input">
        <input 
          type="number" 
          class="quantity-field" 
          v-model="formData.quantity"
          min="1"
        />
      </div>
    </div>

    <div class="field-group">
      <label class="field-label">Упаковка:</label>
      <select class="field-select" v-model="formData.packaging">
        <option value="" disabled selected>Упаковка</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fields",
  data() {
    return {
      isColorsOpen: false,
      colorOptions: [
        { value: 'white', name: 'Белый', hex: '#FFFFFF' },
        { value: 'red', name: 'Красный', hex: '#EF4444' },
        { value: 'orange', name: 'Оранжевый', hex: '#F97316' },
        { value: 'brown', name: 'Коричневый', hex: '#A16207' },
        { value: 'blue', name: 'Синий', hex: '#3B82F6' },
        { value: 'purple', name: 'Фиолетовый', hex: '#A855F7' },
        { value: 'green', name: 'Зеленый', hex: '#22C55E' },
        { value: 'black', name: 'Черный', hex: '#000000' },
        { value: 'gray', name: 'Серый', hex: '#6B7280' },
        { value: 'yellow', name: 'Желтый', hex: '#EAB308' },
        { value: 'pink', name: 'Розовый', hex: '#EC4899' },
        { value: 'cyan', name: 'Голубой', hex: '#06B6D4' }
      ],
      formData: {
        name: '',
        folder: '',
        category: 'architecture',
        subcategory: 'spirituality', 
        section: '',
        description: '',
        keywords: '',
        keywordsList: [],
        materials: '',
        length: '',
        height: '',
        width: '',
        colors: [],
        status: 'for-sale',
        productType: '',
        internalPrice: 0,
        discountPrice: 0,
        globalPricing: true,
        otherPrice: 0,
        quantity: 2,
        packaging: ''
      }
    };
  },
  methods: {
    getColorHex(colorValue) {
  const color = this.colorOptions.find(c => c.value === colorValue);
  return color ? color.hex : '#000000';
},
getColorName(colorValue) {
  const color = this.colorOptions.find(c => c.value === colorValue);
  return color ? color.name : '';
},
    addKeyword() {
      const keyword = this.formData.keywords.trim();
      if (keyword && !this.formData.keywordsList.includes(keyword) && this.formData.keywordsList.length < 13) {
        this.formData.keywordsList.push(keyword);
        this.formData.keywords = '';
      }
    },
    removeKeyword(index) {
      this.formData.keywordsList.splice(index, 1);
    },
    toggleColorsDropdown() {
  this.isColorsOpen = !this.isColorsOpen;
  this.$nextTick(() => {
    const header = this.$refs.colorsContainer?.querySelector('.custom-select-header');
    if (header) {
      header.classList.toggle('open', this.isColorsOpen);
    }
  });
},
    toggleColor(colorValue) {
      const index = this.formData.colors.indexOf(colorValue);
      if (index > -1) {
        this.formData.colors.splice(index, 1);
      } else {
        this.formData.colors.push(colorValue);
      }
    },
    handleClickOutside(event) {
      if (this.$refs.colorsContainer && !this.$refs.colorsContainer.contains(event.target)) {
        this.isColorsOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style>
@import "/src/assets/add-product/fields.css";
</style>