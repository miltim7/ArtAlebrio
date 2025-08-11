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
      <label class="field-label">Ключевые слова<br>(необязательно):</label>
      <input 
        type="text" 
        class="field-input" 
        placeholder="(Максимальное количество для ввода - 13)"
        v-model="formData.keywords"
      />
    </div>
  </div>

  <div class="fields-container fields-part2">
    <div class="field-group">
      <label class="field-label">Материалы:</label>
      <select class="field-select" v-model="formData.materials">
        <option value="" disabled selected>(Максимальное количество для выбора - 5)</option>
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
      <select class="field-select" v-model="formData.colors">
        <option value="" disabled selected>Выберите цвет</option>
      </select>
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
      <h3 class="pricing-title">Укажите стоимость<br>без учета доставки:</h3>
      
      <div class="pricing-row">
        <div class="price-group">
          <label class="price-label">Внутренние</label>
          <div class="price-inputs">
            <div class="price-field-with-currency">
              <input 
                type="number" 
                class="price-input-multiline" 
                placeholder="Ваша цена ₽&#10;0"
                v-model="formData.internalPrice"
              />
              <span class="currency-symbol">₽</span>
            </div>
            <div class="price-field-with-currency">
              <input 
                type="number" 
                class="price-input-multiline" 
                placeholder="Цена до скидки ₽&#10;0"
                v-model="formData.discountPrice"
              />
              <span class="currency-symbol">₽</span>
            </div>
            <div class="toggle-field">
              <label class="toggle-container">
                <span class="toggle-text">Внутренние и Мировые<br>цены (опционально)</span>
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
      formData: {
        name: '',
        folder: '',
        category: 'architecture',
        subcategory: 'spirituality', 
        section: '',
        description: '',
        keywords: '',
        materials: '',
        length: '',
        height: '',
        width: '',
        colors: '',
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
};
</script>

<style>
@import "/src/assets/add-product/fields.css";
</style>