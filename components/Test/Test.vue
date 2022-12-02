<template>
<div class="Test">
  <div class="Test__content">
    <div class="common-question" v-if="question.questionAnswer.common_question">
      <div v-if="question.questionAnswer.common_question.file != null">
        <audio controls controlsList="nodownload">
          <source :src="question.questionAnswer.common_question.file" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
      <div v-html="question.questionAnswer.common_question.text"></div>
    </div>
    <div class="Test__content-header">
      <div v-html="question.questionAnswer.question"  oncopy="return false;" oncut="return false;" onpaste="return false;" oncontextmenu="return false;"></div>
    </div>
    <div class="Test__content-answers"
         v-if="question.questionAnswer.choice_type == 'CHOICE'"
    >
      <div class="answer"
           v-for="(answer, i) in question.questionAnswer.answer"
           :class="{active: question.questionAnswer.user_ans == answer.id}"
           :key="answer.id">
        <div class="answer_letter">
          {{ letters[i] }}
        </div>

        <div class="answer_text">
          <div v-html="answer.answer">
          </div>
        </div>
        <input type="radio"
               :id="question.questionAnswer.id"
               :name="question.questionAnswer.id"
               v-model="select"
               :value="answer.id"
               @change="selectAnswer"
        >
      </div>
    </div>
    <div class="Test__content-answers"
         v-else
    >
      <div class="answer"
           v-for="(answer, i) in question.questionAnswer.answer"
           :class="{active: checkAnswerExist(answer.id)}"
           :key="answer.id">
        <div class="answer_letter">
          {{ letters[i] }}
        </div>
        <div class="answer_text">
          <div v-html="answer['answer']"></div>
        </div>
        <input type="checkbox"
               :id="question.questionAnswer.id"
               :name="question.questionAnswer.id"
               v-model="question.questionAnswer.user_ans"
               :value="answer.id"
               @change="selectAnswer"
        >
      </div>
    </div>
    <div class="test__content-clear-answers" @click="clearChoice()">
      {{ $t('pass.cancel_choice') }}
    </div>
    <div class="Test__content-bottom">
      <button :class="{disabled: question.question < 2}"
              @click="prevQuestion">{{ $t('pass.back') }}</button>
      <div class="number">
        {{ question.question }} / {{ question.lessons[question.lesson].sum_of_questions }}
      </div>
      <button v-if="question.question < question.lessons[question.lesson].sum_of_questions"
          @click="nextQuestion" >{{ $t('pass.next') }}</button>
      <button v-if="question.question == question.lessons[question.lesson].sum_of_questions && question.lesson < question.lessons.length-1"
              @click="nextLesson" >{{ $t('pass.next') }}</button>
      <button v-if="question.question == question.lessons[question.lesson].sum_of_questions && question.lesson == question.lessons.length-1"
              @click="finish" >{{ $t('pass.finish') }}</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Test",
  props: ['question'],
  data(){
    return{
      answers: [],
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
      select: '',
      selected: [],
    }
  },
  head() {
    return {
      script: [
        {
          hid: 'stripe',
          src: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
          defer: true,
          body: true
        }
      ]
    }
  },
  computed:{
    questionId(){
      return this.question.question
    },
    lessonId(){
      return this.question.lesson
    },
  },
  mounted() {
    this.reRender()
  },
  updated() {
    this.reRender()
  },
  methods:{
    reRender() {
      if(window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () => console.log('done'));
      }
    },
    checkAnswerExist(id){
      if (this.question.questionAnswer.user_ans != null){
        return this.question.questionAnswer.user_ans.includes(id)
      }
      return false
    },
    nextQuestion(){
      this.$emit('nextQuestion')
      this.reRender()
    },
    prevQuestion(){
      this.$emit('prevQuestion')
      this.reRender()
    },
    nextLesson(){
      this.$emit('nextLesson')
      this.reRender()
    },
    clearChoice(){
      this.select = ''
      this.selected = []
      this.$emit('clearChoice')
    },
    selectAnswer(){
      if (this.question.questionAnswer.choice_type == 'CHOICE'){
        this.$emit('selectAnswer', this.select)
      }else{
        this.$emit('selectAnswer', this.question.questionAnswer.user_ans)
      }
    },
    finish(){
      this.$emit('finish')
    },
  },
}
</script>

<style scoped lang="scss">
.Test__content *{
  user-select: none;
}

.Test__content{
  background: #FFFFFF;
  padding: rem(20);
  border: 1px solid #B7B7B7;
}
.common-question{
  margin-bottom: 2rem;
  font-size: 17px;
  line-height: 20px;
  text-align: left;
}
.Test__content-header{
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #000000;
  text-align: left;
  margin-bottom: 30px;
}
.Test__content-header >>> img{
  float: unset!important;
  width: 100% !important;
  height: auto!important;
}
.answer{
  position: relative;
  z-index: 10;
  display: flex;
  border: 1px solid #B7B7B7;
  cursor: pointer;
  font-size: 15px;
}
.answer input{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
  cursor: pointer;
}
@media (min-width: 768px) {
  .answer:hover .answer_text{
    background: #F5F8FF;
    border: 1px solid #3269e1;
  }
  .answer:hover .answer_letter{
    background: #3269e1;
  }
}

.answer.active .answer_text{
  background: #005DAE;
  color: #FFFFFF;
}
.answer.active .answer_letter{
  background: #005DAE;
  border-right: 1px solid #FFFFFF;
  color: #FFFFFF;
}
span:hover, .answer.active span{
  background-color: red!important;
}
.answer__bg{
  background-color: #2ea705;
}

.answer_letter{
  width: 30px;
  padding: 14px 10px;
  background: #F5F8FF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.answer_text{
  padding: 12px;
  text-align: left;
  flex-grow: 1;
}
.Test__content-bottom{
  font-size: 1.6rem;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.Test__content-bottom .number{
  font-size: 15px;
}
.Test__content-bottom button{
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  color: #005DAE;
  background: transparent;
  border: 1px solid #005DAE;
  padding: 7px 10px;
}
.Test__content-bottom button:hover{
  background-color: #005DAE;
  color: #FFFFFF;
}
.Test__content-bottom button.disabled{
  opacity: 0.5;
  cursor: unset;
}
.Test__content-bottom button.disabled:hover{
  background-color: #FFFFFF;
  color: #709FDC;
}
.test__content-clear-answers{
  margin: 15px 0;
  font-size: 15px;
  color: #167DD6;
  text-decoration: underline;
  cursor: pointer;
}
</style>
