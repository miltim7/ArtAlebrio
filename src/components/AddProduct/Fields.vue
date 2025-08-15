<!-- src\components\AddProduct\Fields.vue -->

<template>
 <div class="fields-container fields-part1">
   <div class="field-group">
     <label class="field-label">Наименование:</label>
     <div class="field-wrapper">
       <div class="field-description">
         Добавьте в название ключевые слова, которые покупатели могут использовать для
         поиска товара.
       </div>
       <div class="input-with-counter">
         <div
           ref="nameInput"
           class="field-input without-smiles editable-input"
           contenteditable="true"
           :data-placeholder="localFormData.name ? '' : '(Без смайлов)'"
           @input="handleNameInput"
           @keydown="handleKeydown"
           @paste="handlePaste"
         ></div>
         <div class="character-counter">{{ localFormData.name.length }}/140</div>
       </div>
     </div>
   </div>

   <div class="field-group">
     <label class="field-label">Папка товаров:</label>
     <select class="field-select" v-model="localFormData.folder" @change="emitUpdate">
       <option value="" disabled selected>Выберите галерею</option>
     </select>
   </div>

   <div class="field-group">
     <label class="field-label">Категория:</label>
     <select class="field-select" v-model="localFormData.category" @change="emitUpdate">
       <option value="" disabled>Выберите категорию</option>
       <option value="paintings">Картины</option>
       <option value="clothing">Одежда</option>
     </select>
   </div>

   <div class="field-group">
     <label class="field-label">Подкатегория:</label>
     <select
       class="field-select"
       v-model="localFormData.subcategory"
       @change="emitUpdate"
     >
       <option value="" disabled>Выберите подкатегорию</option>
       <!-- Для картин -->
       <template v-if="localFormData.category === 'paintings'">
         <option value="abstract">Абстракция</option>
         <option value="portrait">Портрет</option>
         <option value="landscape">Пейзаж</option>
         <option value="still-life">Натюрморт</option>
         <option value="spirituality">Духовность</option>
       </template>
       <!-- Для одежды -->
       <template v-if="localFormData.category === 'clothing'">
         <option value="mens">Мужская одежда</option>
         <option value="womens">Женская одежда</option>
         <option value="unisex">Унисекс</option>
         <option value="children">Детская одежда</option>
       </template>
     </select>
   </div>

   <div class="field-group">
     <label class="field-label">Раздел:</label>
     <select class="field-select" v-model="localFormData.section" @change="emitUpdate">
       <option value="" disabled selected>Выберите</option>
     </select>
   </div>

   <div class="field-group">
     <label class="field-label">Описание:</label>
     <textarea
       class="field-textarea"
       placeholder="Введите описание работы"
       v-model="localFormData.description"
       @input="emitUpdate"
     ></textarea>
   </div>

   <div class="field-group">
     <label class="field-label">Ключевые слова <br />(необязательно):</label>
     <div class="keywords-container">
       <div class="keywords-input-wrapper">
         <input
           type="text"
           class="field-input keywords-input"
           placeholder="(Максимальное количество для ввода - 13)"
           v-model="localFormData.keywords"
           @keydown.enter.prevent="addKeyword"
         />
         <button
           class="keywords-add-btn"
           @click="addKeyword"
           type="button"
           :disabled="
             !localFormData.keywords.trim() || localFormData.keywordsList.length >= 13
           "
         >
           <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
             <path
               d="M8 3V13M3 8H13"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
             />
           </svg>
         </button>
       </div>
       <div class="keywords-tags" v-if="localFormData.keywordsList.length > 0">
         <div
           class="keyword-tag"
           v-for="(keyword, index) in localFormData.keywordsList"
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
             </svg>
           </button>
         </div>
       </div>
     </div>
   </div>
 </div>

 <div class="fields-container fields-part2">
   <div class="field-group">
     <label class="field-label">Материалы:</label>
     <select class="field-select" v-model="localFormData.materials" @change="emitUpdate">
       <option value="" disabled selected>
         (Максимальное количество для выбора - 5)
       </option>
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

     <!-- Для картин - три поля -->
     <div v-if="localFormData.category === 'paintings'" class="dimensions-group">
       <input
         type="text"
         class="dimension-input size-input"
         placeholder="Длина"
         v-model="localFormData.length"
         @input="emitUpdate"
       />
       <span class="dimension-separator">—</span>
       <input
         type="text"
         class="dimension-input size-input"
         placeholder="Высота"
         v-model="localFormData.height"
         @input="emitUpdate"
       />
       <span class="dimension-separator">—</span>
       <input
         type="text"
         class="dimension-input size-input"
         placeholder="Ширина"
         v-model="localFormData.width"
         @input="emitUpdate"
       />
     </div>

     <!-- Для одежды - select -->
     <div v-else-if="localFormData.category === 'clothing'">
       <select
         class="field-select"
         v-model="localFormData.clothingSize"
         @change="emitUpdate"
       >
         <option value="" disabled selected>Выберите размер</option>
         <option value="XXS">XXS</option>
         <option value="XS">XS</option>
         <option value="S">S</option>
         <option value="M">M</option>
         <option value="L">L</option>
         <option value="XL">XL</option>
         <option value="XXL">XXL</option>
         <option value="3XL">3XL</option>
         <option value="4XL">4XL</option>
         <option value="5XL">5XL</option>
       </select>
     </div>

     <!-- Если ничего не выбрано -->
     <div v-else>
       <select class="field-select" disabled>
         <option value="" disabled selected>Выберите размер</option>
       </select>
     </div>
   </div>

   <div class="field-group">
     <label class="field-label">Укажите преобладающие цвета:</label>
     <div class="custom-select-container" ref="colorsContainer">
       <div class="custom-select-header" @click="toggleColorsDropdown">
         <div class="selected-colors-display">
           <template v-if="localFormData.colors.length === 0">
             <span class="custom-select-text">Выберите цвет</span>
           </template>
           <template v-else>
             <div class="selected-colors">
               <div
                 class="selected-color-item"
                 v-for="colorValue in localFormData.colors"
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
             :checked="localFormData.colors.includes(color.value)"
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
     <select class="field-select" v-model="localFormData.status" @change="emitUpdate">
       <option value="" disabled>Выберите статус</option>
       <option value="for-sale">На продажу</option>
     </select>
   </div>

   <div class="field-group">
     <label class="field-label">Тип товара:</label>
     <select
       class="field-select"
       v-model="localFormData.productType"
       @change="emitUpdate"
     >
       <option value="" disabled selected>Тип товара:</option>
     </select>
   </div>

   <div class="pricing-section">
     <h3 class="pricing-title">Укажите стоимость <br />без учета доставки:</h3>

     <div class="pricing-row">
       <div class="price-group">
         <label class="price-label">Внутренние</label>
         <div class="price-inputs">
           <div class="price-field-with-currency">
             <label class="price-field-label">Ваша цена</label>
             <div class="price-input-container">
               <input
                 type="number"
                 class="price-input-multiline"
                 placeholder="0"
                 v-model="localFormData.internalPrice"
                 @input="emitUpdate"
               />
               <span class="currency-symbol">₽</span>
             </div>
           </div>
           <div class="price-field-with-currency">
             <label class="price-field-label">Цена до скидки</label>
             <div class="price-input-container">
               <input
                 type="number"
                 class="price-input-multiline"
                 placeholder="0"
                 v-model="localFormData.discountPrice"
                 @input="emitUpdate"
               />
               <span class="currency-symbol">₽</span>
             </div>
           </div>
           <div class="toggle-field">
             <label class="toggle-container">
               <span class="toggle-text"
                 >Внутренние и Мировые <br />цены (опционально)</span
               >
               <input
                 type="checkbox"
                 v-model="localFormData.globalPricing"
                 @change="emitUpdate"
                 checked
               />
               <span class="toggle-slider"></span>
             </label>
           </div>
         </div>
       </div>
     </div>

     <div class="pricing-row" v-if="localFormData.globalPricing">
       <div class="price-group">
         <label class="price-label">Где-либо еще</label>
         <div class="price-inputs">
           <div class="price-field-with-currency">
             <label class="price-field-label">Ваша цена</label>
             <div class="price-input-container">
               <input
                 type="number"
                 class="price-input-multiline"
                 placeholder="0"
                 v-model="localFormData.otherRegularPrice"
                 @input="emitUpdate"
               />
               <span class="currency-symbol">₽</span>
             </div>
           </div>
           <div class="price-field-with-currency">
             <label class="price-field-label">Цена до скидки</label>
             <div class="price-input-container">
               <input
                 type="number"
                 class="price-input-multiline"
                 placeholder="0"
                 v-model="localFormData.otherDiscountPrice"
                 @input="emitUpdate"
               />
               <span class="currency-symbol">₽</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>

   <div class="field-group">
     <label class="field-label">Количество шт.</label>
     <div class="quantity-input">
       <input
         type="number"
         class="quantity-field"
         v-model="localFormData.quantity"
         @input="emitUpdate"
         min="1"
       />
     </div>
   </div>

   <div class="field-group">
     <label class="field-label">Упаковка:</label>
     <select class="field-select" v-model="localFormData.packaging" @change="emitUpdate">
       <option value="" disabled selected>Упаковка</option>
     </select>
   </div>
 </div>
