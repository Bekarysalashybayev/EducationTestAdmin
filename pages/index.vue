<template>
  <div class="page">
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  created() {
    this.$router.push(this.localePath({path: "/students"}))
  },
}
</script>
