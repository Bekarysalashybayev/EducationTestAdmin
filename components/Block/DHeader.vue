<template>
<div class="d-header">
  <div class="logo">
    <d-icon name="LogoIcon" :width="178" :height="40" />
  </div>
  <button class="burger" @click="$emit('close')">
    <d-icon name="BurgerIcon" width="2.375rem" height="1.46875rem"/>
  </button>
  <div class="lang">
    <lang-switcher />
  </div>
</div>
</template>

<script>
import DIcon from "@/components/core/icons/DIcon";
import LangSwitcher from "@/components/core/LangSwitcher";
export default {
  name: "DHeader",
  components: {LangSwitcher, DIcon}
}
</script>

<style scoped lang="scss">
.d-header{
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: $default_header_bg_color;
  padding: 0 rem(50);
  border-bottom: 1px solid $gray;
  z-index: 1000;
  display: flex;
  align-items: center;

  .logo{
    font-size: rem(30);
    overflow: hidden;
    color: #1864AB;

    &::v-deep{
      svg{
        width: rem(178);
      }
    }

    img{
      height: 100%;
      width: auto!important;
      object-fit: cover;
    }
  }
  .burger{
    margin-left: rem(86);
  }
  .lang{
    margin-left: auto;
  }

  @media screen and (max-width: $laptop_size){
    padding: 0 rem(20);

    .logo{
      order: 2;
      margin-top: -3px;
    }
    .burger{
      order: 1;
      margin-left: 0;
      margin-right: rem(20);
    }
    .lang{
      order: 3;
      margin-left: auto;
    }
  }
}
</style>
