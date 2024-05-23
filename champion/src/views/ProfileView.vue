<template>
  <v-container v-if="currentUser">
    <div class="profile-container h-50" v-if="!isEditing">
      <img
        :src="`https://api.multiavatar.com/${currentUser.name}.png`"
        alt="Profile Picture"
        class="profile-pic"
      />
      <div class="name">{{ currentUser.name }}</div>
      <div class="age">גיל: {{ currentUser.age }}</div>
      <div class="hobbies">
        <div
          class="interest mr-2"
          v-for="interest in currentUser.hobbies"
          :key="interest"
        >
          {{ interest }}
        </div>
      </div>

      <v-btn color="primary" width="100%" @click="editProfile"
        >ערוך פרופיל</v-btn
      >
    </div>
    <EditProfile
      v-else
      @save="saveProfile"
      @cancel="() => (isEditing = false)"
      :name="currentUser.name"
      :age="currentUser.age"
      :hobbies="currentUser.hobbies"
    />
  </v-container>
</template>

<script setup>
import EditProfile from "./EditProfile.vue";
import { useUsersStore } from "../store/users";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const userStore = useUsersStore();

const { updateUser } = userStore;
const { currentUser } = storeToRefs(userStore);
const isEditing = ref(false);

const editProfile = () => {
  isEditing.value = true;
};
const saveProfile = (newProfile) => {
  updateUser(newProfile);
  isEditing.value = false;
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
}
.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}
.name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}
.age {
  color: #777;
  margin-bottom: 15px;
}
.hobbies {
  text-align: right;
  margin-bottom: 15px;
}
.interest {
  background-color: #fcc725;
  border-radius: 12px;
  display: inline-block;
  padding: 5px 10px;
  margin: 5px 0;
}

.btn:hover {
  background-color: #e4fa1d;
}
</style>
