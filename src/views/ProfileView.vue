<!-- src\views\ProfileView.vue -->

<template>
  <Header  :isAuth="false"/>

  <Profile />

  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Profile from "../components/Profile/Profile.vue";

export default {
  name: "ProfilePage",
  components: {
    Header,
    Footer,
    Profile,
  },
};
</script>
