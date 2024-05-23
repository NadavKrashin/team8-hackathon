<template>
  <v-container>
    <router-view></router-view>
  <v-img
            src='../../public/bubble.png'
            aspect-ratio="1.78"
            length="400"
            width="200"
            ></v-img>
            <v-img
              src='../../public/talking.gif'
              aspect-ratio="1.78"
              class="gif-image"
            ></v-img>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTasksStore } from "../store/tasks";
import { storeToRefs } from "pinia";

const tasksStore = useTasksStore();

const { unlockedLevelsIds } = storeToRefs(tasksStore);
const route = useRoute();
const currentRouteId = computed(() => route.params.id);

const router = useRouter();

onMounted(() => {
  if (!unlockedLevelsIds.value.includes(+currentRouteId.value)) {
    router.push("/");
  }
});
</script>
