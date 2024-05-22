<template>
  <div>
    <h1>לוח תוצאות</h1>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="(player, index) in leaderboard.slice(0, 3)"
          :key="index"
        >
          <v-card>
            <v-card-title>{{ getPlaceTitle(index) }}</v-card-title>
            <v-card-text>
              <v-avatar>
                <v-img :src="getCupIcon(index)" />
              </v-avatar>
              <span>{{ player.name }}</span>
              <span>{{ player.score }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>שאר השחקנים</v-card-title>
            <v-list>
              <v-list-item
                v-for="(player, index) in leaderboard.slice(3)"
                :key="index"
              >
                <v-list-item-avatar>
                  <v-img src="default-avatar.png" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ player.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    player.score
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import GolgVicCup from "../assets/victory_cup.jpg";
export default {
  data() {
    return {
      leaderboard: [
        { name: "אליס", score: 100 },
        { name: "בוב", score: 90 },
        { name: "נועם", score: 80 },
        { name: "דנה", score: 770 },
        { name: "אורי", score: 60 },
        // Add more players as needed
      ].sort((a, b) => b.score - a.score), // Sort leaderboard by score descending
    };
  },
  methods: {
    getPlaceTitle(index) {
      switch (index) {
        case 0:
          return "מקום ראשון";
        case 1:
          return "מקום שני";
        case 2:
          return "מקום שלישי";
        default:
          return "";
      }
    },
    getCupIcon(index) {
      switch (index) {
        case 0:
          return GolgVicCup; // Replace with actual path to gold cup icon
        case 1:
          return GolgVicCup; // Replace with actual path to silver cup icon
        case 2:
          return GolgVicCup; // Replace with actual path to bronze cup icon
        default:
          return "";
      }
    },
  },
};
</script>

<style>
/* Custom styles for the leaderboard page */
h1 {
  font-family: "Comic Sans MS", cursive;
  color: #ff6f61;
  text-align: center;
}

.v-card {
  background-color: #fff6d9; /* Light yellow background for cards */
  margin-bottom: 20px;
  text-align: center;
}

.v-card-title {
  font-weight: bold;
  color: #ff6f61; /* Red for titles */
}

.v-avatar {
  background-color: #ffd700; /* Gold background for avatars */
  margin: 0 auto;
}

.v-card-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-avatar img {
  width: 60px;
  height: 60px;
}

.v-card-text span {
  margin-top: 10px;
  font-weight: bold;
}

.v-list-item {
  background-color: #fce5cd; /* Light orange background for list items */
  margin-bottom: 10px;
}

.v-list-item-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* Customizing fonts */
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap");

body {
  font-family: "Comic Neue", cursive;
}

/* Responsive styles */
@media (max-width: 600px) {
  .v-avatar img {
    width: 40px;
    height: 40px;
  }

  .v-card-text span {
    font-size: 14px;
  }

  .v-list-item-avatar img {
    width: 30px;
    height: 30px;
  }
}
</style>
