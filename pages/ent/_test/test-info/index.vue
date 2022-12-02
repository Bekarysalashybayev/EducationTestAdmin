<template>
  <div class="go-test-page">
    <div class="page">
      <div class="info">
        <div class="header">
          <img src="@/assets/img/Note.svg" alt="">
          <span class="font-size-20">{{ $t('test.info.note') }}</span>
        </div>
        <div class="info-body font-size-17">
          <div class="description">
            <span>{{ $t('test.info.attempt') }}</span>
            <span>{{ testData.number_of_attempts }}</span>
          </div>
          <div class="description">
            <span>{{ $t('test.info.deadline') }}</span>
            <span>{{ $moment(testData.end_time).format('DD.MM.YYYY, HH-mm-ss') }}</span>
          </div>
          <div class="description">
            <span>{{ $t('test.info.duration') }}</span>
            <span>{{ testData.duration }} минут</span>
          </div>
        </div>
        <div class="test-info">
          <div class="d-item">
            <div class="d-icon">
              <img src="@/assets/img/d-info1.png" alt="">
            </div>
            <div class="d-text">
              {{ $t('test.info.test_duration') }}
            </div>
          </div>
          <div class="d-item">
            <div class="d-icon">
              <img src="@/assets/img/d-info2.png" alt="">
            </div>
            <div class="d-text">
              {{ $t('test.info.item1') }}
            </div>
          </div>
          <div class="d-item">
            <div class="d-icon">
              <img src="@/assets/img/d-info3.png" alt="">
            </div>
            <div class="d-text">
              {{ $t('test.info.item2') }}
            </div>
          </div>
          <div class="d-item">
            <div class="d-icon">
              <img src="@/assets/img/d-info4.png" alt="">
            </div>
            <div class="d-text">
              {{ $t('test.info.item3') }}
            </div>
          </div>
        </div>
        <div class="bottom font-size-17">
          <nuxt-link :to="this.localePath({path: `/ent/${this.id}/test-info/${this.testData.variant}`})"
                     class="start">
            <span v-if="testData.status == 'CONTINUE'">{{ $t('test.info.continue') }}</span>
            <span v-else>{{ $t('test.info.start') }}</span>
          </nuxt-link>
          <button class="back" @click="back">
            {{ $t('test.info.back') }}
          </button>
        </div>
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
      id: this.$route.params.test,
      testData: {
        duration: 0,
        number_of_attempts: 1,
        end_time: null,
      },
    }
  },
  mounted() {
    this.getTestInfo()
  },
  methods: {
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    back() {
      this.$router.push(this.localePath({path: '/ent'}))
    },
    async getTestInfo() {
      this.setLoader(true)
      try {
        const {data} = await this.$axios.get(`/quizzes/student-test-information/ent/${this.id}/`)
        if (data) {
          this.testData = data
        }
      } catch (e) {
        this.$toast.error(this.$t('default.not_found').toString())
        await this.$router.push(this.localePath('/ent'))
      } finally {
        this.setLoader(false)
      }
    },
  }
}
</script>
<style scoped lang="scss">
.page {
  padding: rem(30) rem(50);
}

.header {
  display: flex;
  align-items: center;
  flex-direction: column;

  span {
    color: $main_color;
    margin-top: rem(20);
    font-weight: bold;
  }
}

.info-body {
  margin-top: rem(40);

  .description {
    display: flex;
    align-items: center;
    margin-top: rem(15);

    &:first-child {
      margin-top: 0;
    };

    span {
      display: block;

      &:first-child {
        min-width: 150px;
        width: rem(300);
      }
    }
  }
}

.test-info {
  border-radius: 10px;
  padding: 20px;
  margin: rem(40) 0;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  background: #F5F8FF;
}

.d-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.d-icon {
  flex: 0 0 30px;
  margin-right: 10px;
}

.d-icon img {
  width: 100%;
}

.page {
  padding: 3rem 5rem;
  min-height: calc(100vh - 66px);
}

.page .info {
  width: 100%;
  max-width: 470px;
  margin: 0 auto;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}

.start {
  display: block;
  padding: 8px 10px;
  background: #005DAE;
  border: 1px solid #005DAE;
  color: #FFFFFF;
}

.start:hover {
  opacity: 0.8;
}

.back {
  padding: 8px 10px;
  border: 1px solid #005DAE;
  box-sizing: border-box;
  color: #005DAE;
  margin-left: rem(40);
}
@media screen and (max-width: $laptop_size){
  .page{
    padding: 25px 10px;
  }
}
</style>
