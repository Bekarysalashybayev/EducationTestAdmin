<template>
  <div class="page">
    <div class="title font-size-24">{{ $t('variant.title') }}</div>
    <div class="sub-title font-size-17">
      {{ $t('variant.s_title_1') }}
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.name') }}
      </div>
      <div class="name font-size-17">
        Толғанай
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.last_name') }}
      </div>
      <div class="name font-size-17">
        Ақылбекова
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.middle_name') }}
      </div>
      <div class="name font-size-17">
        Мұхитқызы
      </div>
    </div>
    <div class="sub-title mt-70 font-size-17">
      {{ $t('variant.s_title_2') }}
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.subject_1') }}
      </div>
      <div class="name font-size-17">
        Математическая грамотностьx
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.subject_2') }}
      </div>
      <div class="name font-size-17">
        Математическая грамотность
      </div>
    </div>
    <div class="description">
      <div class="label font-size-15">
        {{ $t('variant.subject_3') }}
      </div>
      <div class="name font-size-17">
        История Казахстана
      </div>
    </div>
    <div class="sub-title mt-50 font-size-17">
      {{ $t('variant.s_title_3') }}
    </div>
<!--    <div class="select">-->
<!--      <select class="font-size-17" v-model="lang">-->
<!--        <option :value="null" disabled selected>-->
<!--          {{ $t('variant.select_lang') }}-->
<!--        </option>-->
<!--        <option value="0">Қазақша</option>-->
<!--        <option value="1">Русский</option>-->
<!--      </select>-->
<!--    </div>-->
    <div class="select">
      <select class="font-size-17">
        <option :value="null" disabled selected>
          {{ $t('variant.select_subject') }}
        </option>
      </select>
    </div>
    <div class="btn-row">
      <div class="btn font-size-17">
        {{ $t('variant.next') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      lang: 0,
    }
  },
}
</script>

<style scoped lang="scss">
.mt-70 {
  margin-top: rem(70);
}

.mt-50 {
  margin-top: rem(50);
}
.btn-row{
  margin-top: rem(50);
  display: flex;
  justify-content: center;
  .btn {
    padding: 10px rem(50);
    text-align: center;
    border: 1px solid $main_color;
    color: $main_color;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all ease .2s;

    &:hover {
      background-color: $main_color;
      color: $white;
    }
  }
}

.page {
  padding: rem(30) rem(50);

  .select {
    margin-top: rem(20);

    select {
      border: 0;
      border-bottom: 1px solid #686868;
      max-width: 500px;
      width: 100%;
      padding-bottom: 6px;

      &:focus {
        outline: none;
      }
    }
  }

  .title {
    color: $main_color;
    font-weight: 600;
    margin-bottom: rem(40);
  }

  .sub-title {
    color: $midnight;
    font-weight: 550;
    margin-bottom: rem(5);
  }

  .description {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &:first-child {
      label {
        margin-top: 0;
      }

      .name {
        margin-top: 0rem;
      }
    }

    .label {
      color: #686868;
      font-weight: 400;
      width: 150px;
      margin-top: rem(20);;
    }

    .name {
      color: $midnight;
      font-weight: 500;
      margin-top: rem(20);
    }
  }
}
</style>
