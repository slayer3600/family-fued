<template>
  <div id="app">
    <ol>
      <li v-for="(msg, index) in ch1" :key="index">{{ msg.message }}</li>
    </ol>
  </div>
</template>
<script>
export default {
  name: "PubNubTest",

  data() {
    return {
      ch1: this.$pnGetMessage("ch1")
    };
  },

  mounted() {
    console.log("PubNub test mounted");
    this.$pnSubscribe({ channels: ["ch1", "ch2"], withPresence: true });
  },

  created() {
    console.log("PubNub test created");
    // this.$pnSubscribe({ channels: ["ch1", "ch2"], withPresence: true });
  }
};
</script>
