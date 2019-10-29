<template>
  <div class="list">
    <div class="title">
      <span>{{title}}</span>
      <font-awesome-icon class="ml-2 pt-1 cancel-icon" :icon="cancel" size="lg"/>
    </div>
    <div class="cards">
      <div
          v-for="card in cards"
          :key="card.order"
      >
        <SingleCard :id="card.order" :data="card.name"/>
<!--        <AddListCard :value="card.name" @closeAddCard="editing = false"/>-->
      </div>
      <AddListCard v-if="showForm" @closeAddCard="showForm = !showForm"/>
    </div>
    <div v-if="!showForm" class="add-list">
      <div @click="showForm = !showForm">
        <font-awesome-icon :icon="plus"/> Add another list
      </div>
    </div>
  </div>
</template>

<script>
  import { faTimes, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
  import AddListCard from "./AddListCard";
  import SingleCard from "./SingleCard";

  export default {
    name: "List",
    components: {SingleCard, AddListCard },
    props: {
      title: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      cancel() {
        return faTimes
      },
      plus () {
        return faPlus
      },
      edit () {
        return faEdit
      }
    }, data() {
      return {
        showForm: false,
        cards: [
          {
            "name": "vue.draggable",
            "order": '1',
            "fixed": false
          },
          {
            "name": "draggable",
            "order": '2',
            "fixed": false
          },
          {
            "name": "for",
            "order": '4',
            "fixed": false
          },
          {
            "name": "on",
            "order": '7',
            "fixed": false
          },
          {
            "name": "vue.js 2.0",
            "order": '5',
            "fixed": false
          },
          {
            "name": "based",
            "order": '6',
            "fixed": false
          },
          {
            "name": "component",
            "order": '3',
            "fixed": false
          },
          {
            "name": "Sortablejs",
            "order": '8',
            "fixed": false
          }
        ]
      }
    },
  }
</script>

<style scoped>
  .list{
    min-width: var(--board-list-width);
    background: var(--board-list-bg-color);
    margin-right: 1rem;
    border-radius: var(--board-list-border-radius);
    display: flex;
    flex-direction: column;
    max-height: -webkit-fill-available;
  }

  .add-list{
    width: var(--board-list-width);
    min-height: 36px;
    padding: var(--padding-s);
    font-size: 1rem;
    cursor: pointer;
    color: #b5b5b5;
  }

  .add-list:hover {
    background: #c4c4c4;
    color: grey;
    border-bottom-left-radius: var(--board-list-border-radius);
    border-bottom-right-radius: var(--board-list-border-radius);
  }

  .title{
    padding: 8px 12px;
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  .cards{
    overflow: scroll;
  }

  .cancel-icon{
    cursor: pointer;
  }
</style>