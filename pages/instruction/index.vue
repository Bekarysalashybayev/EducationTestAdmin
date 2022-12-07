<template>
  <div class="page">
    <div class="step">
      <div class="title font-size-20">
        {{ $t('instruction.step') }} № 1.
      </div>
      <div class="block">
        <img src="../../assets/img/instr-1.png" alt="instr">
        <div class="text font-size-18">
          <p>{{ $t('instruction.text_1') }}</p>
          <p>{{ $t('instruction.text_2') }}</p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="title font-size-20">
        {{ $t('instruction.step') }} № 2.
      </div>
      <div class="block">
        <img src="../../assets/img/instr-2.png" alt="instr">
        <div class="text font-size-18">
          <p>{{ $t('instruction.text_3') }}
            <span>{{ currentUser.user_id }}</span>
          </p>
          <p>{{ $t('instruction.text_4') }}
            <span>{{ currentUser.first_name + " " + currentUser.last_name }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="title font-size-20">
        {{ $t('instruction.step') }} № 3.
      </div>
      <div class="block">
        <img src="../../assets/img/instr-3.png" alt="instr">
        <div class="text font-size-18">
          <p>{{ $t('instruction.text_5') }}</p>
          <p>{{ $t('instruction.text_6') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  computed: {
    currentUser(){
      return this.$store.getters["user/getCurrentUser"]
    },
  },
}
</script>

<style scoped lang="scss">
.page {
  padding: rem(30) rem(50);

  .step {
    padding: rem(30);
    background: #FFFFFF;
    border: 1px solid #E2E2E2;
    border-radius: 10px;
    margin-top: rem(60);

    &:first-child {
      margin-top: 0;
    }

    .title {
      font-weight: 550;
      background: #F5F8FF;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      padding: rem(10) rem(15);
      width: max-content;
      margin-bottom: rem(30);
    }

    .block {
      display: flex;

      img {
        width: 264px;
        margin-right: rem(30);
      }
      p{
        margin-bottom: 10px;

        span{
          color: #005DAE;
          font-weight: bold;
        }

        &:last-child{
          margin-bottom: 0;
        }
      }
    }

    @media screen and (max-width: 900px) {
      .block {
        display: block;

        img {
          width: 264px;
          margin-right: 0;
          margin-bottom: rem(30);
        }
      }
    }
  }
}
</style>
