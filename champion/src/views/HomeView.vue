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
          <v-card-title color="primary" v-if="level.unlocked">{{ level.number }}</v-card-title>
          <v-icon colir="primary" v-else> mdi-lock</v-icon>
        </v-card>
      </div>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline rtl-text">{{
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
                @click="enterTask(task.id)"
                class="task-card"
                color="primary"
                outlined
              >
                <v-card-title class="rtl-text align-center">{{
                  task.title
                }}</v-card-title>
                <section class="d-flex flex-column">
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

<script>
export default {
  name: "LevelsPage",
  data() {
    return {
      dialog: false,
      currentLevel: {},
      levels: [
        {
          id: 1,
          number: 1,
          title: "שלב ראשון",
          unlocked: true,
          tasks: [
            {
              id: 1,
              title: "Memory Match",
              trophies: 7,
              coins: 100,
            },
            {
              id: 2,
              title: "Sudoku",
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
      ],
    };
  },
  methods: {
    openLevel(level) {
      if (level.unlocked) {
        this.currentLevel = level;
        this.dialog = true;
      } else {
        alert("This level is locked.");
      }
    },
    enterTask(taskId) {
      this.$router.push({ name: "Task", params: { id: taskId } });
      this.dialog = false;
    },
  },
};
</script>

<!-- :class="`level-container ${index % 2 == 0 ? 'left-' : 'right-'}${
    Math.floor(Math.random() * 4) + 1
  }`" -->
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

/* .left-1 {
  left: 10%;
}
.left-2 {
  left: 20%;
}
.left-3 {
  left: 30%;
}
.left-4 {
  left: 40%;
} */

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