</template>

<script>
export default {
 name: "Fields",
 props: {
   formData: {
     type: Object,
     default: () => ({}),
   },
 },
 emits: ["update:form-data"],
 data() {
   return {
     isColorsOpen: false,
     colorOptions: [
       { value: "white", name: "Белый", hex: "#FFFFFF" },
       { value: "red", name: "Красный", hex: "#EF4444" },
       { value: "orange", name: "Оранжевый", hex: "#F97316" },
       { value: "brown", name: "Коричневый", hex: "#A16207" },
       { value: "blue", name: "Синий", hex: "#3B82F6" },
       { value: "purple", name: "Фиолетовый", hex: "#A855F7" },
       { value: "green", name: "Зеленый", hex: "#22C55E" },
       { value: "black", name: "Черный", hex: "#000000" },
       { value: "gray", name: "Серый", hex: "#6B7280" },
       { value: "yellow", name: "Желтый", hex: "#EAB308" },
       { value: "pink", name: "Розовый", hex: "#EC4899" },
       { value: "cyan", name: "Голубой", hex: "#06B6D4" },
     ],
     localFormData: {
       name: "",
       folder: "",
       category: "paintings",
       subcategory: "abstract",
       section: "",
       description: "",
       keywords: "",
       keywordsList: [],
       materials: "",
       length: "",
       height: "",
       width: "",
       clothingSize: "",
       colors: [],
       status: "for-sale",
       productType: "",
       internalPrice: 0,
       discountPrice: 0,
       globalPricing: true,
       otherRegularPrice: 0,
       otherDiscountPrice: 0,
       quantity: 1,
       packaging: "",
     },
   };
 },

 created() {
   // Принудительно устанавливаем дефолтные значения
   this.localFormData.category = "paintings";
   this.localFormData.subcategory = "abstract";
   this.localFormData.status = "for-sale";
   this.localFormData.otherRegularPrice = 0;
   this.localFormData.otherDiscountPrice = 0;

   // Сразу отправляем родителю
   this.$nextTick(() => {
     this.emitUpdate();
   });
 },

 watch: {
   formData: {
     handler(newVal) {
       // Только если пришли данные от родителя И они не пустые
       if (newVal && Object.keys(newVal).length > 0 && newVal.category) {
         this.localFormData = { ...this.localFormData, ...newVal };
       }
     },
     deep: true,
     immediate: true,
   },
   "localFormData.category"(newCategory, oldCategory) {
     if (newCategory !== oldCategory) {
       this.localFormData.length = "";
       this.localFormData.height = "";
       this.localFormData.width = "";
       this.localFormData.clothingSize = "";

       if (newCategory === "paintings") {
         this.localFormData.subcategory = "abstract";
       } else if (newCategory === "clothing") {
         this.localFormData.subcategory = "mens";
       } else {
         this.localFormData.subcategory = "";
       }

       this.emitUpdate();
     }
   },
   'formData.name'(newVal) {
     if (newVal !== this.localFormData.name && this.$refs.nameInput) {
       this.$refs.nameInput.textContent = newVal || '';
     }
   }
 },

 methods: {
   emitUpdate() {
     this.$emit("update:form-data", this.localFormData);
   },
   getColorHex(colorValue) {
     const color = this.colorOptions.find((c) => c.value === colorValue);
     return color ? color.hex : "#000000";
   },
   getColorName(colorValue) {
     const color = this.colorOptions.find((c) => c.value === colorValue);
     return color ? color.name : "";
   },
   addKeyword() {
     const keyword = this.localFormData.keywords.trim();
     if (
       keyword &&
       !this.localFormData.keywordsList.includes(keyword) &&
       this.localFormData.keywordsList.length < 13
     ) {
       this.localFormData.keywordsList.push(keyword);
       this.localFormData.keywords = "";
       this.emitUpdate();
     }
   },
   removeKeyword(index) {
     this.localFormData.keywordsList.splice(index, 1);
     this.emitUpdate();
   },
   toggleColorsDropdown() {
     this.isColorsOpen = !this.isColorsOpen;
     this.$nextTick(() => {
       const header = this.$refs.colorsContainer?.querySelector(".custom-select-header");
       if (header) {
         header.classList.toggle("open", this.isColorsOpen);
       }
     });
   },
   toggleColor(colorValue) {
     const index = this.localFormData.colors.indexOf(colorValue);
     if (index > -1) {
       this.localFormData.colors.splice(index, 1);
     } else {
       this.localFormData.colors.push(colorValue);
     }
     this.emitUpdate();
   },
   handleClickOutside(event) {
     if (
       this.$refs.colorsContainer &&
       !this.$refs.colorsContainer.contains(event.target)
     ) {
       this.isColorsOpen = false;
     }
   },
   
   // НОВЫЕ МЕТОДЫ ДЛЯ CONTENTEDITABLE
   handleNameInput(event) {
     const text = event.target.textContent || '';
     
     // Ограничиваем длину текста
     if (text.length > 140) {
       const truncated = text.substring(0, 140);
       event.target.textContent = truncated;
       
       // Устанавливаем курсор в конец
       const range = document.createRange();
       const selection = window.getSelection();
       range.selectNodeContents(event.target);
       range.collapse(false);
       selection.removeAllRanges();
       selection.addRange(range);
       
       this.localFormData.name = truncated;
     } else {
       this.localFormData.name = text;
     }
     
     this.emitUpdate();
   },

   handleKeydown(event) {
     // Запрещаем Enter - оставляем однострочность
     if (event.key === 'Enter') {
       event.preventDefault();
     }
     
     // Проверяем лимит символов при вводе
     const text = event.target.textContent || '';
     if (text.length >= 140 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
       event.preventDefault();
     }
   },

   handlePaste(event) {
     event.preventDefault();
     
     // Получаем вставляемый текст
     const paste = (event.clipboardData || window.clipboardData).getData('text');
     const currentText = event.target.textContent || '';
     
     // Вычисляем сколько символов можно добавить
     const remainingChars = 140 - currentText.length;
     const textToInsert = paste.substring(0, remainingChars);
     
     // Вставляем текст в позицию курсора
     const selection = window.getSelection();
     if (selection.rangeCount > 0) {
       const range = selection.getRangeAt(0);
       range.deleteContents();
       range.insertNode(document.createTextNode(textToInsert));
       range.collapse(false);
       selection.removeAllRanges();
       selection.addRange(range);
     }
     
     // Обновляем модель
     this.localFormData.name = event.target.textContent;
     this.emitUpdate();
   },
 },

 mounted() {
   document.addEventListener("click", this.handleClickOutside);

   // ЕЩЕ РАЗ ПРИНУДИТЕЛЬНО В MOUNTED
   this.$nextTick(() => {
     if (!this.localFormData.category) {
       this.localFormData.category = "paintings";
       this.localFormData.subcategory = "abstract";
       this.localFormData.status = "for-sale";
       this.localFormData.otherRegularPrice = 0;
       this.localFormData.otherDiscountPrice = 0;
       this.emitUpdate();
     }
     
     // Устанавливаем начальное значение для contenteditable
     if (this.$refs.nameInput && this.localFormData.name) {
       this.$refs.nameInput.textContent = this.localFormData.name;
     }
   });
 },

 beforeUnmount() {
   document.removeEventListener("click", this.handleClickOutside);
 },
};
</script>

<style scoped>
@import "/src/assets/add-product/fields.css";
</style>