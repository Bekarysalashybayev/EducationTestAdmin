<template>
  <div class="a-svg-icons" :style="iconWrapper">
    <svg :width="width" :height="height" :viewBox="icons[0]" :class="{'fill-path': fillPath}" :fill="fill" xmlns="http://www.w3.org/2000/svg">
      <g :icon-name="name" v-html="fillColor(icons[1])" />
    </svg>
  </div>
</template>

<script>
import iconsImport from "./iconsImport.js";

export default {
  name: "DIcon",
  props: {
    width: {
      type: [String, Number],
      default: 17
    },
    height: {
      type: [String, Number],
      default: 17
    },
    name: {
      type: [String, null],
      default: null
    },
    background: {
      type: String,
      default: null
    },
    borderRadius: {
      type: String,
      default: null
    },
    fillPath: {
      type: [String, Boolean],
    },
    fill: {
      type: [String, Boolean],
    }
  },
  computed: {
    iconWrapper(){
      return {
        "background": this.background,
        "border-radius": this.borderRadius,
        '--fill-color': this.fillPath
      }
    },
    icons() {
      if (this.name && iconsImport[this.name])
        return iconsImport[this.name];
      return [];
    },
  },
  methods: {
    fillColor(str){
      str = str?.match(/%fillPlace%/g) ? str.replace(/%fillPlace%/g, this.fill) : str;
      str = str?.match(/%randomFill%/g) ? str.replaceAll(/%randomFill%/g, ()=>`#${this.randomFill()}`) : str;
      return str;
    },
    randomFill(){
      return Math.floor(Math.random()*16777215).toString(16);
    }
  }
}
</script>
<style scoped lang="scss">
.a-svg-icons{
  line-height: .5;
}
svg.fill-path::v-deep{
  path{
    fill: var(--fill-color);
  }
}
</style>
