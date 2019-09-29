<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" :sticky="true">
      <b-navbar-brand to="/home">
        <div class="brand-title">
          <font-awesome-icon :icon="trello" size="lg"/>
          <h3 class="mb-0 ml-2">VueTrello</h3>
        </div>
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
  import {BNavbar, BNavbarBrand } from 'bootstrap-vue'
  import { faTrello } from '@fortawesome/free-brands-svg-icons'

  export default {
    name: "Navbar",
    components: {
      BNavbar,
      BNavbarBrand
    },
    computed: {
      trello () {
        return faTrello
      }
    }
  }
</script>

<style scoped>
  .brand-title{
    display: flex;
  }
</style>