<template>
  <div class="default-layout">
    <d-header @close="isOpen = !isOpen"/>
    <div :class="['default-layout__content', isOpen ? 'open' : 'close']">
      <side-bar :is-open="isOpen" @close="isOpen = false"/>
      <nuxt/>
    </div>
    <loader :start="getGlobalLoader"/>
  </div>
</template>

<script>
import DHeader from "@/components/Block/DHeader";
import SideBar from "@/components/Block/SideBar";
import Loader from "@/components/core/Loader";

export default {
  name: "default",
  components: {SideBar, DHeader, Loader},
  data() {
    return {
      isOpen: true,
    }
  },
  computed:{
    getGlobalLoader(){
      return this.$store.state.test.loader
    },
  },
  // watch: {
  //   async $route(to, from) {
  //     if (typeof window !== 'undefined' && window.innerWidth < 1120) {
  //       this.isOpen = false
  //     }
  //   },
  // },
  mounted() {
    if (typeof window !== 'undefined' && window.innerWidth < 1120) {
      this.isOpen = false
    }
  },
}
</script>

<style scoped lang="scss">
.default-layout {
  min-height: 100vh;
  background-color: $default_bg_color;
  position: relative;

  &__content {
    position: relative;
    transition: padding-left ease-in-out .2s;

    &.open {
      padding-left: 300px;
    }

    &.close {
      padding-left: 100px;
    }
  }

  @media screen and (max-width: $desktop_min_size) {
    &__content {
      position: relative;
      transition: padding-left ease-in-out .2s;

      &.open {
        padding-left: 100px;
      }

      &.close {
        padding-left: 100px;
      }
    }
  }
  @media screen and (max-width: $laptop_size) {
    &__content {
      &.open {
        padding-left: 0;
      }

      &.close {
        padding-left: 0;
      }
    }
  }
}
</style>
