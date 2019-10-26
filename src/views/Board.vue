<template>
  <div class="boards">
    <List/>
    <List/>
    <List/>
    <List/>
    <List/>
    <List/>
    <List/>
    <AddListButton/>
  </div>
</template>

<script>
  import List from '../components/ui/List'
  import AddListButton from "../components/ui/AddListButton";

  export default {
    name: "Board",
    created(){

    },
    components: {
      List,
      AddListButton
    },
  }
</script>

<style scoped>
  .boards{
    display: flex;
    padding: 1rem 0.5rem;
    flex-wrap: nowrap;
    overflow: auto;
    align-items: flex-start;
    height: calc(100vh - 4rem);
  }
</style>