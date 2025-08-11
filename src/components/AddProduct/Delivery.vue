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
              >
              <span class="delivery-checkbox-custom"></span>
            </label>
            
            <span class="delivery-option-name">{{ option.name }}</span>
            
            <div class="delivery-option-actions">
              <button class="delivery-action-btn edit-btn" @click="editOption(index)">
                Изменить
              </button>
              <button class="delivery-action-btn delete-btn" @click="deleteOption(index)">
                <img src="/images/delivery/delete.png" alt="Удалить" width="12.4" height="16">
              </button>
            </div>
          </div>
          
          <div class="delivery-option-details">
            <div class="delivery-detail-row">
              <div class="delivery-detail-icon">
                <img src="/images/delivery/earth.png" alt="Страна продавца" width="16" height="16">
              </div>
              <span class="delivery-detail-label">Страна продавца</span>
              <span class="delivery-detail-time">{{ option.domestic.time }}</span>
              <span class="delivery-detail-cost">{{ option.domestic.cost }}</span>
            </div>
            
            <div class="delivery-detail-row">
              <div class="delivery-detail-icon">
                <img src="/images/delivery/out-of-earth.png" alt="Вне страны" width="20" height="20">
              </div>
              <span class="delivery-detail-label">Вне страны</span>
              <span class="delivery-detail-time">{{ option.international.time }}</span>
              <span class="delivery-detail-cost">{{ option.international.cost }}</span>
            </div>
          </div>
        </div>
        
        <button class="add-delivery-option-btn" @click="showDeliveryModal = true">
          <div class="plus-circle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          Добавить вариант доставки
        </button>
      </div>
    </div>

    <!-- Delivery Modal -->
    <div v-if="showDeliveryModal" class="delivery-modal-overlay" @click="closeModal">
      <div class="delivery-modal" @click.stop>
        <div class="delivery-modal-header">
          <h3 class="delivery-modal-title">Добавление профиля доставки</h3>
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
              placeholder="Мое имя"
            >
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
              <select v-model="newDeliveryProfile.domesticCountry" class="delivery-field-select">
                <option value="USA">USA</option>
                <option value="RU">Россия</option>
                <option value="CN">Китай</option>
              </select>
            </div>

            <div class="delivery-form-row">
              <label class="delivery-field-label">Время доставки</label>
              <div class="delivery-time-inputs">
                <select v-model="newDeliveryProfile.domesticTimeFrom" class="delivery-time-select">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                </select>
                <span class="delivery-time-separator">—</span>
                <select v-model="newDeliveryProfile.domesticTimeTo" class="delivery-time-select">
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
                  >
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Бесплатная доставка</span>
                </label>
                
                <label class="delivery-cost-checkbox-row">
                  <input 
                    type="checkbox" 
                    v-model="newDeliveryProfile.domesticFixed"
                    class="delivery-cost-checkbox"
                  >
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                  <input 
                    type="number" 
                    v-model="newDeliveryProfile.domesticFixedValue"
                    class="delivery-cost-input"
                    placeholder="5000"
                  >
                  <span class="delivery-currency">₽</span>
                </label>
                
                <label class="delivery-cost-checkbox-row">
                  <input 
                    type="checkbox" 
                    v-model="newDeliveryProfile.domesticPerItem"
                    class="delivery-cost-checkbox"
                  >
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">За каждый предмет</span>
                  <input 
                    type="number" 
                    v-model="newDeliveryProfile.domesticPerItemValue"
                    class="delivery-cost-input"
                    placeholder="0"
                  >
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
                <select v-model="newDeliveryProfile.internationalTimeFrom" class="delivery-time-select">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                </select>
                <span class="delivery-time-separator">—</span>
                <select v-model="newDeliveryProfile.internationalTimeTo" class="delivery-time-select">
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
                  >
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Бесплатная доставка</span>
                </label>
                
                <label class="delivery-cost-checkbox-row">
                  <input 
                    type="checkbox" 
                    v-model="newDeliveryProfile.internationalFixed"
                    class="delivery-cost-checkbox"
                  >
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                  <input 
                    type="number" 
                    v-model="newDeliveryProfile.internationalFixedValue"
                    class="delivery-cost-input"
                    placeholder="0"
                  >
                  <span class="delivery-currency">₽</span>
                </label>
                
                <label class="delivery-cost-checkbox-row">
                  <input 
                    type="checkbox" 
                    v-model="newDeliveryProfile.internationalPerItem"
                    class="delivery-cost-checkbox"
                  >
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">За каждый предмет</span>
                  <input 
                    type="number" 
                    v-model="newDeliveryProfile.internationalPerItemValue"
                    class="delivery-cost-input"
                    placeholder="0"
                  >
                  <span class="delivery-currency">₽</span>
                </label>
              </div>
            </div>
          </div>

          <div class="delivery-modal-buttons">
            <button class="add-country-btn">
              <div class="plus-circle-small">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              Добавить страну доставки
            </button>

            <div class="delivery-modal-footer">
              <button class="delivery-btn-primary" @click="saveDeliveryProfile">
                Сохранить
              </button>
              <button class="delivery-btn-secondary" @click="closeModal">
                Отменить
              </button>
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
  data() {
  return {
    showDeliveryModal: false,
    newDeliveryProfile: {
      name: '',
      domesticCountry: 'USA',
      domesticTimeFrom: '1',
      domesticTimeTo: '37',
      domesticFree: false,
      domesticFixed: true,
      domesticFixedValue: '5000',
      domesticPerItem: false,
      domesticPerItemValue: '',
      internationalTimeFrom: '1',
      internationalTimeTo: '37',
      internationalFree: false,
      internationalFixed: false,
      internationalFixedValue: '',
      internationalPerItem: false,
      internationalPerItemValue: ''
    },
    deliveryOptions: []
  }
},
  methods: {
    closeModal() {
      this.showDeliveryModal = false;
      this.resetForm();
    },
    resetForm() {
      this.newDeliveryProfile = {
        name: '',
        domesticCountry: 'USA',
        domesticTimeFrom: '1',
        domesticTimeTo: '37',
        domesticFree: false,
        domesticFixed: true,
        domesticFixedValue: '5000',
        domesticPerItem: false,
        domesticPerItemValue: '',
        internationalTimeFrom: '1',
        internationalTimeTo: '37',
        internationalFree: false,
        internationalFixed: false,
        internationalFixedValue: '',
        internationalPerItem: false,
        internationalPerItemValue: ''
      };
    },
    saveDeliveryProfile() {
      let domesticCost = 'Бесплатная доставка';
      if (this.newDeliveryProfile.domesticFixed && this.newDeliveryProfile.domesticFixedValue) {
        domesticCost = `${this.newDeliveryProfile.domesticFixedValue}₽`;
      } else if (this.newDeliveryProfile.domesticPerItem && this.newDeliveryProfile.domesticPerItemValue) {
        domesticCost = `За каждый предмет ${this.newDeliveryProfile.domesticPerItemValue}₽`;
      }
      
      let internationalCost = 'Бесплатная доставка';
      if (this.newDeliveryProfile.internationalFixed && this.newDeliveryProfile.internationalFixedValue) {
        internationalCost = `${this.newDeliveryProfile.internationalFixedValue}₽`;
      } else if (this.newDeliveryProfile.internationalPerItem && this.newDeliveryProfile.internationalPerItemValue) {
        internationalCost = `За каждый предмет ${this.newDeliveryProfile.internationalPerItemValue}₽`;
      }

      this.deliveryOptions.push({
        name: this.newDeliveryProfile.name || "Базовый",
        selected: false,
        domestic: {
          time: `${this.newDeliveryProfile.domesticTimeFrom}-${this.newDeliveryProfile.domesticTimeTo} дня`,
          cost: domesticCost
        },
        international: {
          time: `${this.newDeliveryProfile.internationalTimeFrom}-${this.newDeliveryProfile.internationalTimeTo} дней`,
          cost: internationalCost
        }
      });
      
      this.closeModal();
    },
    editOption(index) {
      console.log('Редактирование опции:', index);
    },
    deleteOption(index) {
      this.deliveryOptions.splice(index, 1);
    }
  }
}
</script>

<style>
@import "/src/assets/add-product/delivery.css";
</style>