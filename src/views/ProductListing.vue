<template>
  <Header  :isAuth="false"/>

  <ProductsTable />

  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ProductsTable from "../components/ProductsTable.vue";

export default {
  name: "ProductListing",
  components: {
    Header,
    Footer,
    ProductsTable,
  },
};
</script>
