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
          id: 1,
          route: "dishes",
          title: "הכנסתי מדיח",
          subtitle: "צלמו סלפי עם מדיח כלים מלא!",
          trophies: 7,
          coins: 100,
        },
        {
          id: 2,
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

  return { levels, unlockedLevelsIds };
});
