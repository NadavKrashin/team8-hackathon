<script setup></script>
<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <v-btn
      @click="() => $router.push('Store')"
      position="fixed"
      class="ma-5 bottom-0 right-0"
      color="primary"
      icon="mdi-store"
      min-height="70px"
      min-width="70px"
    ></v-btn>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style></style>
