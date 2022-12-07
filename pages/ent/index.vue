<template>
  <div class="test">
    <div class="title font-size-17">{{ $t('main.title_new') }}</div>
    <div class="test__list">
      <div class="test__list-block ent">
        <div class="test__list-block-content">
          <img src="../../assets/img/ent-buy.png" alt="">
          <div class="test__list-block-content-data">
            <div class="test__list-block-content-data-title font-size-20">
              {{ $t('buy_test.title') }}
            </div>
            <div class="test__list-block-content-data-description font-size-15">
              <span>
                <d-icon name="testTypeIcon"/>
                {{ $t('buy_test.type') }}
              </span>
              <span>
               {{ $t('buy_test.type_text') }}
              </span>
            </div>
            <div class="test__list-block-content-data-description font-size-15">
              <span>
                <d-icon name="testDurationIcon"/>
                {{ $t('buy_test.duration') }}
              </span>
              <span>
                {{ $t('buy_test.duration_text') }}
              </span>
            </div>
            <div class="test__list-block-content-data-description font-size-15">
              <span>
                <d-icon name="testPriceIcon"/>
                {{ $t('buy_test.price') }}
              </span>
              <span>
                500 ₸
              </span>
            </div>
          </div>
        </div>
        <button class="btn font-size-17" @click="isBuy = true">
          {{ $t('buy_test.buy') }}
        </button>
      </div>
    </div>
    <div class="title font-size-17 mt-20" v-if="old_tests.length">{{ $t('main.title_my') }}</div>
    <div class="test__list">
      <div class="test__list-block" v-for="(test, i) in new_tests" :key="`new-${i}`">
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
    <test-modal
      v-if="isSuccess"
      icon="successModalIcon"
      @close="isSuccess=false">
      <div class="buy-modal">
        <div class="m-title font-size-24">
          {{ $t('buy_test.success.title') }}
        </div>
        <div class="m-text font-size-20">
          {{ $t('buy_test.success.text') }}
        </div>
        <button class="m-btn font-size-20" @click="isSuccess=false">
          Ok
        </button>
      </div>
    </test-modal>
    <test-modal
      v-if="isError"
      icon="errorModalIcon"
      @close="isError=false">
      <div class="buy-modal">
        <div class="m-title font-size-24">
          {{ $t('buy_test.error.text') }}
        </div>
        <div class="m-text font-size-20">
          {{ $t('buy_test.error.text') }}
        </div>
        <nuxt-link :to="localePath('/instruction')" class="m-btn font-size-20">
          {{ $t('buy_test.error.link') }}
        </nuxt-link>
      </div>
    </test-modal>
    <test-modal
      v-if="isBuy"
      @close="isBuy=false">
      <div class="buy-modal">
        <div class="m-title font-size-24">
          {{ $t('buy_test.modal.title') }}
        </div>
        <div class="m-text font-size-20">
          {{ $t('buy_test.modal.text') }}
        </div>
        <div class="m-btns">
          <button class="m-btn cancel font-size-20" @click="isBuy=false">
            {{ $t('buy_test.modal.cancel') }}
          </button>
          <button class="m-btn font-size-20" @click="buyTest">
            {{ $t('buy_test.modal.confirm') }}
          </button>
        </div>
      </div>
    </test-modal>
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
      list: [],
      isSuccess: false,
      isError: false,
      isBuy: false,
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
    async buyTest() {
      this.isBuy = false
      this.setLoader(true)
      try {
        await this.$axios.post('/quizzes/buy-test/')
        this.isSuccess = true
        await this.getTestList()
      } catch (e) {
        if (e.response.data.detail === "Баланс не достаточно") {
          this.isError = true
        } else {
          alert(e)
        }
      } finally {
        this.setLoader(false)
      }
    },
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

  }

  .m-btn {
    margin-top: rem(30);
    padding: 10px 25px;
    background-color: #005DAE;
    color: #FFFFFF;

    min-width: rem(140);

    &.cancel {
      background-color: red;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;

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

      .ent &-content {

        img {
          width: 180px;
          height: 122px;
          border-radius: 0;
        }

        &-data {

          &-description {

            span {
              display: flex;
              align-items: center;

              &::v-deep .a-svg-icons {
                margin-right: 8.55px;
              }
            }
          }
        }
      }

      @media screen and (min-width: $laptop_size) {
        min-width: 400px;

        &.ent {
          min-width: 495px !important;
        }
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

      @media screen and (max-width: 768px) {
        min-width: calc(100% - 30px);
        width: 495px;
        max-width: 495px;

        .ent &-content {
          &-data {

            &-description {
              margin-top: 12px;
            }
          }
        }
      }
      @media screen and (max-width: 500px) {
        .ent &-content {
          img {
            width: 70px;
            height: auto;
          }
        }
      }
    }
  }
}
</style>
