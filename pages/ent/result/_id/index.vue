<template>
  <div class="page">
    <div class="title font-size-22">
      {{ $t('result.title') }}
    </div>
    <div class="all-score font-size-24">
      <span>140</span> / 140
    </div>
    <r-subject v-for="i in 3" :key="i"/>
  </div>
</template>

<script>
import RSubject from "@/components/Block/RSubject";
export default {
  name: "index",
  components: {RSubject}
}
</script>

<style scoped lang="scss">
.page {
  padding: rem(30) rem(50);
  color: $midnight;

  .title{
    font-weight: 500;
    text-align: center;
  }
  .all-score{
    margin-top: rem(20);
    text-align: center;

    span{
      font-weight: 550;
      color: $main_color;
    }
  }
}
</style>
