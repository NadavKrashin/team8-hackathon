<template>
  <v-app
    dir="rtl"
    style="
      background-image: url('champion_wallpaper.png');
      background-repeat: no-repeat;
      background-attachment: fixed;
    "
  >
    <div v-if="showSplash || !currentUser" class="splash-screen">
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

      <v-sheet
        position="fixed"
        class="pa-2 ma-2 bottom-0"
        color="primary"
        rounded
        :elevation="11"
      >
        <section dir="ltr" class="title d-flex flex-column mt-1">
          <section>
            <span class="ml-1 mt-5">{{ currentUser.trophies }}</span>
            <v-icon class="ml-2" color="secondary">mdi-trophy</v-icon>
          </section>
          <section>
            <span>{{ currentUser.coins }}</span>
            <v-icon class="ml-2 mb-2" color="secondary">mdi-hand-coin</v-icon>
          </section>
        </section>
      </v-sheet>
      <v-sheet
        color="transparent"
        position="fixed"
        class="ma-2 bottom-0 right-0"
      >
        <v-btn
          @click="() => $router.push(isInStore ? '/' : '/store')"
          color="primary"
          :icon="isInStore ? 'mdi-medal' : 'mdi-store'"
          min-height="70px"
          min-width="70px"
        ></v-btn>
      </v-sheet>
    </div>
  </v-app>
</template>

<script setup>
import Navbar from "./components/Navbar/Navbar.vue";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "./store/users";
import { storeToRefs } from "pinia";
import { getUser } from "./api/api";

const usersStore = useUsersStore();
const { updateUser } = usersStore;
const { currentUser } = storeToRefs(usersStore);

const showSplash = ref(true);
const route = useRoute();
const isInStore = computed(() => route.fullPath === "/store");
onMounted(async () => {
  const user = await getUser();

  updateUser(user);

  setTimeout(() => {
    showSplash.value = false; // Hide splash screen after loading
  }, 0); // Change the time according to your application's loading time
});
// Simulate some loading time
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
