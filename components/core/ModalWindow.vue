<template>
<div class="modal__window">
  <div class="modal__content scroll">
    <slot name="content"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "ModalWindow",
  mounted() {
    document.body.style.overflow = "hidden"
  },
  beforeDestroy() {
    document.body.style.overflow = "auto"
  },
}
</script>

<style scoped>
.modal__window{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.modal__content{
  background: #FFFFFF;
  border-radius: 20px;
  min-height: 200px;
  min-width: 200px;
  max-width: calc(100vw - 20px);
  max-height: calc(100vh - 50px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 3rem;
  position: relative;
}
.scroll::-webkit-scrollbar {
  width: 3px;
}
.scroll::-webkit-scrollbar-track {
  background-color: transparent;
}
.scroll::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
