<template>
  <b-card
      no-body
      class="px-2 py-2 mx-2 mb-2 card-custom"
      @mouseover="showEditBtn = true"
      @mouseleave="showEditBtn = false"
  >
    {{ data }}
    <span class="edit-icon action-icon" v-show="showEditBtn">
      <font-awesome-icon @click="openEditCard" :icon="edit" size="xs"/>
    </span>
    <span class="delete-icon action-icon" v-show="showEditBtn">
      <font-awesome-icon @click="$emit('deleteCard')" :icon="del" size="xs"/>
    </span>
  </b-card>
</template>

<script>
  import {faPenAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
  import { BCard } from 'bootstrap-vue'

  export default {
    name: "SingleCard",
    components: {
      BCard
    },
    props: {
      data: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        showEditBtn: false
      }
    },
    computed: {
      edit() {
        return faPenAlt
      },
      del() {
        return faTrashAlt
      }
    },
    methods: {
      openEditCard() {
        this.$store.commit('setActiveId', this.id)
      }
    },
  }
</script>

<style scoped>
  .card-custom{
    box-shadow: var(--board-card-shadow);
    font-size: 1rem;
  }

  .card-custom:hover {
    background: rgba(240,241,242,1.0);
  }

  .edit-icon {
    position: absolute;
    top: 7px;
    padding: 0 4px;
    right: 26px;
    border-radius: 2px;
  }

  .delete-icon {
    position: absolute;
    top: 7px;
    padding: 0 4px;
    right: 6px;
    border-radius: 2px;
  }

  .action-icon:hover {
    background: rgba(211, 215, 217, 0.7);
    cursor: pointer;
  }
</style>