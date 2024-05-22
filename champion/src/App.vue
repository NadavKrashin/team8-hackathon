<template>
  <v-app dir="rtl" style="background-image: url('champion_wallpaper.png')">
    <div v-if="showSplash" class="splash-screen">
      <v-img
        src="/champion-logo.png"
        width="25vw"
        max-height="50vh"
        alt="Loading..."
        class="splash-image"
      />
      <div dir="rtl" class="splash-text">רק רגע...</div>
    </div>

    <!-- Your main application content -->
    <div v-else>
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
      <v-btn
        @click="() => $router.push(isInStore ? '/' : '/store')"
        position="fixed"
        class="ma-5 bottom-0 right-0"
        color="primary"
        :icon="isInStore ? 'mdi-home' : 'mdi-store'"
        min-height="70px"
        min-width="70px"
      ></v-btn>
    </div>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";

export default {
  name: "App",
  data() {
    return {
      showSplash: true, // Initially show splash screen
    };
  },
  computed: {
    isInStore() {
      return this.$route.fullPath === "/store";
    },
  },
  mounted() {
    // Simulate some loading time
    setTimeout(() => {
      this.showSplash = false; // Hide splash screen after loading
    }, 0); // Change the time according to your application's loading time
  },
  components: {
    Navbar,
  },
};
</script>
<style>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.splash-image {
  width: 200px; /* Adjust width as needed */
  animation: spinInfinite 2s linear infinite; /* Adjust animation duration and timing function */
}

.splash-text {
  margin-top: 20px;
  font-size: 20px;
}

@keyframes spinInfinite {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
