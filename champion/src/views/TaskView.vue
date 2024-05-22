<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Task Details for Task ID: {{ taskId }}</h1>
        <!-- Add your task logic and UI here -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TaskView",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    taskId() {
      return this.$route.params.id;
    },
  },
};
</script>
