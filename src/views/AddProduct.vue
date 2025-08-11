<!-- src\views\AddProduct.vue -->

<template>
  <Header :isAuth="false" />

  <AddProduct />
  <AddVideo />
  <Fields />
  <Delivery />  
  <EstimatedCost />

  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AddProduct from "../components/AddProduct/AddProduct.vue";
import AddVideo from "../components/AddProduct/AddVideo.vue";
import Fields from "../components/AddProduct/Fields.vue";
import Delivery from "../components/AddProduct/Delivery.vue";
import EstimatedCost from "../components/AddProduct/EstimatedCost.vue";

export default {
  name: "AddProductPage",
  components: {
    Header,
    Footer,
    AddProduct,
    AddVideo,
    Fields,
    Delivery,
    EstimatedCost
  },
};
</script>
