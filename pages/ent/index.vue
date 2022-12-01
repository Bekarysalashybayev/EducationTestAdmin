<template>
  <div class="test">
    <div class="title font-size-17">{{ $t('main.title_new') }}</div>
    <div class="test__list">
      <div class="test__list-block" v-for="i in 2" :key="i">
        <div class="test__list-block-content">
          <img src="../../assets/img/ent.png" alt="">
          <div class="test__list-block-content-data">
            <div class="test__list-block-content-data-title font-size-20">
              Пробный тест
            </div>
            <div class="test__list-block-content-data-description font-size-15">
            <span>
              {{ $t('main.test_time') }}
            </span>
              <span>
              03.11.2021
            </span>
            </div>
            <div class="test__list-block-content-data-description font-size-15">
              <span>
                {{ $t('main.status') }}
              </span>
              <span class="color_green">
                Доступен
              </span>
            </div>
          </div>
        </div>
        <nuxt-link :to="localePath({path: `/ent/456`})" class="btn font-size-17">
          Начать
        </nuxt-link>
      </div>
    </div>
    <div class="title font-size-17 mt-20">{{ $t('main.title_my') }}</div>
    <div class="test__list">
      <div class="test__list-block" v-for="i in 3" :key="i">
        <div class="test__list-block-content">
          <img src="../../assets/img/ent.png" alt="">
          <div class="test__list-block-content-data">
            <div class="test__list-block-content-data-title font-size-20">
              Пробный тест
            </div>
            <div class="test__list-block-content-data-description font-size-15">
            <span>
              {{ $t('main.test_time') }}
            </span>
              <span>
              03.11.2021
            </span>
            </div>
            <div class="test__list-block-content-data-description font-size-15">
            <span>
              {{ $t('main.status') }}
            </span>
              <span class="color-blue">
              Завершён
            </span>
            </div>
          </div>
        </div>
        <nuxt-link :to="localePath({path: `/ent/result/1`})" class="btn font-size-17">
          Посмотреть результаты
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="scss">
.btn{
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

  &:hover{
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
