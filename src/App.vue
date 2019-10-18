<template>
  <div id="app">
    <Navbar/>
    <router-view/>
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.25rem;
    background: #b3d8fb;
    min-height: 100vh;
  }
</style>