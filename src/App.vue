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
    background-color: white !important;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #696969;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #696969;
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

  .smooth-dnd-container.horizontal{
    display: flex !important;
    overflow-x: auto !important;
  }
</style>