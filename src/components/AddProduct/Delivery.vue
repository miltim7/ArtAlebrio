<!-- src\components\AddProduct\Delivery.vue -->

<template>
<div class="delivery-container">
  <div class="delivery-section">
    <div class="delivery-label">Доставка:</div>
    
    <div class="delivery-options">
      <div
        v-for="(option, index) in deliveryOptions"
        :key="index"
        class="delivery-option"
        :class="{ selected: option.selected }"
      >
        <div class="delivery-option-header">
          <label class="delivery-checkbox-container">
            <input
              type="checkbox"
              v-model="option.selected"
              class="delivery-checkbox"
            />
            <span class="delivery-checkbox-custom"></span>
          </label>

          <span class="delivery-option-name">{{ option.name }}</span>

          <div class="delivery-option-actions">
            <button class="delivery-action-btn edit-btn" @click="editOption(index)">
              Изменить
            </button>
            <button class="delivery-action-btn delete-btn" @click="deleteOption(index)">
              <img
                src="/images/delivery/delete.png"
                alt="Удалить"
                width="12.4"
                height="16"
              />
            </button>
          </div>
        </div>

        <div class="delivery-option-details">
          <div class="delivery-detail-row">
            <div class="delivery-detail-icon">
              <img
                src="/images/delivery/earth.png"
                alt="Страна продавца"
                width="16"
                height="16"
              />
            </div>
            <span class="delivery-detail-label">Страна продавца</span>
            <span class="delivery-detail-time">{{ option.domestic.time }}</span>
            <span class="delivery-detail-cost">{{ option.domestic.cost }}</span>
          </div>

          <div class="delivery-detail-row">
            <div class="delivery-detail-icon">
              <img
                src="/images/delivery/out-of-earth.png"
                alt="Вне страны"
                width="20"
                height="20"
              />
            </div>
            <span class="delivery-detail-label">Вне страны</span>
            <span class="delivery-detail-time">{{ option.international.time }}</span>
            <span class="delivery-detail-cost">{{ option.international.cost }}</span>
          </div>

          <!-- Additional countries -->
          <div
            v-for="(country, countryIndex) in option.additionalCountries"
            :key="countryIndex"
            class="delivery-detail-row"
          >
            <div class="delivery-detail-icon">
              <img
                src="/images/delivery/earth.png"
                alt="Доп. страна"
                width="16"
                height="16"
              />
            </div>
            <span class="delivery-detail-label">{{ country.country }}</span>
            <span class="delivery-detail-time">{{ country.time }}</span>
            <span class="delivery-detail-cost">{{ country.cost }}</span>
          </div>
        </div>
      </div>

      <button class="add-delivery-option-btn" @click="addNewDeliveryProfile">
        <div class="plus-circle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1v14M1 8h14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        Добавить вариант доставки
      </button>
    </div>
  </div>

  <!-- Delivery Cost Calculator -->
  <div class="delivery-cost-calculator">
    <div class="cost-calculator-header">
      <h3 class="cost-calculator-title">Предварительная стоимость с доставкой</h3>
      <p class="cost-calculator-description">Посмотрите, сколько покупатели будут платить за почтовые расходы</p>
    </div>

    <div class="cost-calculator-content">
      <div class="delivery-type-select">
        <select v-model="selectedDeliveryType" class="delivery-type-dropdown">
          <option value="international">Международная доставка</option>
          <option value="domestic">Страна продавца</option>
          <option value="additional">Дополнительные страны</option>
        </select>
      </div>

      <div class="cost-breakdown">
        <div class="cost-row">
          <span class="cost-label">Стоимость доставки:</span>
          <span class="cost-value">{{ formattedDeliveryCost }}</span>
        </div>
        <div class="cost-row">
          <span class="cost-label">Стоимость товара:</span>
          <span class="cost-value">{{ formattedProductCost }}</span>
        </div>
        <div class="cost-row">
          <span class="cost-label">Общая стоимость:</span>
          <span class="cost-value total-cost">{{ formattedTotalCost }}</span>
        </div>
        <div class="cost-row profit-row">
          <span class="cost-label">Ваша прибыль:</span>
          <span class="cost-value profit-value">{{ formattedProfit }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Action Buttons -->
  <div class="delivery-main-buttons">
    <button class="delivery-main-btn-primary">Сохранить</button>
    <button class="delivery-main-btn-secondary">Отменить</button>
  </div>

  <!-- Delivery Modal -->
  <div v-if="showDeliveryModal" class="delivery-modal-overlay" @click="closeModal">
    <div class="delivery-modal" @click.stop>
      <div class="delivery-modal-header">
        <h3 class="delivery-modal-title">
          {{
            isEditing
              ? "Редактирование профиля доставки"
              : "Добавление профиля доставки"
          }}
        </h3>
        <button class="close-btn" @click="closeModal">
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

      <div class="delivery-modal-content">
        <div class="delivery-form-row">
          <label class="delivery-field-label">Название профиля:</label>
          <input
            type="text"
            v-model="newDeliveryProfile.name"
            class="delivery-field-input"
            placeholder="Название профиля"
          />
        </div>

        <div class="delivery-form-field">
          <p class="delivery-description">
            Укажите примерную стоимость доставки в вашем регионе и вне страны продавца.
            При необходимости добавьте доставку в определенную страну.
          </p>
        </div>

        <!-- Domestic Delivery Block -->
        <div class="delivery-block">
          <div class="delivery-form-row">
            <label class="delivery-field-label">Страна продавца</label>
            <select
              v-model="newDeliveryProfile.domesticCountry"
              class="delivery-field-select"
            >
              <option value="USA">USA</option>
              <option value="RU">Россия</option>
              <option value="CN">Китай</option>
            </select>
          </div>

          <div class="delivery-form-row">
            <label class="delivery-field-label">Время доставки</label>
            <div class="delivery-time-inputs">
              <select
                v-model="newDeliveryProfile.domesticTimeFrom"
                class="delivery-time-select"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <span class="delivery-time-separator">—</span>
              <select
                v-model="newDeliveryProfile.domesticTimeTo"
                class="delivery-time-select"
              >
                <option value="7">7</option>
                <option value="14">14</option>
                <option value="21">21</option>
                <option value="30">30</option>
                <option value="37">37</option>
              </select>
              <span class="delivery-time-text">рабочих дней</span>
            </div>
          </div>

          <div class="delivery-form-row">
            <label class="delivery-field-label delivery-cost">Стоимость доставки</label>
            <div class="delivery-cost-options">
              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="newDeliveryProfile.domesticFree"
                  class="delivery-cost-checkbox"
                  @change="toggleDomesticFree"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">Бесплатная доставка</span>
              </label>

              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="newDeliveryProfile.domesticFixed"
                  class="delivery-cost-checkbox"
                  @change="toggleDomesticFixed"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                <input
                  type="number"
                  v-model="newDeliveryProfile.domesticFixedValue"
                  class="delivery-cost-input"
                  placeholder="5000"
                  :disabled="!newDeliveryProfile.domesticFixed"
                  data-field="domesticFixedValue"
                  @input="limitNumberInput"
                  max="999999"
                />
                <span class="delivery-currency">₽</span>
              </label>

              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="newDeliveryProfile.domesticPerItem"
                  class="delivery-cost-checkbox"
                  @change="toggleDomesticPerItem"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">За каждый предмет</span>
                <input
                  type="number"
                  v-model="newDeliveryProfile.domesticPerItemValue"
                  class="delivery-cost-input"
                  placeholder="0"
                  :disabled="!newDeliveryProfile.domesticPerItem"
                  data-field="domesticPerItemValue"
                  @input="limitNumberInput"
                  max="999999"
                />
                <span class="delivery-currency">₽</span>
              </label>
            </div>
          </div>
        </div>

        <!-- International Delivery Block -->
        <div class="delivery-block">
          <span class="delivery-section-title">Вне страны продавца</span>

          <div class="delivery-form-row">
            <label class="delivery-field-label">Время доставки</label>
            <div class="delivery-time-inputs">
              <select
                v-model="newDeliveryProfile.internationalTimeFrom"
                class="delivery-time-select"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <span class="delivery-time-separator">—</span>
              <select
                v-model="newDeliveryProfile.internationalTimeTo"
                class="delivery-time-select"
              >
                <option value="7">7</option>
                <option value="14">14</option>
                <option value="21">21</option>
                <option value="30">30</option>
                <option value="37">37</option>
              </select>
              <span class="delivery-time-text">рабочих дней</span>
            </div>
          </div>

          <div class="delivery-form-row">
            <label class="delivery-field-label delivery-cost">Стоимость доставки</label>
            <div class="delivery-cost-options">
              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="newDeliveryProfile.internationalFree"
                  class="delivery-cost-checkbox"
                  @change="toggleInternationalFree"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">Бесплатная доставка</span>
              </label>

              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="newDeliveryProfile.internationalFixed"
                  class="delivery-cost-checkbox"
                  @change="toggleInternationalFixed"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                <input
                  type="number"
                  v-model="newDeliveryProfile.internationalFixedValue"
                  class="delivery-cost-input"
                  placeholder="0"
                  :disabled="!newDeliveryProfile.internationalFixed"
                  data-field="internationalFixedValue"
                  @input="limitNumberInput"
                  max="999999"
                />
                <span class="delivery-currency">₽</span>
              </label>

              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="newDeliveryProfile.internationalPerItem"
                  class="delivery-cost-checkbox"
                  @change="toggleInternationalPerItem"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">За каждый предмет</span>
                <input
                  type="number"
                  v-model="newDeliveryProfile.internationalPerItemValue"
                  class="delivery-cost-input"
                  placeholder="0"
                  :disabled="!newDeliveryProfile.internationalPerItem"
                  data-field="internationalPerItemValue"
                  @input="limitNumberInput"
                  max="999999"
                />
                <span class="delivery-currency">₽</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Additional Countries Blocks -->
        <div
          v-for="(country, index) in newDeliveryProfile.additionalCountries"
          :key="index"
          class="delivery-block additional-country-block"
        >
          <div class="delivery-form-row">
            <label class="delivery-field-label">Страна доставки</label>
            <select v-model="country.country" class="delivery-field-select">
              <option value="USA">USA</option>
              <option value="RU">Россия</option>
              <option value="CN">Китай</option>
              <option value="JP">Япония</option>
              <option value="DE">Германия</option>
            </select>
          </div>

          <div class="delivery-form-row">
            <label class="delivery-field-label">Время доставки</label>
            <div class="delivery-time-inputs">
              <select v-model="country.timeFrom" class="delivery-time-select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
              </select>
              <span class="delivery-time-separator">—</span>
              <select v-model="country.timeTo" class="delivery-time-select">
                <option value="7">7</option>
                <option value="14">14</option>
                <option value="21">21</option>
                <option value="30">30</option>
                <option value="37">37</option>
              </select>
              <span class="delivery-time-text">рабочих дней</span>
            </div>
          </div>

          <div class="delivery-form-row">
            <label class="delivery-field-label delivery-cost">Стоимость доставки</label>
            <div class="delivery-cost-options">
              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="country.free"
                  class="delivery-cost-checkbox"
                  @change="toggleCountryFree(index)"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">Бесплатная доставка</span>
              </label>

              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="country.fixed"
                  class="delivery-cost-checkbox"
                  @change="toggleCountryFixed(index)"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                <input
                  type="number"
                  v-model="country.fixedValue"
                  class="delivery-cost-input"
                  placeholder="0"
                  :disabled="!country.fixed"
                  :data-field="`fixedValue-${index}`"
                  @input="limitNumberInput"
                  max="999999"
                />
                <span class="delivery-currency">₽</span>
              </label>

              <label class="delivery-cost-checkbox-row">
                <input
                  type="checkbox"
                  v-model="country.perItem"
                  class="delivery-cost-checkbox"
                  @change="toggleCountryPerItem(index)"
                />
                <span class="delivery-cost-checkbox-custom"></span>
                <span class="delivery-cost-text">За каждый предмет</span>
                <input
                  type="number"
                  v-model="country.perItemValue"
                  class="delivery-cost-input"
                  placeholder="0"
                  :disabled="!country.perItem"
                  :data-field="`perItemValue-${index}`"
                  @input="limitNumberInput"
                  max="999999"
                />
                <span class="delivery-currency">₽</span>
              </label>
            </div>
          </div>

          <!-- Delete Country Button -->
          <div class="country-delete-button-container">
            <button 
              class="country-delete-btn" 
              @click="removeDeliveryCountry(index)"
              title="Удалить"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 2h4M2 4h12M13 4L12.333 14a1 1 0 01-1 1H4.667a1 1 0 01-1-1L3 4M7 7v4M9 7v4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Удалить
            </button>
          </div>
        </div>

        <div class="delivery-modal-buttons">
          <button class="add-country-btn" @click="addDeliveryCountry">
            <div class="plus-circle-small">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1v14M1 8h14"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            Добавить страну доставки
          </button>

          <div class="delivery-modal-footer">
            <button class="delivery-btn-primary" @click="saveDeliveryProfile">
              Сохранить
            </button>
            <button class="delivery-btn-secondary" @click="closeModal">Отменить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Delivery",
// Добавляем props для получения данных о товаре
props: {
  productData: {
    type: Object,
    default: () => ({
      internalPrice: 0,
      discountPrice: 0,
      otherPrice: 0,
      quantity: 1
    })
  }
},
data() {
  return {
    showDeliveryModal: false,
    editingIndex: null,
    isEditing: false,
    selectedDeliveryType: 'international',
    newDeliveryProfile: {
      name: '',
      domesticCountry: 'USA',
      domesticTimeFrom: '1',
      domesticTimeTo: '7',
      domesticFree: false,
      domesticFixed: true,
      domesticFixedValue: '5000',
      domesticPerItem: false,
      domesticPerItemValue: '',
      internationalTimeFrom: '1',
      internationalTimeTo: '14',
      internationalFree: false,
      internationalFixed: false,
      internationalFixedValue: '',
      internationalPerItem: true,
      internationalPerItemValue: '5000',
      additionalCountries: []
    },
    // Пустой массив - пользователь сам добавляет доставку
    deliveryOptions: []
  }
},
computed: {
  // Стоимость доставки в рублях
  deliveryCostNumeric() {
    if (this.deliveryOptions.length === 0) {
      return 0;
    }
    
    const selectedOptions = this.deliveryOptions.filter(option => option.selected);
    
    if (selectedOptions.length === 0) {
      return 0;
    }

    let costs = [];
    
    selectedOptions.forEach(option => {
      let cost = 0;
      
      switch(this.selectedDeliveryType) {
        case 'domestic':
          cost = this.extractNumericCost(option.domestic?.cost || '0 ₽', option.domestic?.originalData);
          break;
        case 'international':
          cost = this.extractNumericCost(option.international?.cost || '0 ₽', option.international?.originalData);
          break;
        case 'additional':
          if (option.additionalCountries && option.additionalCountries.length > 0) {
            cost = this.extractNumericCost(option.additionalCountries[0].cost || '0 ₽', option.additionalCountries[0].originalData);
          }
          break;
      }
      
      costs.push(cost);
    });

    return costs.length > 0 ? Math.min(...costs) : 0;
  },

  // Форматированная стоимость доставки
  formattedDeliveryCost() {
    const cost = this.deliveryCostNumeric;
    if (this.deliveryOptions.length === 0) {
      return 'Добавьте вариант доставки';
    }
    const selectedOptions = this.deliveryOptions.filter(option => option.selected);
    if (selectedOptions.length === 0) {
      return 'Выберите вариант доставки';
    }
    return cost === 0 ? 'Бесплатная доставка' : `${cost.toLocaleString('ru-RU')} ₽`;
  },

  // Стоимость товара в рублях
  productCostNumeric() {
    const basePrice = Number(this.productData.internalPrice) || 0;
    const quantity = Number(this.productData.quantity) || 1;
    return basePrice * quantity;
  },

  // Форматированная стоимость товара
  formattedProductCost() {
    return `${this.productCostNumeric.toLocaleString('ru-RU')} ₽`;
  },

  // Общая стоимость (товар + доставка)
  totalCostNumeric() {
    return this.productCostNumeric + this.deliveryCostNumeric;
  },

  // Форматированная общая стоимость
  formattedTotalCost() {
    return `${this.totalCostNumeric.toLocaleString('ru-RU')} ₽`;
  },

  // Прибыль (базовая цена товара за вычетом возможных скидок)
  profitNumeric() {
    const basePrice = Number(this.productData.internalPrice) || 0;
    const discountPrice = Number(this.productData.discountPrice) || 0;
    const quantity = Number(this.productData.quantity) || 1;
    
    // Если есть цена до скидки, то прибыль = (обычная цена - цена до скидки) * количество
    // Иначе прибыль = обычная цена * количество
    let profit = basePrice * quantity;
    if (discountPrice > 0 && discountPrice > basePrice) {
      profit = basePrice * quantity;
    }
    
    return profit;
  },

  // Форматированная прибыль
  formattedProfit() {
    return `${this.profitNumeric.toLocaleString('ru-RU')} ₽`;
  }
},
methods: {
  // НОВЫЙ МЕТОД: Ограничение ввода цифр до 6 символов
  limitNumberInput(event) {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, ''); // Убираем все кроме цифр
    
    if (numericValue.length > 6) {
      event.target.value = numericValue.slice(0, 6); // Обрезаем до 6 цифр
      
      // Обновляем v-model в зависимости от поля
      const inputName = event.target.getAttribute('data-field');
      if (inputName) {
        this.updateModelValue(inputName, event.target.value);
      }
    }
  },

  // НОВЫЙ МЕТОД: Обновление значений модели
  updateModelValue(fieldName, value) {
    const numericValue = parseInt(value) || '';
    
    switch(fieldName) {
      case 'domesticFixedValue':
        this.newDeliveryProfile.domesticFixedValue = numericValue;
        break;
      case 'domesticPerItemValue':
        this.newDeliveryProfile.domesticPerItemValue = numericValue;
        break;
      case 'internationalFixedValue':
        this.newDeliveryProfile.internationalFixedValue = numericValue;
        break;
      case 'internationalPerItemValue':
        this.newDeliveryProfile.internationalPerItemValue = numericValue;
        break;
      default:
        // Для дополнительных стран
        if (fieldName.includes('fixedValue-')) {
          const index = parseInt(fieldName.split('-')[1]);
          this.newDeliveryProfile.additionalCountries[index].fixedValue = numericValue;
        } else if (fieldName.includes('perItemValue-')) {
          const index = parseInt(fieldName.split('-')[1]);
          this.newDeliveryProfile.additionalCountries[index].perItemValue = numericValue;
        }
    }
  },

  // Улучшенный метод извлечения числовой стоимости
  extractNumericCost(costText, originalData = null) {
    if (!costText || costText.includes('Бесплатная доставка')) {
      return 0;
    }

    // Если есть оригинальные данные, используем их для точного расчета
    if (originalData) {
      if (originalData.free) {
        return 0;
      }
      if (originalData.fixed && originalData.fixedValue) {
        return Number(originalData.fixedValue) || 0;
      }
      if (originalData.perItem && originalData.perItemValue) {
        const perItemCost = Number(originalData.perItemValue) || 0;
        const quantity = Number(this.productData.quantity) || 1;
        return perItemCost * quantity;
      }
    }
    
    // Fallback: извлекаем числа из строки
    const numbers = costText.match(/\d+/g);
    if (numbers && numbers.length > 0) {
      const baseCost = parseInt(numbers[numbers.length - 1]);
      
      // Если это "за каждый предмет", умножаем на количество
      if (costText.includes('каждый предмет')) {
        const quantity = Number(this.productData.quantity) || 1;
        return baseCost * quantity;
      }
      
      return baseCost;
    }
    
    return 0;
  },

  addNewDeliveryProfile() {
    this.resetForm();
    this.isEditing = false;
    this.editingIndex = null;
    this.showDeliveryModal = true;
  },
  
  closeModal() {
    this.showDeliveryModal = false;
    this.resetForm();
  },
  
  resetForm() {
    this.newDeliveryProfile = {
      name: '',
      domesticCountry: 'USA',
      domesticTimeFrom: '1',
      domesticTimeTo: '7',
      domesticFree: false,
      domesticFixed: true,
      domesticFixedValue: '5000',
      domesticPerItem: false,
      domesticPerItemValue: '',
      internationalTimeFrom: '1',
      internationalTimeTo: '14',
      internationalFree: false,
      internationalFixed: false,
      internationalFixedValue: '',
      internationalPerItem: true,
      internationalPerItemValue: '5000',
      additionalCountries: []
    };
  },
  
  addDeliveryCountry() {
    this.newDeliveryProfile.additionalCountries.push({
      country: 'USA',
      timeFrom: '1',
      timeTo: '14',
      free: false,
      fixed: false,
      fixedValue: '',
      perItem: true,
      perItemValue: '5000'
    });
  },

  removeDeliveryCountry(index) {
    this.newDeliveryProfile.additionalCountries.splice(index, 1);
  },
  
  // Методы для работы с чекбоксами стоимости
  toggleDomesticFree() {
    if (this.newDeliveryProfile.domesticFree) {
      this.newDeliveryProfile.domesticFixed = false;
      this.newDeliveryProfile.domesticPerItem = false;
    }
  },

  toggleDomesticFixed() {
    if (this.newDeliveryProfile.domesticFixed) {
      this.newDeliveryProfile.domesticFree = false;
    }
  },

  toggleDomesticPerItem() {
    if (this.newDeliveryProfile.domesticPerItem) {
      this.newDeliveryProfile.domesticFree = false;
    }
  },

  toggleInternationalFree() {
    if (this.newDeliveryProfile.internationalFree) {
      this.newDeliveryProfile.internationalFixed = false;
      this.newDeliveryProfile.internationalPerItem = false;
    }
  },

  toggleInternationalFixed() {
    if (this.newDeliveryProfile.internationalFixed) {
      this.newDeliveryProfile.internationalFree = false;
    }
  },

  toggleInternationalPerItem() {
    if (this.newDeliveryProfile.internationalPerItem) {
      this.newDeliveryProfile.internationalFree = false;
    }
  },

  toggleCountryFree(index) {
    const country = this.newDeliveryProfile.additionalCountries[index];
    if (country.free) {
      country.fixed = false;
      country.perItem = false;
    }
  },

  toggleCountryFixed(index) {
    const country = this.newDeliveryProfile.additionalCountries[index];
    if (country.fixed) {
      country.free = false;
    }
  },

  toggleCountryPerItem(index) {
    const country = this.newDeliveryProfile.additionalCountries[index];
    if (country.perItem) {
      country.free = false;
    }
  },
  
  getDeliveryCost(free, fixed, fixedValue, perItem, perItemValue) {
    if (free) return 'Бесплатная доставка';
    if (fixed && fixedValue) return `${fixedValue}₽`;
    if (perItem && perItemValue) return `За каждый предмет ${perItemValue}₽`;
    return 'Стоимость не указана';
  },
  
  saveDeliveryProfile() {
    if (!this.newDeliveryProfile.name.trim()) {
      alert('Укажите название профиля доставки');
      return;
    }

    const profile = {
      name: this.newDeliveryProfile.name,
      selected: false,
      domestic: {
        country: this.newDeliveryProfile.domesticCountry,
        time: `${this.newDeliveryProfile.domesticTimeFrom}-${this.newDeliveryProfile.domesticTimeTo} дней`,
        cost: this.getDeliveryCost(
          this.newDeliveryProfile.domesticFree,
          this.newDeliveryProfile.domesticFixed,
          this.newDeliveryProfile.domesticFixedValue,
          this.newDeliveryProfile.domesticPerItem,
          this.newDeliveryProfile.domesticPerItemValue
        ),
        originalData: {
          free: this.newDeliveryProfile.domesticFree,
          fixed: this.newDeliveryProfile.domesticFixed,
          fixedValue: this.newDeliveryProfile.domesticFixedValue,
          perItem: this.newDeliveryProfile.domesticPerItem,
          perItemValue: this.newDeliveryProfile.domesticPerItemValue
        }
      },
      international: {
        time: `${this.newDeliveryProfile.internationalTimeFrom}-${this.newDeliveryProfile.internationalTimeTo} дней`,
        cost: this.getDeliveryCost(
          this.newDeliveryProfile.internationalFree,
          this.newDeliveryProfile.internationalFixed,
          this.newDeliveryProfile.internationalFixedValue,
          this.newDeliveryProfile.internationalPerItem,
          this.newDeliveryProfile.internationalPerItemValue
        ),
        originalData: {
          free: this.newDeliveryProfile.internationalFree,
          fixed: this.newDeliveryProfile.internationalFixed,
          fixedValue: this.newDeliveryProfile.internationalFixedValue,
          perItem: this.newDeliveryProfile.internationalPerItem,
          perItemValue: this.newDeliveryProfile.internationalPerItemValue
        }
      },
      additionalCountries: this.newDeliveryProfile.additionalCountries.map(country => ({
        country: country.country,
        time: `${country.timeFrom}-${country.timeTo} дней`,
        cost: this.getDeliveryCost(
          country.free,
          country.fixed,
          country.fixedValue,
          country.perItem,
          country.perItemValue
        ),
        originalData: {
          free: country.free,
          fixed: country.fixed,
          fixedValue: country.fixedValue,
          perItem: country.perItem,
          perItemValue: country.perItemValue
        }
      }))
    };

    if (this.isEditing && this.editingIndex !== null) {
      this.deliveryOptions.splice(this.editingIndex, 1, profile);
    } else {
      this.deliveryOptions.push(profile);
    }

    this.closeModal();
  },
  
  editOption(index) {
    const profile = this.deliveryOptions[index];
    this.resetForm();
    
    this.isEditing = true;
    this.editingIndex = index;
    this.showDeliveryModal = true;
    
    this.newDeliveryProfile.name = profile.name;
    
    if (profile.domestic) {
      const timeParts = profile.domestic.time.match(/\d+/g);
      if (timeParts && timeParts.length === 2) {
        this.newDeliveryProfile.domesticTimeFrom = timeParts[0];
        this.newDeliveryProfile.domesticTimeTo = timeParts[1];
      }
      
      if (profile.domestic.originalData) {
        this.newDeliveryProfile.domesticFree = profile.domestic.originalData.free;
        this.newDeliveryProfile.domesticFixed = profile.domestic.originalData.fixed;
        this.newDeliveryProfile.domesticFixedValue = profile.domestic.originalData.fixedValue;
        this.newDeliveryProfile.domesticPerItem = profile.domestic.originalData.perItem;
        this.newDeliveryProfile.domesticPerItemValue = profile.domestic.originalData.perItemValue;
      }
    }
    
    if (profile.international) {
      const timeParts = profile.international.time.match(/\d+/g);
      if (timeParts && timeParts.length === 2) {
        this.newDeliveryProfile.internationalTimeFrom = timeParts[0];
        this.newDeliveryProfile.internationalTimeTo = timeParts[1];
      }
      
      if (profile.international.originalData) {
        this.newDeliveryProfile.internationalFree = profile.international.originalData.free;
        this.newDeliveryProfile.internationalFixed = profile.international.originalData.fixed;
        this.newDeliveryProfile.internationalFixedValue = profile.international.originalData.fixedValue;
        this.newDeliveryProfile.internationalPerItem = profile.international.originalData.perItem;
        this.newDeliveryProfile.internationalPerItemValue = profile.international.originalData.perItemValue;
      }
    }
    
    if (profile.additionalCountries && profile.additionalCountries.length > 0) {
      profile.additionalCountries.forEach(country => {
        const newCountry = {
          country: country.country,
          timeFrom: '1',
          timeTo: '14',
          free: false,
          fixed: false,
          fixedValue: '',
          perItem: true,
          perItemValue: '5000'
        };
        
        const timeParts = country.time.match(/\d+/g);
        if (timeParts && timeParts.length === 2) {
          newCountry.timeFrom = timeParts[0];
          newCountry.timeTo = timeParts[1];
        }
        
        if (country.originalData) {
          newCountry.free = country.originalData.free;
          newCountry.fixed = country.originalData.fixed;
          newCountry.fixedValue = country.originalData.fixedValue;
          newCountry.perItem = country.originalData.perItem;
          newCountry.perItemValue = country.originalData.perItemValue;
        }
        
        this.newDeliveryProfile.additionalCountries.push(newCountry);
      });
    }
  },
  
  deleteOption(index) {
    if (confirm('Вы уверены, что хотите удалить этот профиль доставки?')) {
      this.deliveryOptions.splice(index, 1);
    }
  }
}
}
</script>

