import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const currentUser = ref(null);

  const updateUser = (newUser) => {
    console.log(newUser);
    currentUser.value = newUser;
  };

  const completeTask = (taskId) => {
    currentUser.value.gameids.push(taskId);
  };

  const gameids = computed(() => currentUser.value.gameids);

  return { currentUser, updateUser, gameids };
});
