<template>
  <div>
    <generic-card>
      <template #title>
        <span>{{ title }}</span>
      </template>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-file-input
              label="בחרו את התמונה"
              v-model="selectedImage"
              accept="image/*"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-img v-if="selectedImage" :src="selectedImage"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </generic-card>
  </div>
</template>

<script setup>
import GenericCard from "../GenericCard.vue"; // Adjust the path as needed
import { ref, defineProps } from "vue";

const props = defineProps(["title"]);
const selectedImage = ref(null);
</script>
