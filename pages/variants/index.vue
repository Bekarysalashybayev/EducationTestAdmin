<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title font-size-24">
        Варианты
        <button class="c-btn add" @click="$router.push('/variants/add')">
          <span> Добавить</span>
          <d-icon name="BtnArrowIcon" :width="7" :height="13"/>
        </button>
      </div>
      <div class="page-list">
        <div class="page-list-item" v-for="(variant, i) in variants" :key="i">
          <div class="header">
            <div class="name font-size-17">
              {{ variant.name }}
            </div>
            <div class="delete" @click="deleteTest(variant)">
              <d-icon name="VariantDeleteIcon" :width="16" :height="15"/>
            </div>
          </div>
          <div class="content">
            <div class="data">
              <span>Опубликовано:</span>
              <span>07.12.2021</span>
            </div>
            <div class="data">
              <span>Язык:</span>
              <span>Казахский</span>
            </div>
          </div>
          <div class="c-btn" @click="$router.push(`/variants/${variant.id}`)">
            <span>Список предметов</span>
            <d-icon name="BtnArrowIcon" :width="7" :height="13"/>
          </div>
        </div>
      </div>
    </div>
    <test-modal
      v-if="isDelete"
      icon="infoModalIcon"
      @close="isDelete=false">
      <div class="buy-modal">
        <div class="m-text mt-20 font-size-20">
          Вы точно хотите удалить этот вариант?
        </div>
        <div class="m-btns">
          <button class="m-btn font-size-20" @click="deleteCurrentTest">
            Да
          </button>
          <button class="m-btn cancel font-size-20" @click="cancelDeleteCurrentTest">
            Отмена
          </button>
        </div>
      </div>
    </test-modal>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import DIcon from "~/components/core/icons/DIcon";
import TestModal from "~/components/TestModal";

export default {
  name: "index",
  components: {DIcon, TestModal},
  data() {
    return {
      variants: [],
      isDelete: false,
      currentDeleteVariant: null,
    }
  },
  head: {
    title: "Варианты"
  },
  mounted() {
    this.getVariants()
  },
  methods: {
    deleteTest(test) {
      this.currentDeleteTest = test
      this.isDelete = true
    },
    cancelDeleteCurrentTest() {
      this.currentDeleteTest = null
      this.isDelete = false
    },
    async deleteCurrentTest() {
      this.isDelete = false
      this.SET_LOADER(true)
      try {
        await this.$axios.delete(`/super-admin/destroy-variant/${this.currentDeleteTest.id}/`)
        this.$toast.success('Тест удален успешно!')
        this.currentDeleteTest = null
        await this.getVariants()
      } catch (er) {
        this.$toast.error('Ошибка!')
      }finally {
        this.SET_LOADER(false)
      }
    },
    async getVariants() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get("/super-admin/variant-list/?page_size=1000")
        if (data) {
          this.variants = data.data
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
    justify-content: space-between;
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
      padding: rem(20);
      margin: rem(20);
      min-width: 316.67px;
      max-width: 400px;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          font-weight: 550;
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

.c-btn {
  margin-top: 16px;
  border: 1px solid #1864AB;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
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

  &.add {
    width: 150px;
    background-color: #1864AB;
    color: #FFFFFF;

    &::v-deep {
      svg path {
        fill: #FFFFFF !important;
      }
    }
    &:hover {
      background-color: #FFFFFF;
      color: #1864AB;

      &::v-deep {
        svg path {
          fill: #1864AB !important;
        }
      }
    }
  }
}

.buy-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000823;

  .m-title {
    font-weight: 550;
    margin: rem(30) rem(50);
  }

  .m-text {
    &.mt-20 {
      margin: rem(30) 0 rem(10) !important;
    }
  }

  .m-btn {
    margin-top: rem(30);
    padding: 10px 25px;
    background-color: #1864AB;
    color: #FFFFFF;

    min-width: rem(140);

    &.cancel {
      background-color: #FFFFFF;
      color: #1864AB;
      border: 1px solid #1864AB;
      margin-left: rem(30);
    }
  }
}

.btn {
  margin-top: rem(40);
  width: 100%;
  padding: 10px 0;
  text-align: center;
  border: 1px solid $main_color;
  color: $main_color;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  display: block;
  transition: all ease .2s;

  &:hover {
    background-color: $main_color;
    color: $white;
  }
}
</style>
