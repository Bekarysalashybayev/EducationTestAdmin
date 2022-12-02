<template>
  <p class="time__int number font-size-17">
    {{ hours | two_digits }}:{{ minutes | two_digits }}:{{ seconds | two_digits }}
  </p>

</template>

<script>

export default {
  name: "Timer",
  props:['date', 'stop'],
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000),
      t: 0,
    }
  },
  mounted() {
      this.t = window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
      },1000);
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(this.date / 1000)
    },
    seconds() {
      return Math.trunc((this.dateInMilliseconds - this.now)) % 60;
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
    },
  },
  watch: {
    stop: function (){
      clearInterval(this.t)
    },
    seconds: function (){
      if (this.seconds <= 0 && this.minutes <=0 && this.hours<=0) {
        clearInterval(this.t)
        this.$emit('timeStop')
      }
    },

  },
  filters: {
    two_digits: function (value) {
      if (!value) return '00'
      if(value<10){
        return "0"+value
      }
      return value
    }
  }
}
</script>

<style scoped>
.time__int{
  color: #005DAE;
  font-weight: bold;
}
</style>
