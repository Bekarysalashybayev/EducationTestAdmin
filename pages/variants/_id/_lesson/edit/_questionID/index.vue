<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title font-size-24">
        <div class="back" @click="$router.push(`/variants/${variantID}/${lessonId}/questions`)">
          <d-icon name="ComeBackIcon" :width="30" :height="30"/>
        </div>
        Вопрос
      </div>
      <div class="questions">
        <div class="add-form">
          <div class="text">
            <div class="question-text">
              <div class="form-title-common">Балл <span>*</span></div>
              <input type="number" class="input-number" v-model.number="point">
            </div>
            <div class="question-text">
              <div class="form-title-common">Ссылка на видео <span>*</span></div>
              <input type="text" class="input-number w-100" v-model="link">
            </div>
            <div class="question-text">
              <div class="form-title-common">Вопрос <span>*</span></div>
              <client-only placeholder="loading...">
                <ckeditor-nuxt v-model="question.text" :config="editorConfig" class="answer-input"/>
              </client-only>
            </div>
            <br>
            <br>
            <div class="question-text">
              <div class="form-title-common">Объяснение <span>*</span></div>
              <client-only placeholder="loading...">
                <ckeditor-nuxt v-model="correct_way" :config="editorConfig" class="answer-input"/>
              </client-only>
            </div>
          </div>
          <div class="answers">
            <div class="form-title">Ответы <span>*</span></div>
            <div class="answer-items">
              <div class="item" v-for="(answer, i) in answers">
                <div class="letter">{{ letters[i] }})</div>
                <input type="checkbox" class="check" v-model="answer.correct">
                <div class="answer-text">
                  <client-only placeholder="loading...">
                    <ckeditor-nuxt v-model="answer.answer" :config="editorConfig" class="answer-input"/>
                  </client-only>
                </div>
                <button class="answer-delete" @click="delAnswer(i)">
                  Удалить
                </button>
              </div>
            </div>
            <div class="add-answer" @click="addAnswer" v-if="answers.length<10">
              Добавить ответ
            </div>
          </div>
        </div>
      </div>
      <div class="common-buttons">
        <button @click="saveQuestion">Сохранить</button>
      </div>
    </div>
  </div>
</template>
<script>
import ModalWindow from "~/components/core/ModalWindow";
import DIcon from "~/components/core/icons/DIcon";
import answers from '../../answers.json'
import letters from '../../letters.json'

export default {
  name: "index",
  components: {
    DIcon,
    ModalWindow,
    'ckeditor-nuxt': () => {
      if (process['client']) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  data() {
    return {
      editorConfig: {
        simpleUpload: {
          uploadUrl: process.env.BASE_URL + '/quiz/question-image/',
        },
        removePlugins: ['Title'],
      },
      letters: letters,
      answers: JSON.parse(JSON.stringify(answers)),
      question: {
        text: '',
      },
      point: 15,
      correct_way: null,
      link: null,
      isCompleted: true,
      questionID: this.$route.params.questionID,
      variantID: this.$route.params.id,
      lessonId: this.$route.params.lesson,
    }
  },
  mounted() {
    this.getQuestion()
  },
  methods: {
    checkAnswer() {

      if (!this.point) {
        this.$toast.error('Напишите балл')
        return false
      }

      let hasCorrect = false
      let hasCorrectAnswer = false
      if (this.answers > 0) {
        this.$toast.error('Добавите ответы ')
        return false
      } else {
        for (let i = 0; i < this.answers.length; i++) {
          if (this.answers[i].correct == true) {
            hasCorrect = true
            if (this.answers[i].answer != '') {
              hasCorrectAnswer = true
            }
            break
          }
        }
      }
      if (!hasCorrect) {
        this.$toast.error('Выберите правильный ответ ')
        return false
      }
      if (!hasCorrectAnswer) {
        this.$toast.error('Правильный ответ не могут быть пустым')
        return false
      }
      return true
    },
    async saveQuestion() {
      if (this.question.text == '') {
        this.$toast.error('Напишите вопрос')
      } else if (this.checkAnswer()) {
        try {
          const data = (await this.$axios.put(`/quiz/question/${this.questionID}/`,
            {
              question: this.question.text,
              point: this.point,
              link: this.link,
              correct_way: this.correct_way,
              answers: this.answers.map((a, index) => {
                return {
                  answer: a['answer'],
                  is_correct: a['correct'],
                  order: index + 1
                }
              })
            }
          )).data
          this.$toast.success('Вопрос изменен успешно!')
          this.$toast.clear()
          await this.$router.push(`/variants/${this.variantID}/${this.lessonId}/questions`)
        } catch (er) {
          console.log(er)
        }
      }
    },
    addAnswer() {
      if (this.answers.length < 10) {
        this.answers.push(
          {
            correct: false,
            answer: '',
          })
      }
    },
    delAnswer(index) {
      if (index > -1) {
        this.answers.splice(index, 1);
        this.$toast.success('Ответ удален')
      }
    },
    async getQuestion() {
      try {
        const data = (await this.$axios.get(`/quiz/question/${this.questionID}/`)).data
        this.question.text = data.question
        this.correct_way = data.correct_way
        this.point = data.point
        this.link = data.link
        this.answers = data.answers.map(a => {
          return {
            ...a,
            correct: a['is_correct']
          }
        })
      } catch (er) {
        console.log(er)
      }
    },
  },
}
</script>
<style scoped>
@import "@/assets/css/questions.css";

.page-title {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.page-title .back {
  margin-right: 20px;
  cursor: pointer;
}

.page-title .back:hover {
  opacity: .9;
}

.input-number {
  padding: 5px 10px;
  width: 100px;
  margin-bottom: 20px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;


}

.w-100 {
  width: 100% !important;
}

.input-number:focus {
  outline: none;
  border-color: #6cb5f9;
}
</style>
