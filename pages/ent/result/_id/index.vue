<template>
  <div class="page" v-if="result">
    <div class="title font-size-22">
      {{ $t('result.title') }}
    </div>
    <div class="all-score font-size-24">
      <span>{{ total }}</span> / 140
    </div>
    <r-subject v-for="(r, i) in result.lessons" :key="i"
               :subject="{ id: r.id, r_name: r.name, q_count: r['sum_of_questions'], q_score: r['score']}"/>
  </div>
</template>

<script>
import RSubject from "@/components/Block/RSubject";
import {mapMutations} from "vuex";

export default {
  name: "index",
  components: {RSubject},
  data() {
    return {
      id: this.$route.params.id,
      result: {
        total: 0,
        lessons: []
      },
    }
  },
  computed: {
    total(){
      let sum = 0
      for (let i = 0; i<this.result.lessons.length; i++){
        sum += this.result.lessons[i]['score']
      }
      return sum
    },
  },
  mounted() {
    this.getResult()
  },
  methods: {
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),

    async getResult() {
      this.setLoader(true)
      try {
        const {data} = await this.$axios.get(`quizzes/ent-finish-lessons/${this.id}/`)
        if (data){
          this.result = data
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
.page {
  padding: rem(30) rem(50);
  color: $midnight;

  .title {
    font-weight: 500;
    text-align: center;
  }

  .all-score {
    margin-top: rem(20);
    text-align: center;

    span {
      font-weight: 550;
      color: $main_color;
    }
  }
}
</style>
