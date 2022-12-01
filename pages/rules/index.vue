<template>
  <div class="page">
    <div class="page-body">
      <div class="regular-title font-size-24">
        {{ $t('regulation.title') }}
      </div>
      <div class="regular-body">
        <div class="text title font-size-20">
          <span>{{ $t('regulation.header.title') }}</span>
          {{ $t('regulation.header.text') }}
        </div>
        <ul>
          <li class="font-size-18">{{ $t('regulation.text') }}</li>
          <li class="font-size-18">{{ $t('regulation.text1') }}</li>
          <li class="font-size-18">{{ $t('regulation.text2') }}</li>
          <li class="font-size-18">{{ $t('regulation.text3') }}
            <a href="https://wa.me/+77770212808" target="_blank" class="number">
              87778244593
            </a>
          </li>
        </ul>
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
.page{
  padding: rem(30) rem(50);
}
.regular-title {
  font-weight: 500;
  color: #000000;
  margin-bottom: 4rem;
}

.regular-body {
  background: #FFFFFF;
  padding: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
}

.title span {
  font-weight: bold;
}
ul{
  padding-left: rem(20);
}
.text, ul li {
  font-weight: 400;
  color: #000000;
  margin-bottom: 1rem;
}

.text {
  margin-bottom: 5rem;
}
a:hover{
  text-decoration: underline!important;
}
</style>
