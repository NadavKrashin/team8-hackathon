<template>
  <v-container class="h-100 d-flex align-end justify-center">
    <v-row class="journey-container">
      <div
        v-for="(level, index) in levels"
        :key="index"
        class="level-container"
      >
        <div class="dotted-line" v-if="index !== 0"></div>

        <v-card
          @click="openLevel(level)"
          outlined
          color="secondary"
          :class="{
            'level-locked': !level.unlocked,
            'w-100 h-100 d-flex justify-center align-center': true,
          }"
        >
          <v-card-title color="primary" v-if="level.unlocked">{{
            level.number
          }}</v-card-title>

          <v-icon colir="primary" v-else> mdi-lock</v-icon>
        </v-card>
      </div>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline rtl-text text-center">{{
          currentLevel.title
        }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(task, index) in currentLevel.tasks"
              :key="index"
              cols="12"
              sm="6"
            >
              <v-card
                @click="
                  !completedTasksIds.includes(task.id) &&
                    enterTask(currentLevel.id, task.route, task?.query)
                "
                :class="`task-card ${
                  isTaskCompleted(task.id) ? 'completed-task' : ''
                }`"
                color="primary"
                outlined
                dir="rtl"
              >
                <v-card-title class="rtl-text align-center">{{
                  task.title
                }}</v-card-title>
                <v-card-subtitle
                  v-if="task.subtitle"
                  class="rtl-text align-center"
                  >{{ task.subtitle }}</v-card-subtitle
                >
                <section dir="ltr" class="d-flex flex-column">
                  <section>
                    <v-icon class="ml-2" color="secondary">mdi-trophy</v-icon>
                    <span class="ml-1 mt-5">{{ task.trophies }}</span>
                  </section>
                  <section>
                    <v-icon class="ml-2 mb-2" color="secondary"
                      >mdi-hand-coin</v-icon
                    >
                    <span>{{ task.coins }}</span>
                  </section>
                </section>
                <v-icon
                  v-if="isTaskCompleted(task.id)"
                  class="mr-4 mb-2"
                  style="position: absolute; bottom: 0"
                  color="secondary"
                  >mdi-check</v-icon
                >
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">
            <v-icon icon="mdi-exit-to-app" start></v-icon>
            חזור
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useTasksStore } from "../store/tasks";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUsersStore } from "../store/users";
const dialog = ref(false);
const currentLevel = ref({});
const tasksStore = useTasksStore();
const usersStore = useUsersStore();

const { completedTasksIds } = storeToRefs(usersStore);
const { levels } = storeToRefs(tasksStore);
const router = useRouter();
const openLevel = (level) => {
  if (level.unlocked) {
    currentLevel.value = level;
    dialog.value = true;
  } else {
    alert("This level is locked.");
  }
};

const isTaskCompleted = (taskId) => completedTasksIds.value.includes(taskId);

const enterTask = (taskId, route, query) => {
  router.push({
    path: `/task/${taskId}/${route}`,
    params: { id: taskId },
    query: { q: query },
  });
  dialog.value = false;
};
</script>

<style scoped>
.levels-row {
  flex-direction: column-reverse; /* Arrange levels from bottom to top */
}

.level-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  width: 100px;
  height: 60px;
  position: relative;
}

.level-container:first-child {
  margin-top: 5vh;
}

.dotted-line {
  border-left: 2px dotted #fcc725;
  height: 50px;
  position: absolute;
  top: -50px;
}

.level-card {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.level-card:hover {
  transform: scale(1.1);
}

.level-locked {
  opacity: 0.5;
  pointer-events: none;
}

.completed-task {
  opacity: 0.5;
}

.rtl-text {
  text-align: right;
}

.task-card {
  cursor: pointer;
  margin-bottom: 16px;
  transition: transform 0.2s;
}

.task-card:hover {
  transform: scale(1.05);
}

.journey-container {
  position: relative;
  flex-direction: column;
  align-items: center;
}
</style>
