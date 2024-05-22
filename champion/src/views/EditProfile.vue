<template>
  <div class="edit-profile-container">
    <div>
      <label for="name">שם:</label>
      <input id="name" v-model="editedName" type="text" />
    </div>
    <div>
      <label for="age">גיל:</label>
      <input id="age" v-model.number="editedAge" type="number" />
    </div>
    <div>
      <label for="interests">תחומי עניין:</label>
      <textarea id="interests" v-model="editedInterests"></textarea>
    </div>
    <div class="btn-container">
      <button class="btn" @click="save">שמור</button>
      <button class="btn" @click="$emit('cancel')">ביטול</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProfile",
  props: ["name", "age", "interests"],
  data() {
    return {
      editedName: this.name,
      editedAge: this.age,
      editedInterests: this.interests.join(", "),
    };
  },
  methods: {
    save() {
      const interestsArray = this.editedInterests
        .split(",")
        .map((item) => item.trim());
      this.$emit("save", {
        name: this.editedName,
        age: this.editedAge,
        interests: interestsArray,
      });
    },
  },
};
</script>

<style scoped>
.edit-profile-container {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  padding: 20px;
  margin: 0 auto;
}
label {
  display: block;
  margin-bottom: 5px;
  text-align: right;
}
input,
textarea {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}
.btn {
  background-color: #87ceeb;
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
  background-color: #00bfff;
}
</style>
