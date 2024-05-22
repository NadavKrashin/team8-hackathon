<template>
  <div class="profile-container" v-if="!isEditing">
    <img :src="profilePic" alt="Profile Picture" class="profile-pic" />
    <div class="name">{{ name }}</div>
    <div class="age">גיל: {{ age }}</div>
    <div class="interests">
      <div class="interest" v-for="interest in interests" :key="interest">
        {{ interest }}
      </div>
    </div>
    <div class="btn-container">
      <button class="btn" @click="editProfile">ערוך פרופיל</button>
    </div>
  </div>
  <EditProfile
    v-else
    @save="saveProfile"
    @cancel="isEditing = false"
    :name="name"
    :age="age"
    :interests="interests"
  />
</template>

<script>
import EditProfile from "./EditProfile.vue";
import defaultChildImg from "../assets/default_child.jpg";

export default {
  name: "Profile",
  components: {
    EditProfile,
  },
  data() {
    return {
      profilePic: defaultChildImg,
      name: "שם הילד",
      age: 10,
      interests: ["תחום עניין 1", "תחום עניין 2", "תחום עניין 3"],
      isEditing: false,
    };
  },
  methods: {
    editProfile() {
      this.isEditing = true;
    },
    saveProfile(newProfile) {
      this.name = newProfile.name;
      this.age = newProfile.age;
      this.interests = newProfile.interests;
      this.isEditing = false;
    },
    settings() {
      alert("הגדרות");
    },
  },
};
</script>

<style scoped>
.profile-container {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  padding: 20px;
  margin: 0 auto;
}
.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}
.name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}
.age {
  color: #777;
  margin-bottom: 15px;
}
.interests {
  text-align: right;
  margin-bottom: 15px;
}
.interest {
  background-color: #cfe78f;
  border-radius: 12px;
  display: inline-block;
  padding: 5px 10px;
  margin: 5px 0;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}
.btn {
  background-color: #d3e231;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  margin: 0 5px;
  color: white;
}
.btn:hover {
  background-color: #e4fa1d;
}
</style>
