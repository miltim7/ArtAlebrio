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
            <span class="cost-value">{{ deliveryCost }}</span>
          </div>
          <div class="cost-row">
            <span class="cost-label">Стоимость товара</span>
            <span class="cost-value">{{ productCost }}</span>
          </div>
          <div class="cost-row profit-row">
            <span class="cost-label">Ваша прибыль</span>
            <span class="cost-value profit-value">{{ profit }}</span>
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
              placeholder="Мое имя"
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
                    @change="toggleDomesticCostOptions"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Бесплатная доставка</span>
                </label>

                <label class="delivery-cost-checkbox-row">
                  <input
                    type="checkbox"
                    v-model="newDeliveryProfile.domesticFixed"
                    class="delivery-cost-checkbox"
                    @change="toggleDomesticCostOptions"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                  <input
                    type="number"
                    v-model="newDeliveryProfile.domesticFixedValue"
                    class="delivery-cost-input"
                    placeholder="5000"
                    :disabled="!newDeliveryProfile.domesticFixed"
                  />
                  <span class="delivery-currency">₽</span>
                </label>

                <label class="delivery-cost-checkbox-row">
                  <input
                    type="checkbox"
                    v-model="newDeliveryProfile.domesticPerItem"
                    class="delivery-cost-checkbox"
                    @change="toggleDomesticCostOptions"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">За каждый предмет</span>
                  <input
                    type="number"
                    v-model="newDeliveryProfile.domesticPerItemValue"
                    class="delivery-cost-input"
                    placeholder="0"
                    :disabled="!newDeliveryProfile.domesticPerItem"
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
                    @change="toggleInternationalCostOptions"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Бесплатная доставка</span>
                </label>

                <label class="delivery-cost-checkbox-row">
                  <input
                    type="checkbox"
                    v-model="newDeliveryProfile.internationalFixed"
                    class="delivery-cost-checkbox"
                    @change="toggleInternationalCostOptions"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                  <input
                    type="number"
                    v-model="newDeliveryProfile.internationalFixedValue"
                    class="delivery-cost-input"
                    placeholder="0"
                    :disabled="!newDeliveryProfile.internationalFixed"
                  />
                  <span class="delivery-currency">₽</span>
                </label>

                <label class="delivery-cost-checkbox-row">
                  <input
                    type="checkbox"
                    v-model="newDeliveryProfile.internationalPerItem"
                    class="delivery-cost-checkbox"
                    @change="toggleInternationalCostOptions"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">За каждый предмет</span>
                  <input
                    type="number"
                    v-model="newDeliveryProfile.internationalPerItemValue"
                    class="delivery-cost-input"
                    placeholder="0"
                    :disabled="!newDeliveryProfile.internationalPerItem"
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
            class="delivery-block"
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
                    @change="toggleCountryCostOptions(index)"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Бесплатная доставка</span>
                </label>

                <label class="delivery-cost-checkbox-row">
                  <input
                    type="checkbox"
                    v-model="country.fixed"
                    class="delivery-cost-checkbox"
                    @change="toggleCountryCostOptions(index)"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">Фиксированная (за все товары)</span>
                  <input
                    type="number"
                    v-model="country.fixedValue"
                    class="delivery-cost-input"
                    placeholder="0"
                    :disabled="!country.fixed"
                  />
                  <span class="delivery-currency">₽</span>
                </label>

                <label class="delivery-cost-checkbox-row">
                  <input
                    type="checkbox"
                    v-model="country.perItem"
                    class="delivery-cost-checkbox"
                    @change="toggleCountryCostOptions(index)"
                  />
                  <span class="delivery-cost-checkbox-custom"></span>
                  <span class="delivery-cost-text">За каждый предмет</span>
                  <input
                    type="number"
                    v-model="country.perItemValue"
                    class="delivery-cost-input"
                    placeholder="0"
                    :disabled="!country.perItem"
                  />
                  <span class="delivery-currency">₽</span>
                </label>
              </div>
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
      deliveryOptions: []
    }
  },
  computed: {
    deliveryCost() {
      return '150 000 ₽';
    },
    productCost() {
      return '24 567 ₽';
    },
    profit() {
      return '150 ₽';
    }
  },
  methods: {
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
    
    toggleCostOptions(type, index = null) {
      if (type === 'domestic') {
        if (this.newDeliveryProfile.domesticFree) {
          this.newDeliveryProfile.domesticFixed = false;
          this.newDeliveryProfile.domesticPerItem = false;
        }
      } 
      else if (type === 'international') {
        if (this.newDeliveryProfile.internationalFree) {
          this.newDeliveryProfile.internationalFixed = false;
          this.newDeliveryProfile.internationalPerItem = false;
        }
      }
      else if (type === 'country' && index !== null) {
        if (this.newDeliveryProfile.additionalCountries[index].free) {
          this.newDeliveryProfile.additionalCountries[index].fixed = false;
          this.newDeliveryProfile.additionalCountries[index].perItem = false;
        }
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

<style>
@import "/src/assets/add-product/delivery.css";
</style>