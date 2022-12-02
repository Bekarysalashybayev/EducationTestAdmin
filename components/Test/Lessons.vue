<template>
  <div class="Lessons">
    <div class="Lessons_content">
      <div class="Lessons_content-dropdown"
           v-for="(item, index) in lessons"
           :key="index"
           :class="{active: currentLesson==index}"
      >
        <div class="Lessons_content-dropdown-header-outer desktop" @click="selectLesson(index)">
          <div class="Lessons_content-dropdown-header font-size-17 desktop">
            {{item.name}}
          </div>
        </div>
        <div class="Lessons_content-dropdown-header-outer mobile">
          <button class="arrow prev" @click="prevLesson" v-if="currentLesson>0">
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.26545 10.1424L8.43291 18.2343C8.79129 18.5886 9.37193 18.5886 9.73121 18.2343C10.0896 17.88 10.0896 17.3045 9.73121 16.9503L2.21159 9.50045L9.73031 2.05064C10.0887 1.69635 10.0887 1.1209 9.73031 0.765715C9.37193 0.411428 8.79038 0.411428 8.432 0.765715L0.264545 8.8575C-0.0883323 9.20813 -0.0883322 9.79262 0.26545 10.1424Z" fill="black"/>
            </svg>
          </button>
          <div class="Lessons_content-dropdown-header font-size-17">
            {{item.name}}
          </div>
          <button class="arrow next" @click="nextLesson" v-if="currentLesson<lessons.length-1">
            <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.26545 10.1424L8.43291 18.2343C8.79129 18.5886 9.37193 18.5886 9.73121 18.2343C10.0896 17.88 10.0896 17.3045 9.73121 16.9503L2.21159 9.50045L9.73031 2.05064C10.0887 1.69635 10.0887 1.1209 9.73031 0.765715C9.37193 0.411428 8.79038 0.411428 8.432 0.765715L0.264545 8.8575C-0.0883323 9.20813 -0.0883322 9.79262 0.26545 10.1424Z" fill="black"/>
            </svg>
          </button>
        </div>
        <div class="Lessons_content-dropdown-body scroll" v-if="currentLesson==index && questions.length == item.sum_of_questions">
          <div class="pages">
            <div class="page"
                 v-for="i in item.sum_of_questions"
                 :key="i"
                 :class="{active: index==currentLesson && i==currentQuestion, checked: checkAns(i)}"
                 @click="selectQuestion(i)"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lessons",
  props: ['lesson', 'lessons', 'questions'],
  data(){
    return{
    }
  },
  computed: {
    currentQuestion(){
      return this.lesson.currentQuestion
    },
    currentLesson(){
      return this.lesson.currentLesson
    }
  },
  mounted() {
  },
  methods:{
    checkAns(i){
      if (Array.isArray(this.questions[i-1].user_ans)){
        if (this.questions[i-1].user_ans.length>0){
          return true
        }else{
          return false
        }
      }else{
        if (this.questions[i-1].user_ans!=null){
          return true
        }else{
          return false
        }
      }

    },
    selectQuestion(index){
      this.$emit('selectQuestion',
        this.currentLesson,
        index,
        this.lessons[this.currentLesson].sum_of_questions
      )
    },
    selectLesson(index){
      this.$emit('selectLesson', index)
    },
    prevLesson(){
      this.$emit('selectLesson', this.currentLesson - 1)
    },
    nextLesson(){
      this.$emit('selectLesson', this.currentLesson + 1)
    },
  },

}
</script>

<style scoped lang="scss">
.mobile{
  display: none!important;
}
.Lessons_content-dropdown{
  margin-bottom: 18px;
}
.Lessons_content-dropdown.active .Lessons_content-dropdown-header-outer{
  background: #FFFFFF;
  font-weight: bold;
  padding: 20px 15px;
  color: #005DAE;
  border: 1px solid #005DAE;
}
.Lessons_content-dropdown.active .Lessons_content-dropdown-body{
  border: 1px solid #005DAE;
  border-top: 0;
}
.Lessons_content-dropdown-header-outer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.arrow.next{
  transform: rotate(180deg);
  right: 0;
}
.arrow.prev{
  left: 0;
}
.arrow{
  width: 40px;
  height: 100%;
  border-radius: 10px;
  display: none;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
}
.arrow:hover{
  opacity: 0.9;
}
.arrow svg path{
  fill: #f8f8f8;
}
.Lessons_content-dropdown-header-outer:hover{
  background: #F5F8FF;
}
.Lessons_content-dropdown-header-outer{
  background: #FFFFFF;
  border: 1px solid #DEDEDE;
  font-size: 17px;
  line-height: 20px;
  padding: 15px;
  cursor: pointer;
}
.Lessons_content-dropdown.active .Lessons_content-dropdown-body{
  display: block;
}
.Lessons_content-dropdown-header{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Lessons_content-dropdown-body{
  display: none;
  background: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-top: 0;
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.pages{
  padding: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.pages .page{
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(165, 165, 165, 0.3);
  border-radius: 7px;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
  margin: 5px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  color: #FFFFFF;
}
.pages .page.active, .pages .page:hover{
  background: #005DAE!important;
}
.pages .page.checked{
  background: rgba(0, 155, 34, 0.2);
}
@media (max-width: 950px) {
  .Lessons_content-dropdown{
    display: none;
  }
  .Lessons_content-dropdown.active{
    display: block;
  }
  .arrow{
    display: flex;
  }
  .Lessons_content-dropdown-header-outer{
    padding: 0!important;
    height: 60px;
  }
  .Lessons_content-dropdown-header{
    flex-grow: 1;
  }
  .mobile{
    display: flex!important;
  }
  .desktop{
    display: none;
  }
  svg path{
    fill: #005DAE!important;
  }
}
</style>
