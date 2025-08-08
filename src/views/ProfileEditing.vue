<!-- src\views\ProfileEditing.vue -->

<template>
  <Header :isAuth="true" />

  <ProfileComponent />

  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ProfileComponent from "../components/ProfileComponent.vue";

export default {
  name: "ProfileEditing",
  components: {
    Header,
    ProfileComponent,
    Footer,
  },
};
</script>
