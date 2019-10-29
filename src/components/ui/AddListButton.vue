<template>
  <div class="add-list-container">
    <div v-if="!showForm" class="add-list">
      <div @click="showForm = !showForm">
        <font-awesome-icon :icon="plus"/> Add another list
      </div>
    </div>
    <div v-else class="form">
      <b-form-input v-model="title" placeholder="Enter a list title..."/>
      <BoardFormBtn text="Add List" @submit="addList" @closeform="showForm = !showForm"/>
    </div>
  </div>
</template>

<script>
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import { BFormInput } from 'bootstrap-vue'
  import BoardFormBtn from "./BoardFormBtn";

  export default {
    name: "AddListButton",
    components: {
      BFormInput,
      BoardFormBtn
    },
    computed: {
      plus () {
        return faPlus
      }
    },
    data() {
      return {
        showForm: false,
        title: ''
      }
    },
    methods: {
      addList() {
        if(this.title.length > 0){
          this.$store.dispatch('addList', { title : this.title, boardId: this.$route.params.id });
          this.title = '';
          this.showForm = false;
        }
      }
    },
  }
</script>

<style scoped>
  .add-list-container{
    min-width: var(--board-list-width);
    padding-right: 1rem;
  }

  .add-list{
    width: auto;
    color: white;
    min-height: 36px;
    padding: var(--padding-s);
    font-size: 1rem;
    border-radius: var(--board-list-border-radius);
    background: #26e0fa;
    cursor: pointer;
  }

  .add-list:hover {
    opacity: 0.75;
  }

  .form{
    width: auto;
    background: var(--board-list-bg-color);
    padding: var(--padding-vs);
    border-radius: var(--board-list-border-radius);
   }
</style>