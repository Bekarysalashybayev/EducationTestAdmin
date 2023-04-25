<template>
<div class="page">
  <div class="page-body">
    <div class="page-title font-size-24">
      <div class="back" @click="$router.push('/variants')">
        <d-icon name="ComeBackIcon" :width="30" :height="30"/>
      </div>
      Предметы
    </div>
    <div class="page-list">
      <div class="page-list-item" v-for="(lesson, i) in lessons" :key="i">
        <div class="header">
          <div class="name font-size-17">
            {{ lesson['lesson']['name'] }}
          </div>
        </div>
        <div class="c-btn-list">
          <div class="c-btn" @click="$router.push(`/variants/${variant_id}/${lesson.id}/import`)">
            <span>Импорт</span>
            <d-icon name="BtnArrowIcon" :width="7" :height="13"/>
          </div>
          <div class="c-btn" @click="$router.push(`/variants/${variant_id}/${lesson.id}/questions`)">
            Список вопросов
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapMutations} from "vuex";
import DIcon from "~/components/core/icons/DIcon";

export default {
  name: "index",
  components: {DIcon},
  data(){
    return{
      variant_id: this.$route.params.id,
      lessons: [],
    }
  },
  head: {
    title: "Варианты"
  },
  mounted() {
    this.getLessons()
  },
  methods: {
    async getLessons() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get(`/super-admin/variant-lessons/${this.variant_id}/`)
        if (data) {
          this.lessons = data
        }
      } catch (e) {
        alert(e)
      } finally {
        this.SET_LOADER(false)
      }
    },
    ...mapMutations({
      SET_LOADER: 'test/SET_LOADER'
    }),
  },
}
</script>

<style scoped lang="scss">
.page {
  color: #000823;

  &-title {
    margin-bottom: rem(40);
    display: flex;
    align-items: center;

    .back{
      margin-right: 20px;
      cursor: pointer;

      &:hover{
        opacity: .9;
      }
    }
  }

  &-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: rem(-20);

    &-item {
      flex: 0 0 calc(33% - 40px);
      background: #FFFFFF;
      border: 1px solid #A5A5A5;
      border-radius: 10px;
      padding: rem(15);
      margin: rem(20);
      min-width: 316.67px;
      max-width: 400px;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          font-weight: 500;
        }

        .delete {
          cursor: pointer;
        }
      }

      .content {
        .data {
          display: flex;
          align-items: center;
          margin-top: 16px;

          span {
            display: block;
            font-size: 14px;
            line-height: 17px;

            &:first-child {
              width: 150px;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
}
.c-btn-list{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.c-btn {
  flex: 0 0 calc(50% - 7.5px);
  margin-top: 16px;
  border: 1px solid #1864AB;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #1864AB;
  padding: 10px 0;
  cursor: pointer;
  transition: all linear .3s;

  span {
    margin-right: 20px;
  }

  &::v-deep svg path {
    transition: all linear .3s;
  }

  &:hover {
    background-color: #1864AB;
    color: #FFFFFF;

    &::v-deep {
      svg path {
        fill: #FFFFFF !important;
      }
    }
  }
}
</style>
