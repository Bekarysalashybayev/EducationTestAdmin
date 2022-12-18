<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title font-size-24">
        Тесты
        <nuxt-link to="/tests/add" class="c-btn add font-size-18">
          Добавить
        </nuxt-link>
      </div>
      <div class="filter">
        <select v-model="form.school" @change="filter">
          <option :value="null">Выберите школу</option>
          <option :value="s.id" v-for="(s, i) in schools" :key="i">
            {{ s.name }}
          </option>
        </select>
      </div>
      <div class="page-list">
        <div class="page-list-item" v-for="(test, i) in tests.data" :key="i">
          <div class="page-list-item-header">
            <div class="time">
              {{ $moment(test['start_time']).format("DD.MM-YYYY") }}
            </div>
            <div class="c-btn ml-auto">
              Редактировать
            </div>
            <div class="c-active">
              <label class="switch">
                <input type="checkbox" v-model="test['is_active']"
                       @change="publishTest(test)"
                       :disabled="test['is_active']"
                >
                <span class="slider round"></span>
              </label>
              {{ test['is_active'] ? "Активировано" : "Активировать" }}
            </div>
          </div>
          <div class="page-list-item-content">
            <div class="data">
              <div class="label">
                Название:
              </div>
              <div class="value n-value">
                <div class="icon">
                  <d-icon name="TestNameIcon" :width="20" :height="20"/>
                </div>
                {{ test.name }}
              </div>
            </div>
            <div class="data">
              <div class="label">
                Организация:
              </div>
              <div class="value s-value">
                {{ test['school']['name'] }}
              </div>
            </div>
            <div class="data">
              <div class="label">
                Начало:
              </div>
              <div class="value">
                {{ $moment(test['start_time']).format("DD.MM-YYYY HH:mm") }}
              </div>
            </div>
            <div class="data">
              <div class="label">
                Окончание:
              </div>
              <div class="value">
                {{ $moment(test['end_time']).format("DD.MM-YYYY HH:mm") }}
              </div>
            </div>
          </div>
          <div class="page-list-item-variants">
            <div :class="['variant-title', {open: isOpen === test.id}]">
              Варианты
              <button class="c-btn" @click="openBody(test.id)">
                <d-icon name="BtnArrowIcon" :width="8" :height="14"/>
              </button>
            </div>

            <div class="variant-body" v-show="isOpen === test.id">
              <template v-if="test.variants">
                <div class="variant-name" v-for="(v, i) in test.variants" :key="i">
                  Вариант № {{ v.name }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="page-pagination" v-if="tests.total_pages > 1">
        <client-only>
          <vs-pagination :total-pages="tests.total_pages" :current-page="tests.current_page" @change="changePage"></vs-pagination>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import DIcon from "@/components/core/icons/DIcon";

export default {
  name: "index",
  components: {DIcon},
  data() {
    return {
      tests: {
        count: 0,
        current_page: 1,
        data: [],
        links: {
          previous: null,
          next: null,
        },
        total_pages: 0,
      },
      form: {
        page: 1,
        page_size: 4,
        school: null,
      },
      schools: [],
      isOpen: null,
    }
  },
  mounted() {
    this.getTests()
    this.getSchools()
  },
  methods: {
    publishTest(test) {

    },
    async filter(){
      this.form.page = 1
      await this.getTests()
    },
    async changePage(page) {
      this.form.page = page
      await this.getTests()
    },
    async getTests() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get("/super-admin/test-list/", {params: this.form})
        if (data && data.data) {
          this.tests = data
        }
      } catch (e) {
        alert(e)
      } finally {
        this.SET_LOADER(false)
      }
    },
    async getSchools() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get("/quizzes/school/all/")
        if (data) {
          this.schools = data
        }
      } catch (e) {
        alert(e)
      } finally {
        this.SET_LOADER(false)
      }
    },
    openBody(id) {
      if (this.isOpen === id) {
        this.isOpen = null
        return
      }
      this.isOpen = id
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
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  &-title {
    margin-bottom: rem(40);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-list {

    &-item {
      background: #FFFFFF;
      border: 1px solid #A5A5A5;
      border-radius: 10px;
      padding: rem(20);
      margin-bottom: rem(40);

      &-header {
        display: flex;
        align-items: center;

        .time {
          font-weight: 550;
        }
      }

      &-content {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        line-height: 16px;

        .data {
          flex: 0 0 24%;

          .label {
            margin-bottom: 8px;
          }

          .s-value {
            font-weight: 550;
          }

          .n-value {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 17px;
            color: #005DAE;
          }
        }
      }

      &-variants {
        margin-top: rem(30);

        .variant {
          &-title {
            font-weight: 550;
            font-size: 17px;
            line-height: 21px;
            color: #000823;
            display: flex;
            align-items: center;

            button {
              margin-left: 20px;

              &::v-deep svg {
                transform: rotate(90deg);
                transition: transform linear .3s;
              }
            }

            &.open button::v-deep svg {
              transform: rotate(-90deg);
              transition: transform linear .3s;
            }
          }

          &-name {
            font-size: 14px;
            line-height: 17px;
            margin-top: 12px;
          }
        }
      }
    }
  }
}
.filter{
  margin-bottom: rem(30);

  select{
    padding: 7px 15px;
    font-size: 15px;
    width: 200px;

    &:focus{
      outline: none;
    }
  }
}
.c-active {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.c-btn {
  border: 1px solid #005DAE;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #005DAE;
  padding: 5px 10px;
  cursor: pointer;
  transition: all linear .3s;

  span {
    margin-right: 20px;
  }

  &::v-deep svg path {
    transition: all linear .3s;
  }

  &:hover {
    background-color: #005DAE;
    color: #FFFFFF;

    &::v-deep {
      svg path {
        fill: #FFFFFF !important;
      }
    }
  }

  &.add {
    width: 150px;
    background-color: #005DAE;
    color: #FFFFFF;

    &::v-deep {
      svg path {
        fill: #FFFFFF !important;
      }
    }

    &:hover {
      background-color: #FFFFFF;
      color: #005DAE;

      &::v-deep {
        svg path {
          fill: #005DAE !important;
        }
      }
    }
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-right: 8px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: 2px;
  bottom: 2.5px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #005DAE;
}

input:focus + .slider {
  box-shadow: 0 0 1px #005DAE;
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
