<template>
  <div>
    <nuxt />
    <loader :start="getGlobalLoader"/>
  </div>
</template>

<script>
import Loader from "../components/core/Loader";
export default {
  name: "blank",
  components: {Loader},
  computed:{
    getGlobalLoader(){
      return this.$store.state.test.loader
    },
  },
}
</script>

<style scoped>

</style>
