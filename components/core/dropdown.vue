<template>
  <section class="dropdown__menu">
    <div class="dropdown-header" @click="toggle">
        <slot name="header">
        </slot>
    </div>
    <section class="dropdown__menu-body" v-click-outside="toggle" v-if="isOpen" :class="styleList">
        <slot name="body"></slot>
    </section>
  </section>
</template>

<script>
export default {
  name: "dropdown",
  props: ['styleList'],
  data(){
    return{
      isOpen: false,
    }
  },
  methods:{
    toggle(){
      this.isOpen = !this.isOpen
    },
  }
}
</script>

<style scoped>
.dropdown__menu{
  position: relative;
  z-index: 1000;
}
.dropdown__menu-header{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 0;
}
.dropdown__menu-body{
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 15;
  display: flex;
  justify-content: flex-end;
}
.right_0{
  left: initial!important;
  right: 0!important;
}

@media (max-width: 850px) {
  .pos__static{
    position: static;
  }
}
</style>
