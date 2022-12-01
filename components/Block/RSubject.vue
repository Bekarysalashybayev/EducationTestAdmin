<template>
  <div class="r-subject">
    <div class="description font-size-17">
      <span>{{ $t('result.r_name') }}</span> {{ subject['r_name'] }}
      <nuxt-link :to="localePath({path: `/ent/result/${id}/${subject['id']}`})" class="link font-size-15">{{ $t('result.work') }}</nuxt-link>
    </div>
    <div class="description font-size-17">
      <span>{{ $t('result.q_count') }}</span> {{ subject['q_count'] }}
    </div>
    <div class="description font-size-17">
      <span>{{ $t('result.q_score') }}</span> {{ subject['q_score'] }}
    </div>
    <div class="table">
      <table>
        <tbody>
        <tr>
          <td>
            {{ $t('result.q_number') }}
          </td>
          <td v-for="i in subject['test'].length" :key="i">
            {{ i }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('result.answer') }}
          </td>
          <td v-for="(item, i) in subject['test']" :key="`s-${i}`">
            {{ item.answer }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('result.score') }}
          </td>
          <td v-for="(item, i) in subject['test']" :key="`sc-${i}`">
            {{ item.score }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "RSubject",
  props: {
    subject: {
      type: Object,
      default: () => {
        return {
          id: 1,
          r_name: "История Казахстана",
          q_count: 20,
          q_score: 17,
          test: [
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            },
            {
              answer: "ABC",
              score: 1,
            }
          ]
        }
      }
    }
  },
  data(){
    return{
      id: this.$route.params.id
    }
  },
}
</script>

<style scoped lang="scss">
.r-subject {
  margin-top: 40px;

  .table{
    overflow-y: hidden;
    overflow-x: auto;
  }
  .description {
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }

    .link {
      color: $main_color;
      margin-left: 20px;

      &:hover {
        text-decoration: underline !important;
      }
    }

    span {
      width: 250px;
    }
  }
  @media screen and (max-width: 650px){
    .description {
      flex-wrap: wrap;

      .link{
        flex: 0 0 100%;
        margin-left: 0;
        margin-top: 10px;
      }

      &:first-child{
        span{
          flex: 0 0 100%;
          display: block;
          margin-bottom: 10px;
        }
      }
      span{
        font-weight: 550;
      }
    }
  }
}
table{
  border-collapse: collapse;
  margin-top: 20px;

  td{
    border: 1px solid #A5A5A5;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    color: $midnight;
    padding: 10px;
    background: #F5F8FF;
    border-left: 0;
    text-align: center;

    &:first-child{
      border-left: 1px solid #A5A5A5;
      text-align: left;
    }
  }
  @media screen and (max-width: 650px){
    td{
      padding: 5px;
      font-size: 14px;
      line-height: 1.2;

      &:first-child{
        white-space: nowrap
      }
    }
  }
}
</style>
