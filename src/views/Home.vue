<template>
  <div class="container mb-3">
    <div class="board-header">
      <font-awesome-icon :icon="user" size="lg"/>
      <div class="board-title">Personal Boards</div>
    </div>
    <div class="boards">
      <router-link :to="`/board/${board.id}`" class="board" v-for="board in boards" :key="board.id">
        <p>{{ board.name }}</p>
      </router-link>
      <div class="add-board"  @click="showModal">+</div>
    </div>
    <b-modal
        ref="my-modal"
        hide-footer
        hide-header
        no-close-on-backdrop
        title="Using Component Methods"
    >
      <BoardModelContent name="name" @hideModal="hideModal" @createBoard="createBoard"/>
    </b-modal>
  </div>
</template>

<script>
  import { faUser } from '@fortawesome/free-solid-svg-icons'
  import { BModal } from 'bootstrap-vue'
  import BoardModelContent from "../components/ui/BoardModelContent";

  export default {
    name: 'Home',
    components: { BModal, BoardModelContent },
    created() {
      this.$store.dispatch('checkIsAuthenticated')
        .then(() => this.$store.dispatch('fetchBoards'))
        .catch(err => console.log(err))
    },
    beforeDestroy() {
      this.$store.state.boardsListener()
    },
    computed: {
      user() {
        return faUser;
      },
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      createBoard(name) {
        if(name.length > 0){
          this.$store.dispatch('createBoard', name)
            .then()
            .catch(err => console.log(err))
        }
        this.hideModal();
      }
    }
  }
</script>

<style scoped>

  .board-header{
    margin-top: 40px;
    display: flex;
    align-items: baseline;
  }

  .board-title{
    margin-left: 0.5rem;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .boards{
    display: grid;
    grid-gap: 20px 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .board{
    min-height: 96px;
    background: #26e0fa;
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
    color: white;
    font-weight: 700;
    cursor: pointer;
  }

  .board:hover {
    text-decoration: none;
  }

  .board p{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .add-board{
    min-height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    background: aliceblue;
    border-radius: 5px;
    cursor: pointer;
  }

  @media screen and (max-width: 450px) {
    .board-header {
      margin-top: 20px;
    }
  }
</style>
