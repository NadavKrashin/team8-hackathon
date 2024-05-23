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
              @change="onFileChange($event)"
              accept="image/*"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-img v-if="selectedImage" :src="selectedImage"></v-img>
          </v-col>
        </v-row>

        <section v-if="selectedImage" dir="rtl">
          <v-btn @click="uploadImage" class="ma-2" color="primary">
            <v-icon icon="mdi-cloud-upload" start></v-icon>
            יאללה לאישור!
          </v-btn>
        </section>
      </v-container>
    </generic-card>
  </div>
</template>

<script setup>
import GenericCard from "../GenericCard.vue"; // Adjust the path as needed
import { ref, defineProps } from "vue";
import { sendImage } from "../../../api/api";
import { useUsersStore } from "../../../store/users";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const props = defineProps(["title"]);
const selectedImage = ref(null);
const selectedImageFile = ref(null);

const usersStore = useUsersStore();
const { currentUser } = storeToRefs(usersStore);

const route = useRoute();

const createImage = (file) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    selectedImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const uploadImage = async () => {
  await sendImage(selectedImage.value, currentUser.value.id, +route.params.id);
};

const onFileChange = (e) => {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  selectedImageFile.value = URL.createObjectURL(files[0]);
  createImage(files[0]);
};
</script>
