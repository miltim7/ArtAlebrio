<!-- src\views\ContestView.vue -->

<template>
  <Header  :isAuth="false"/>

  <Contest/>

  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Contest from "../components/Contest/Contest.vue";

export default {
  name: "ContestPage",
  components: {
    Header,
    Footer,
    Contest,
  },
};
</script>
