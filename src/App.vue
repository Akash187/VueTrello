<template>
  <div id="app">
    <Navbar/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from "./components/ui/Navbar";
  export default {
    components: {Navbar},
    created() {
      this.$store.dispatch('checkIsAuthenticated');
    }
  }
</script>

<style>
  @import './assets/styles/variables.css';

  html, body {
    height:100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.25rem;
    background: #00aecc;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .content {
    padding-top: 4rem;
  }

  .smooth-dnd-container{
    min-height: 10px !important;
    min-width: 0 !important;
  }
</style>