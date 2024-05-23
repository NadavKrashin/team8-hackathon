<template>
  <div dir="rtl">
    <div v-if="currentQuestion">
      <h2>
        {{ currentQuestion.text }} {{ questionIndex + 1 }}/{{
          questions.length
        }}
      </h2>
      <ul>
        <li
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          @click="checkAnswer(answer)"
        >
          {{ answer }}
        </li>
      </ul>
      <p v-if="feedback">{{ feedback }}</p>
    </div>
    <button
      v-if="!currentQuestion && questionIndex < questions.length"
      @click="startGame"
    >
      התחל משחק
    </button>

    <button
      v-if="feedback && questionIndex < questions.length - 1"
      @click="nextQuestion"
    >
      שאלה הבאה
    </button>

    <section
      v-if="
        feedback &&
        questionIndex === questions.length - 1 &&
        score < questions.length
      "
    >
      <p class="mt-3">
        ענית על {{ score }} שאלות נכון מתוך {{ questions.length }}
      </p>
      <p>נסו שוב!</p>
      <button @click="startGame">התחל מחדש</button>
    </section>
    <button v-if="win" @click="handleWin">יאללה לאתגר הבא</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUsersStore } from "../../../store/users";
import { useTasksStore } from "../../../store/tasks";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const usersStore = useUsersStore();
    const { getRewardByTaskId } = useTasksStore();
    const { updateUser, currentUser } = usersStore;

    const taskId = route.params.id;
    const { coins: coinsToAdd, trophies: trophiesToAdd } =
      getRewardByTaskId(taskId);

    // expose to template and other options API hooks
    return {
      updateUser,
      taskId,
      coinsToAdd,
      trophiesToAdd,
      currentUser,
      getRewardByTaskId,
    };
  },
  data() {
    return {
      questions: [
        {
          text: "מהי הבירה של ישראל?",
          correct_answer: "ירושלים",
          incorrect_answers: ["תל אביב", "חיפה", "אילת"],
        },
        {
          text: "מהו הים הגדול ביותר בעולם?",
          correct_answer: "האוקיינוס השקט",
          incorrect_answers: ["הים התיכון", "האוקיינוס האטלנטי", "הים האדום"],
        },
        // {
        //   text: "איזו חיה היא הגדולה ביותר בעולם?",
        //   correct_answer: "הלוויתן הכחול",
        //   incorrect_answers: ["הפיל האפריקאי", "כריש הלוויתן", "הקרנף"],
        // },
        // {
        //   text: "כמה כוכבים יש בדגל ארצות הברית?",
        //   correct_answer: "50",
        //   incorrect_answers: ["49", "51", "52"],
        // },
        // {
        //   text: "מהו ההר הגבוה ביותר בעולם?",
        //   correct_answer: "הר האוורסט",
        //   incorrect_answers: ["הר הקילימנג'רו", "הר הפוג'י", "הר האלברוס"],
        // },
        // {
        //   text: "מהו הנהר הארוך ביותר בעולם?",
        //   correct_answer: "נהר הנילוס",
        //   incorrect_answers: ["נהר האמזונס", "נהר היאנגצה", "נהר המיסיסיפי"],
        // },
        // {
        //   text: "מהי השפה המדוברת ביותר בעולם?",
        //   correct_answer: "סינית מנדרינית",
        //   incorrect_answers: ["אנגלית", "ספרדית", "ערבית"],
        // },
        // {
        //   text: "מהו כוכב הלכת הקרוב ביותר לשמש?",
        //   correct_answer: "כוכב חמה",
        //   incorrect_answers: ["נוגה", "כדור הארץ", "מאדים"],
        // },
        // {
        //   text: "איזו מדינה היא בעלת השטח הגדול ביותר בעולם?",
        //   correct_answer: "רוסיה",
        //   incorrect_answers: ["קנדה", "סין", "ארצות הברית"],
        // },
        // {
        //   text: "איזו עיר היא המאוכלסת ביותר בעולם?",
        //   correct_answer: "טוקיו",
        //   incorrect_answers: ["ניו יורק", "מקסיקו סיטי", "שנגחאי"],
        // },
      ],
      questionIndex: 0,
      currentQuestion: null,
      answers: [],
      totalAnswered: 1,
      score: 0,
      feedback: "",
      win: false,
    };
  },
  computed: {
    shuffledAnswers() {
      return this.shuffleArray([...this.answers]);
    },
  },
  methods: {
    startGame() {
      this.questionIndex = 0;
      this.loadQuestion();
      this.score = 0;
    },
    handleWin() {
      this.updateUser({
        ...this.currentUser,
        coins: this.currentUser.coins + this.coinsToAdd,
        trophies: this.currentUser.trophies + this.trophiesToAdd,
        gameids: [...this.currentUser.gameids, +this.taskId],
      });
      this.$router.push("/");
    },
    loadQuestion() {
      if (this.questionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.questionIndex];
        this.answers = [
          ...this.currentQuestion.incorrect_answers,
          this.currentQuestion.correct_answer,
        ];
        this.feedback = "";
      } else {
        this.currentQuestion = null;
      }
    },
    checkAnswer(answer) {
      if (!this.feedback) {
        if (answer === this.currentQuestion.correct_answer) {
          this.feedback = "נכון!";
          this.score += 1;
          if (this.score === this.questions.length) {
            this.feedback = "כל הכבוד! הצלחת את האתגר";
            this.win = true;
          }
        } else {
          this.feedback = `לא נכון. התשובה הנכונה היא ${this.currentQuestion.correct_answer}`;
        }
      }
    },
    nextQuestion() {
      this.questionIndex++;

      this.loadQuestion();
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  direction: rtl;
}
h1 {
  font-size: 2em;
  margin-bottom: 1em;
}
h2 {
  font-size: 1.5em;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f5e58d;
  margin: 0.5em 0;
  padding: 0.5em;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 10px;
}
li:hover {
  background: #fcc725;
}
button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
  color: white;
  border-radius: 20px;
  background-color: #262847;
}
p {
  font-size: 1.2em;
  font-weight: bold;
}
</style>