<style scoped>
@import "/src/assets/add-product/delivery.css";

/* Дополнительные стили для общей стоимости */
.total-cost {
 font-weight: 600;
 color: #1F2937;
 font-size: 16px;
}

/* Остальные стили остаются без изменений */
.additional-country-block {
position: relative;
}

.country-delete-button-container {
display: flex;
justify-content: flex-end;
margin-top: 12px;
}

.country-delete-btn {
display: flex;
align-items: center;
gap: 6px;
background: none;
border: none;
color: #9CA3AF;
font-size: 12px;
font-weight: 400;
cursor: pointer;
padding: 4px 8px;
border-radius: 4px;
transition: all 0.2s ease;
}

.country-delete-btn:hover {
color: #F87171;
background: #FEF2F2;
}

.country-delete-btn svg {
width: 14px;
height: 14px;
}

.delivery-checkbox-container,
.delivery-cost-checkbox-row {
user-select: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
}

.delivery-cost-input:disabled {
opacity: 0.5;
cursor: not-allowed;
}

@media (max-width: 768px) {
.country-delete-button-container {
  margin-top: 16px;
}

.country-delete-btn {
  font-size: 13px;
  padding: 6px 10px;
}
}

@media (max-width: 480px) {
.country-delete-btn {
  font-size: 12px;
  padding: 5px 8px;
}

.country-delete-btn svg {
  width: 12px;
  height: 12px;
}
}
</style>