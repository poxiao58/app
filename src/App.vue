<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
<!--    <HelloWorld/>-->
<!--   <upload-img></upload-img>-->
<!--    <home/>-->
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/UploadImg'
import home from "./components/home";

export default {
  name: 'App',
  components: {
    HelloWorld,
    home
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
  /*margin-top: 60px;*/
}
</style>
