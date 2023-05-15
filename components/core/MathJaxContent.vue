<template>
  <div class="aaa" ref="content" v-html="content" @DOMNodeInserted="updateMathJax"></div>
</template>

<script>
export default {
  name: "MathJaxContent",
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateMathJax() {
      if (process.client && window.MathJax) {
        setTimeout(() => {
          window.MathJax.typesetPromise([this.$refs.content]).catch((err) => {
            console.error(err);
          }, 0);
        })
      }
    },
  },
  mounted() {
    this.updateMathJax();
  },
  updated() {
    this.updateMathJax();
  },
};
</script>
