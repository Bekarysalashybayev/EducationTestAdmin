<template>
  <div class="ent-test">
    <div class="test-page">
      <div class="test__pass-content">
        <div class="test__pass-header">
          <div class="title font-size-17">
            {{ $t('pass.title') }}
          </div>
          <div class="time font-size-17">
            {{ $t('pass.timeout') }} <span> <timer :date="newD" :stop="finish" @timeStop="timeStop"/></span>
          </div>
        </div>
        <div class="test__pass-body" v-if="lessons.length>0">
          <div class="lessons_type">
            <lessons :lesson="{currentLesson: Lesson, currentQuestion: currentQuestion}"
                     :lessons="lessons"
                     :questions="questions"
                     @selectQuestion="selectQuestion"
                     @selectLesson="selectLesson"
            />
          </div>
          <div class="question__type">
            <test
              :question="{lesson: Lesson, question: currentQuestion,  lessons: lessons, questionAnswer: questionAnswer}"
              @nextQuestion="nextQuestion"
              @prevQuestion="prevQuestion"
              @nextLesson="nextLesson"
              @selectAnswer="selectAnswer"
              @finish="finishModal=true"
              ref="testComponent"
              @clearChoice="clearChoice"
            />
            <button @click="finishModal=true" class="finish-test-last finish-test-last-ent">
              {{ $t('pass.finish') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal-window v-if="finishModal" @close="finishModal=false">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            {{ $t('pass.finish_confirm') }}
          </div>
          <div class="common-buttons">
            <button @click="finishTest">{{ $t('pass.finish') }}</button>
            <button @click="finishModal=false">{{ $t('pass.cancel') }}</button>
          </div>
        </div>
      </template>
    </modal-window>
  </div>
</template>

<script>

import {mapMutations} from 'vuex'
import Lessons from "@/components/Test/Lessons";
import ModalWindow from "@/components/core/ModalWindow";
import Timer from "@/components/core/Timer";
import Test from "@/components/Test/Test"

export default {
  name: "index",
  components: {Lessons, Test, ModalWindow, Timer},
  layout: 'blank',
  data() {
    return {
      id: this.$route.params.test,
      test_id: this.$route.params.variant,
      finish: false,
      finishModal: false,
      save: false,
      newD: {
        type: String
      },
      Lesson: 0,
      currentQuestion: 1,
      questionAnswer: {},
      is_Saved: false,
      is_Finished: false,
      lessons: [],
      questions: [],
      state: {},
      loading: true,
      isEditing: true
    }
  },
  beforeMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener("beforeunload", this.preventNav)
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("beforeunload", this.preventNav);
      })
    }
  },

  beforeRouteLeave(to, from, next) {
    if (!this.is_Finished) {
      if (typeof window !== 'undefined') {
        if (!window.confirm("Завершить и выйти?")) {
          return;
        }else{
          this.saveAnswer(this.lessons[this.Lesson].id)
        }
      }
    }
    next();
  },
  beforeDestroy() {
    if (!this.is_Finished) {
      this.saveAnswer(this.lessons[this.Lesson].id)
    }
  },
  created() {
    this.getLessons()
  },
  methods: {
    preventNav(event) {
      if (this.is_Finished) return;
      event.preventDefault()
      event.returnValue = ""
      this.saveAnswer(this.lessons[this.Lesson].id)
      if (typeof window !== 'undefined') {
        if (!window.confirm("Leave without saving?")) {
          return;
        }
      }
    },
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    async timeStop() {
      this.$toast.success('Ваше время истекло!')
      await this.finishTest()
    },
    async finishTest() {
      this.is_Finished = true
      await this.setLoader(true)
      await this.saveAnswer(this.lessons[this.Lesson].id)
      try {
        await this.$axios.post(`/quizzes/finish-ent/${this.id}/${this.test_id}/`)
        this.$toast.success('Ответ сохранен успешно!')
        await this.$router.push(this.localePath({path: `/ent/result/${this.id}`}))
      } catch (e) {
        this.$toast.error('Ошибка!')
      } finally {
        this.setLoader(false)
      }
    },
    finishEnt() {
      this.finishModal = true
    },
    selectQuestion(lesson, question, count) {
      if (this.currentQuestion != question) {
        this.Lesson = lesson
        this.currentQuestion = question
        this.count = count
        this.questionAnswer = this.questions[this.currentQuestion - 1]
        this.$refs.testComponent.reRender()
      }
    },
    selectLesson(lesson) {
      if (this.Lesson != lesson) {
        this.currentQuestion = 1
        this.changeLesson(lesson)
      }
    },
    changeLesson(lesson) {
      this.saveAnswer(this.lessons[this.Lesson].id)
      this.Lesson = lesson
      this.getQuestionsByLessonID(this.lessons[this.Lesson].id)
    },
    prevQuestion() {
      if (this.currentQuestion > 1) {
        this.currentQuestion = this.currentQuestion - 1
        this.questionAnswer = this.questions[this.currentQuestion - 1]
      }
    },
    nextQuestion() {
      if (this.currentQuestion < this.lessons[this.Lesson].sum_of_questions) {
        this.currentQuestion = this.currentQuestion + 1
        this.questionAnswer = this.questions[this.currentQuestion - 1]
      }
    },
    clearChoice() {
      this.questions[this.currentQuestion - 1].user_ans = []
    },
    selectAnswer(selectedAnswer) {
      this.questions[this.currentQuestion - 1].user_ans = selectedAnswer
    },
    nextLesson() {
      if (this.Lesson < this.lessons.length - 1) {
        this.currentQuestion = 1
        this.selectedAns = []
        this.changeLesson(this.Lesson + 1)
      }
    },
    async getLessons() {
      try {
        const data = (await this.$axios.get(`/quizzes/ent-lessons/${this.id}/`)).data
        this.lessons = data.lessons
        const dt = new Date();
        dt.setHours(dt.getHours() + data.duration.hour);
        dt.setMinutes(dt.getMinutes() + data.duration.minute);
        dt.setSeconds(dt.getSeconds() + data.duration.seconds);
        this.newD = dt
        await this.getQuestionsByLessonID(this.lessons[this.Lesson].id)
      } catch (er) {
        if (er.response && er.response.data.detail) {
          this.$toast.error(er.response.data.detail)
          this.is_Finished = true
          await this.$router.push(this.localePath({path: `/ent`}))
        }
      }

    },
    async getQuestionsByLessonID(lesson_id) {
      this.setLoader(true)
      try {
        const {data} = (await this.$axios.get(`/quizzes/ent-questions/${this.test_id}/${lesson_id}/`))
        if (data) {
          this.questions = data
          this.currentQuestion = 1
          this.questionAnswer = this.questions[this.currentQuestion - 1]
        }
      } catch (e) {
        alert(e)
      } finally {
        this.setLoader(false)
      }
      this.$refs.testComponent.reRender()
    },
    async saveAnswer(lessonID) {
      let result = []
      for (let i = 0; i < this.questions.length; i++) {
        let el = {id: this.questions[i].id, user_ans: this.questions[i].user_ans}
        result.push(el)
      }
      try {
        await this.$axios.post(`/quizzes/save-answers/${this.id}/${lessonID}/${this.test_id}/`, result)
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "assets/css/ent/PassTest.css";

.test-page {
  padding: rem(20)
}
</style>
