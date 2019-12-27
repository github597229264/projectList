<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang='scss'>
@import "./assets/styles/reset";
@import "./assets/styles/common";
@import "./assets/styles/font.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
