<template>
  <div class="page">
    <div class="title font-size-22">
      {{ result.lesson.name }}
    </div>
<!--    <div class="all-score font-size-20">-->
<!--      {{ $t('result.questions') }} <span>15</span> / 35-->
<!--    </div>-->
    <div class="all-score font-size-20">
      {{ $t('result.scores') }} <span>{{ result.correct_score }}</span> / {{ result.all_score }}
    </div>
    <div class="questions font-size-17">
      <div class="question" v-for="(q, i) in result.question" :key="i">
        <div class="name">
          <div class="number">{{ i + 1 }}.</div>
          <div v-html="q.question"></div>
        </div>
        <div class="answers">
          <template v-for="(a, i) in q.answer">
            <div class="answer-row" :key="i">
              <div class="answer correct" v-if="checkAnswer(a.id, q['user_ans'], q['correct_answers']) === 1">
                <d-icon name="RCorrectIcon" :width="14" :height="11"/>
                <span>{{ letters[i] }}) <div v-html="a.answer"></div></span>
              </div>
              <div class="answer error" v-else-if="checkAnswer(a.id, q['user_ans'], q['correct_answers']) === 2">
                <d-icon name="RWrongIcon" :width="14" :height="13"/>
                <span>{{ letters[i] }}) <div v-html="a.answer"></div></span>
              </div>
              <div class="answer" v-else>
                <div class="letter"> {{ letters[i] }})</div>
                <div v-html="a.answer"></div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/core/icons/DIcon";
import {mapMutations} from "vuex";

export default {
  name: "index",
  components: {DIcon},
  data() {
    return {
      id: this.$route.params.id,
      subject: this.$route.params.subject,
      result: {
        all_score: 0,
        correct_score: 0,
        lesson: {
          name: "",
        },
        question: []
      },
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
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
  mounted() {
    this.reRender()
    this.getResult()
  },
  updated() {
    this.reRender()
  },
  methods: {
    reRender() {
      if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () => console.log('done'));
      }
    },
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    checkAnswer(ansId, userAns, correctAns) {
      if (userAns.includes(ansId)){
        if (correctAns.includes(ansId)){
          return 1;
        }else {
          return  2;
        }
      }
      return 3;
    },
    async getResult() {
      this.setLoader(true)
      try {
        const {data} = await this.$axios.get(`quizzes/ent-finish-questions/${this.id}/${this.subject}/`)
        if (data) {
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
    font-weight: 550;
    text-align: center;
  }

  .all-score {
    margin-top: rem(20);
    text-align: center;

    span {
      font-weight: 400;
      color: $main_color;
    }
  }

  .questions {
    margin-top: 20px;
    background: #FFFFFF;
    border: 1px solid #A5A5A5;
    border-radius: 10px;
    padding: 20px;

    .question {
      border-bottom: 0.5px solid #A5A5A5;
      padding-bottom: 20px;
      margin-bottom: 20px;
      font-weight: 400;
      color: #000823;

      .name {
        display: flex;

        &::v-deep {
          img {
            float: unset !important;
          }
        }

        .number {
          margin-right: 10px;
        }
      }

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
        margin-bottom: 0;
      }

      .answers {
        margin-top: 15px;

        .answer-row {
          margin-top: 10px;

          &:first-child {
            margin-top: 0;
          }

          .answer {
            margin-top: 10px;
            display: flex;
            align-items: center;

            &::v-deep {
              img {
                float: unset !important;
              }
            }

            .letter {
              margin-right: 10px;
            }


            &.correct {
              color: #009B22;
              display: flex;
              align-items: center;
            }

            &.error {
              color: #DE0000;
              display: flex;
              align-items: center;
            }

            > span {
              margin-left: 7px;
              display: flex;
              align-items: center;

              > div{
                margin-left: 7px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
