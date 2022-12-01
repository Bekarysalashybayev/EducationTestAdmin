<template>
  <div class="page">
    <div class="title font-size-22">
      Биология
    </div>
    <div class="all-score font-size-20">
      {{ $t('result.questions') }} <span>15</span> / 35
    </div>
    <div class="all-score font-size-20">
      {{ $t('result.scores') }} <span>25</span> / 45
    </div>
    <div class="questions font-size-17">
      <div class="question" v-for="i in 15" :key="i">
        <div class="name">
          {{ i }}. Как можно взглянуть на человека?
        </div>
        <div class="answers">
          <div class="answer">A) исподтишка</div>
          <div class="answer correct">
            <d-icon name="RCorrectIcon" :width="14" :height="11"/>
            <span>B) исподтишка</span>
          </div>
          <div class="answer">C) исподтишка</div>
          <div class="answer error">
            <d-icon name="RWrongIcon" :width="14" :height="13"/>
            <span>D) исподтишка</span>
          </div>
          <div class="answer">E) исподтишка</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/core/icons/DIcon";
export default {
  name: "index",
  components: {DIcon}
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

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
        margin-bottom: 0;
      }
      .answers{
        margin-top: 15px;

        .answer{
          margin-top: 10px;

          &:first-child{
            margin-top: 0;
          }

          &.correct{
            color: #009B22;
            display: flex;
            align-items: center;
          }
          &.error{
            color: #DE0000;
            display: flex;
            align-items: center;
          }
          span{
            margin-left: 7px;
          }
        }
      }
    }
  }
}
</style>
