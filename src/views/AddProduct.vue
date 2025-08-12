<!-- src\views\AddProduct.vue -->

<template>
  <Header :isAuth="false" />

  <AddProduct />
  <AddVideo />
  <Fields 
    :form-data="productFormData"
    @update:form-data="updateProductData"
  />
  <Delivery 
    :product-data="productFormData"
  />  

  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AddProduct from "../components/AddProduct/AddProduct.vue";
import AddVideo from "../components/AddProduct/AddVideo.vue";
import Fields from "../components/AddProduct/Fields.vue";
import Delivery from "../components/AddProduct/Delivery.vue";

export default {
  name: "AddProductPage",
  components: {
    Header,
    Footer,
    AddProduct,
    AddVideo,
    Fields,
    Delivery,
  },
  data() {
    return {
      // Общие данные о товаре для всех компонентов
      productFormData: {
        // Основные поля
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
        
        // Цены - ключевые поля для расчетов в Delivery
        internalPrice: 0,
        discountPrice: 0,
        globalPricing: true,
        otherPrice: 0,
        quantity: 1,
        packaging: ''
      }
    }
  },
  methods: {
    // Метод для обновления данных из Fields компонента
    updateProductData(newData) {
      this.productFormData = { ...this.productFormData, ...newData };
      
      // Для отладки - можно убрать в продакшене
      console.log('Product data updated:', this.productFormData);
    }
  }
};
</script>