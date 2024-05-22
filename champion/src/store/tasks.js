import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTasksStore = defineStore("tasks", () => {
  const levels = ref([
    {
      id: 1,
      number: 1,
      title: "שלב ראשון",
      unlocked: true,
      tasks: [
        {
          id: 765,
          route: "friends",
          query: "צלמו סלפי עם 3 חברים!",
          title: "פגישה עם חברים",
          subtitle: "צלמו סלפי עם עוד 2 חברים!",
          trophies: 7,
          coins: 100,
        },
        {
          id: 764,
          route: "quiz",
          title: "החידון היומי",
          subtitle: "ענו על כל התשובות נכונות לקבלת הפרס!",
          trophies: 20,
          coins: 50,
        },
      ],
    },
    {
      id: 2,
      number: 2,
      title: "Level 2",
      unlocked: false,
      tasks: [
        {
          id: 3,
          title: "Puzzle",
          image: "https://via.placeholder.com/150",
        },
        { id: 4, title: "Quiz", image: "https://via.placeholder.com/150" },
      ],
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
    {
      id: 3,
      number: 3,
      unlocked: false,
    },
  ]);

  const unlockedLevelsIds = computed(() =>
    levels.value.filter((level) => level.unlocked).map(({ id }) => id)
  );

  const getRewardByTaskId = (taskId) => {
    const foundLevel = levels.value.filter(({ tasks }) => {
      return tasks && tasks.findIndex(({ id }) => +taskId === id) !== -1;
    })[0];

    const { coins, trophies } = foundLevel.tasks.filter(
      ({ id }) => id === +taskId
    )[0];

    return { coins, trophies };
  };

  return { levels, unlockedLevelsIds, getRewardByTaskId };
});
