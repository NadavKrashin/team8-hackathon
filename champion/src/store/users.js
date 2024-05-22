import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUsersStore = defineStore("users", () => {
  const currentUser = ref({
    name: "יוחנן גורביץ",
    age: 10,
    interests: ["שחמט", "כדורסל", "כדורגל"],
    points: 248,
    trophies: 57,
    completedTasksIds: [764],
  });

  const updateUser = (newUser) => {
    currentUser.value = newUser;
  };

  const completeTask = (taskId) => {
    currentUser.value.completedTasksIds.push(taskId);
  };

  const completedTasksIds = computed(() => currentUser.value.completedTasksIds);

  return { currentUser, updateUser, completedTasksIds };
});
