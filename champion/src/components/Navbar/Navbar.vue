<template>
  <v-app-bar app color="primary">
    <div>
      <v-btn
        v-for="link in links"
        :key="link.name"
        icon
        :class="{ 'active-icon': isActive(link.name) }"
        @click="navigateTo(link.name)"
      >
        <v-icon :color="link.iconColor" :size="iconSize">{{
          link.icon
        }}</v-icon>
      </v-btn>
    </div>
    <span dir="rtl" class="title">ברוכים הבאים צ׳אמפס!</span>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      iconSize: 36,
      links: [
        { name: "Home", icon: "mdi-medal", iconColor: "secondary" },
        { name: "Leaderboards", icon: "mdi-trophy", iconColor: "secondary" },
        { name: "Profile", icon: "mdi-account", iconColor: "secondary" },
      ],
    };
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    isActive(routeName) {
      return this.$route.name === routeName;
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin-left: 8px;
}

.active-icon {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}
.nav-logo {
  margin-left: 8px;
}

.title {
  position: absolute;
  right: 0;
  font-size: 1.2rem;
  margin-right: 2vw;
}
</style>
