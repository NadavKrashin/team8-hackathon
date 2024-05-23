<template>
  <div class="edit-profile-container" dir="rtl">
    <div>
      <label for="name">שם:</label>
      <input id="name" v-model="editedName" type="text" />
    </div>
    <div>
      <label for="age">גיל:</label>
      <input id="age" v-model.number="editedAge" type="number" />
    </div>
    <div>
      <label for="hobbies">תחומי עניין:</label>
      <textarea id="hobbies" v-model="editedhobbies"></textarea>
    </div>
    <div class="btn-container">
      <v-btn class="btn" color="secondary" @click="$emit('cancel')"
        >ביטול</v-btn
      >
      <v-btn class="btn" color="secondary" @click="save">שמור</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProfile",
  props: ["name", "age", "hobbies"],
  data() {
    return {
      editedName: this.name,
      editedAge: this.age,
      editedhobbies: this.hobbies.join(", "),
    };
  },
  methods: {
    save() {
      const hobbiesArray = this.editedHobbies
        .split(",")
        .map((item) => item.trim());
      this.$emit("save", {
        name: this.editedName,
        age: this.editedAge,
        hobbies: hobbiesArray,
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
  justify-content: space-around;
}
</style>
