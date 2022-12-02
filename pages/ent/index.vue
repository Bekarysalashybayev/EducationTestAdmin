<template>
  <div class="test">
    <div class="title font-size-17" v-if="new_tests.length">{{ $t('main.title_new') }}</div>
    <div class="test__list">
      <div class="test__list-block" v-for="(test, i) in new_tests" :key="i">
        <div class="test__list-block-content">
          <img src="../../assets/img/ent.png" alt="">
          <div class="test__list-block-content-data">
            <div class="test__list-block-content-data-title font-size-20">
              {{ test.name }}
            </div>
            <div class="test__list-block-content-data-description font-size-15">
              <span>
                {{ $t('main.test_time') }}
              </span>
              <span>
               {{ test['end_time'] }}
              </span>
            </div>
            <div class="test__list-block-content-data-description font-size-15">
              <span>
                {{ $t('main.status') }}
              </span>
              <span class="color_green">
                {{ $t('main.available') }}
              </span>
            </div>
          </div>
        </div>
        <nuxt-link :to="localePath({path: `/ent/${test.id}`})"
                   class="btn font-size-17"
                   v-if="test.status === 'NOT_PASSED'"
        >
          {{ $t('main.start') }}
        </nuxt-link>
        <nuxt-link :to="localePath({path: `/ent/${test.id}/test-info`})"
                   class="btn font-size-17"
                   v-else
        >
          {{ $t('main.continue') }}
        </nuxt-link>
      </div>
    </div>
    <div class="title font-size-17 mt-20" v-if="old_tests.length">{{ $t('main.title_my') }}</div>
    <div class="test__list">
      <div class="test__list-block" v-for="(test, i) in old_tests" :key="i">
        <div class="test__list-block-content">
          <img src="../../assets/img/ent.png" alt="">
          <div class="test__list-block-content-data">
            <div class="test__list-block-content-data-title font-size-20">
              {{ test.name }}
            </div>
            <div class="test__list-block-content-data-description font-size-15">
            <span>
              {{ $t('main.test_time') }}
            </span>
              <span>
              {{ test['end_time'] }}
            </span>
            </div>
            <div class="test__list-block-content-data-description font-size-15">
            <span>
              {{ $t('main.status') }}
            </span>
              <span class="color-blue">
                {{ $t('main.finished') }}
            </span>
            </div>
          </div>
        </div>
        <nuxt-link :to="localePath({path: `/ent/result/${test.id}`})" class="btn font-size-17">
          {{ $t('main.show') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "index",
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getTestList()
  },
  computed: {
    new_tests() {
      return this.list.filter((e) => ['CONTINUE', 'NOT_PASSED'].includes(e.status))
    },
    old_tests() {
      return this.list.filter((e) => ['PASSED', 'EXPIRED'].includes(e.status))
    },
  },
  methods: {
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    async getTestList() {
      this.setLoader(true)
      try {
        const {data} = await this.$axios.get('quizzes/student-test-list/')
        if (data) {
          this.list = data
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

.color_green {
  color: $green;
}

.color-blue {
  color: $main_color;
}

.color-red {
  color: $red;
}

.mt-20 {
  margin-top: rem(50);
}

.test {
  padding: rem(50);

  .title {
    font-weight: 500;
    color: $midnight;
    margin-bottom: rem(20);
  }

  &__list {
    margin-bottom: rem(40);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: -20px;

    &-block {
      padding: rem(20);
      background: $white;
      border: 1px solid #A5A5A5;
      box-shadow: 0px 1px 10px rgba(214, 214, 214, 0.38);
      border-radius: 10px;
      flex: 1;
      max-width: 495px;
      margin: 20px;

      &-content {
        display: flex;

        img {
          width: 70px;
          height: 70px;
          border-radius: 50px;
          margin-right: 20px;
        }

        &-data {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          &-title {
            font-weight: 500;
            color: $midnight;
          }

          &-description {
            color: $midnight;
            display: flex;
            align-items: center;

            span {
              display: block;

              &:first-child {
                margin-right: 5px;
              }
            }
          }
        }
      }

      @media screen and (min-width: $laptop_size) {
        min-width: 350px;
        &-content {
          display: flex;

          img {
            width: 100px;
            height: 100px;
          }

          &-data {

            &-description {

              span {
                &:first-child {
                  width: 150px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
