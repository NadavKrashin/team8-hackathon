<template>
  <div id="app">
    <h1>משחק טריוויה לילדים</h1>
    <div v-if="currentQuestion">
      <h2>{{ currentQuestion.text }}</h2>
      <ul>
        <li v-for="(answer, index) in shuffledAnswers" :key="index" @click="checkAnswer(answer)">
          {{ answer }}
        </li>
      </ul>
      <p v-if="feedback">{{ feedback }}</p>
    </div>
    <button v-if="!currentQuestion && questionIndex < questions.length" @click="startGame">התחל משחק</button>
    <button v-if="feedback" @click="nextQuestion">שאלה הבאה</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          text: 'מהי הבירה של ישראל?',
          correct_answer: 'ירושלים',
          incorrect_answers: ['תל אביב', 'חיפה', 'אילת']
        },
        {
          text: 'מהו הים הגדול ביותר בעולם?',
          correct_answer: 'האוקיינוס השקט',
          incorrect_answers: ['הים התיכון', 'האוקיינוס האטלנטי', 'הים האדום']
        },
        {
          text: 'איזו חיה היא הגדולה ביותר בעולם?',
          correct_answer: 'הלוויתן הכחול',
          incorrect_answers: ['הפיל האפריקאי', 'כריש הלוויתן', 'הקרנף']
        },
        {
          text: 'כמה כוכבים יש בדגל ארצות הברית?',
          correct_answer: '50',
          incorrect_answers: ['49', '51', '52']
        },
        {
          text: 'מהו ההר הגבוה ביותר בעולם?',
          correct_answer: 'הר האוורסט',
          incorrect_answers: ['הר הקילימנג\'רו', 'הר הפוג\'י', 'הר האלברוס']
        },
        {
          text: 'מהו הנהר הארוך ביותר בעולם?',
          correct_answer: 'נהר הנילוס',
          incorrect_answers: ['נהר האמזונס', 'נהר היאנגצה', 'נהר המיסיסיפי']
        },
        {
          text: 'מהי השפה המדוברת ביותר בעולם?',
          correct_answer: 'סינית מנדרינית',
          incorrect_answers: ['אנגלית', 'ספרדית', 'ערבית']
        },
        {
          text: 'מהו כוכב הלכת הקרוב ביותר לשמש?',
          correct_answer: 'כוכב חמה',
          incorrect_answers: ['נוגה', 'כדור הארץ', 'מאדים']
        },
        {
          text: 'איזו מדינה היא בעלת השטח הגדול ביותר בעולם?',
          correct_answer: 'רוסיה',
          incorrect_answers: ['קנדה', 'סין', 'ארצות הברית']
        },
        {
          text: 'איזו עיר היא המאוכלסת ביותר בעולם?',
          correct_answer: 'טוקיו',
          incorrect_answers: ['ניו יורק', 'מקסיקו סיטי', 'שנגחאי']
        }
      ],
      questionIndex: 0,
      currentQuestion: null,
      answers: [],
      feedback: ''
    };
  },
  computed: {
    shuffledAnswers() {
      return this.shuffleArray([...this.answers]);
    }
  },
  methods: {
    startGame() {
      this.questionIndex = 0;
      this.loadQuestion();
    },
    loadQuestion() {
      if (this.questionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.questionIndex];
        this.answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
        this.feedback = '';
      } else {
        this.currentQuestion = null;
      }
    },
    checkAnswer(answer) {
      if (answer === this.currentQuestion.correct_answer) {
        this.feedback = 'נכון!';
      } else {
        this.feedback = `לא נכון. התשובה הנכונה היא ${this.currentQuestion.correct_answer}`;
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
    }
  }
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
  background: #f0f0f0;
  margin: 0.5em 0;
  padding: 0.5em;
  cursor: pointer;
  transition: background 0.3s;
}
li:hover {
  background: #e0e0e0;
}
button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1em;
}
p {
  font-size: 1.2em;
  font-weight: bold;
}
</style>
