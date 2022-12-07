<template>
  <modal-window @close="$emit('close')">
    <template #content>
      <div :class="['test-modal', {pt: icon}]">
        <div class="close" @click="$emit('close')">
          <d-icon name="closeModalIcon" :width="23.8" :height="30"/>
        </div>
        <div class="icon" v-if="icon">
          <d-icon :name="icon" :width="138" :height="138"/>
        </div>
        <slot />
      </div>
    </template>
  </modal-window>
</template>

<script>
import ModalWindow from "@/components/core/ModalWindow";
import DIcon from "@/components/core/icons/DIcon";

export default {
  name: "TestModal",
  components: {DIcon, ModalWindow},
  props: {
    icon: {
      type: String,
    }
  }
}
</script>

<style scoped lang="scss">
.test-modal {
  min-width: 100%;
  min-height: 100%;
  position: relative;
  padding: rem(20) 0;

  &.pt{
    padding: rem(50) 0 rem(20);
  }

  .icon{
    display: flex;
    justify-content: center;

    &::v-deep svg{
      width: rem(120);
      height: rem(120);
      min-width: 50px;
      min-height: 50px;
    }
  }
  .close{
    position: absolute;
    top: rem(-5);
    right: rem(-5);
    cursor: pointer;

    &::v-deep svg{
      width: rem(30);
      height: rem(30);
      min-width: 20px;
      min-height: 20px;
    }
  }
}
</style>
