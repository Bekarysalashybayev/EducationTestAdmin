<template>
  <div class="page" v-if="!isLoading">
    <div class="title font-size-24">{{ $t('variant.title') }}</div>
    <div class="sub-title font-size-17">
      {{ $t('variant.s_title_1') }}
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.name') }}
      </div>
      <div class="name font-size-17" v-if="currentUser">
        {{ currentUser.first_name }}
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.last_name') }}
      </div>
      <div class="name font-size-17" v-if="currentUser">
        {{ currentUser.last_name }}
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.middle_name') }}
      </div>
      <div class="name font-size-17" v-if="currentUser">
        {{ currentUser.middle_name }}
      </div>
    </div>
    <div class="sub-title mt-70 font-size-17">
      {{ $t('variant.s_title_2') }}
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.subject_1') }}
      </div>
      <div class="name font-size-17">
        {{ $t('variant.subject_1_name') }}
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.subject_2') }}
      </div>
      <div class="name font-size-17">
        {{ $t('variant.subject_2_name') }}
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.subject_3') }}
      </div>
      <div class="name font-size-17">
        {{ $t('variant.subject_3_name') }}
      </div>
    </div>
    <div class="sub-title mt-50 font-size-17">
      {{ $t('variant.s_title_3') }}
    </div>
<!--    <div class="select">-->
<!--      <select class="font-size-17" v-model="lang">-->
<!--        <option :value="null" disabled selected>-->
<!--          {{ $t('variant.select_lang') }}-->
<!--        </option>-->
<!--        <option value="0">Қазақша</option>-->
<!--        <option value="1">Русский</option>-->
<!--      </select>-->
<!--    </div>-->
    <div class="select">
      <select :class="['font-size-17', {error: isError && !lessons}]" v-model="lessons">
        <option :value="null" disabled selected>
          {{ $t('variant.select_subject') }}
        </option>
        <option :value="lesson.id"
                v-for="(lesson, i) in lessonPairs"
                :key="i"
        >
          {{ lesson['lesson_1']['name'] + " / " + lesson['lesson_2']['name'] }}
        </option>
      </select>
    </div>
    <div class="btn-row">
      <div class="btn font-size-17" @click="addLessonPair">
        {{ $t('variant.next') }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "index",
  data(){
    return{
      id: this.$route.params.test,
      lang: 0,
      lessonPairs: [],
      test_info: null,
      lessons: null,
      isError: false,
      isLoading: true,
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.user.user
    },
  },
  mounted() {
    this.getTestInfo()
  },
  methods: {
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    async addLessonPair(){
      this.isError = false
      if (!this.lessons){
        this.isError = true
        this.$toast.error(this.$t('variant.select_subject').toString())
        return;
      }

      if (!this.isError){
        this.setLoader(true)
        try {
          await this.$axios.put(`quizzes/add-lesson-pairs/${this.id}/`, {
            lessons: this.lessons
          })
          await this.$router.push(this.localePath({path: `/ent/${this.id}/test-info`}))
        } catch (e) {
          alert(e)
        } finally {
          this.setLoader(false)
        }
      }
    },
    async getTestInfo() {
      try {
        const {data} = await this.$axios.get(`quizzes/student-test/${this.id}/`)
        if (data) {
          this.test_info = data
          if (data.status !== 'NOT_PASSED' || data.lessons !== null){
            await this.$router.push(this.localePath({path: `/ent/${this.id}/test-info`}))
          }else{
            await this.getLessonPair()
          }
        }
      } catch (e) {
        alert(e)
      } finally {
        this.isLoading = false
      }
    },
    async getLessonPair() {
      this.setLoader(true)
      try {
        const {data} = await this.$axios.get('/quizzes/lesson-pairs/')
        if (data) {
          this.lessonPairs = data
        }
      } catch (e) {
        alert(e)
      } finally {
        this.setLoader(false)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.mt-70 {
  margin-top: rem(70);
}

.mt-50 {
  margin-top: rem(50);
}
.btn-row{
  margin-top: rem(50);
  display: flex;
  justify-content: center;
  .btn {
    padding: 10px rem(50);
    text-align: center;
    border: 1px solid $main_color;
    color: $main_color;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all ease .2s;

    &:hover {
      background-color: $main_color;
      color: $white;
    }
  }
}

.page {
  padding: rem(30) rem(50);

  .select {
    margin-top: rem(20);

    select {
      border: 0;
      border-bottom: 1px solid #686868;
      max-width: 500px;
      width: 100%;
      padding-bottom: 6px;

      &.error{
        border-bottom-color: red;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .title {
    color: $main_color;
    font-weight: 600;
    margin-bottom: rem(40);
  }

  .sub-title {
    color: $midnight;
    font-weight: 550;
    margin-bottom: rem(5);
  }

  .description {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &:first-child {
      label {
        margin-top: 0;
      }

      .name {
        margin-top: 0rem;
      }
    }

    .label {
      color: #686868;
      font-weight: 400;
      width: 150px;
      margin-top: rem(20);;
    }

    .name {
      color: $midnight;
      font-weight: 500;
      margin-top: rem(20);
    }
  }
}
</style>
