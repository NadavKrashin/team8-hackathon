<template>
  <v-container>
    <v-row>
      <v-col v-for="(task, index) in tasks" :key="index" cols="12">
        <v-card @click="enterTask(task.id)" class="task-card" outlined>
          <v-img :src="task.image" height="200px"></v-img>
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle class="d-flex align-center">
            <v-icon left>mdi-trophy</v-icon>
            גביעים: {{ task.trophies }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TasksPage",
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "משחק הזיכרון",
          image: "https://via.placeholder.com/150",
          trophies: 100,
        },
        {
          id: 2,
          title: "Sudoku",
          image: "https://via.placeholder.com/150",
          trophies: 200,
        },
        {
          id: 3,
          title: "Puzzle",
          image: "https://via.placeholder.com/150",
          trophies: 150,
        },
        // Add more tasks as needed
      ],
    };
  },
  methods: {
    enterTask(taskId) {
      this.$router.push({ name: "Task", params: { id: taskId } });
    },
  },
};
</script>

<style scoped>
.task-card {
  cursor: pointer;
  margin-bottom: 16px;
  transition: transform 0.2s;
}
.task-card:hover {
  transform: scale(1.05);
}
</style>
