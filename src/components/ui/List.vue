<template>
  <div class="list">
    <div class="title">
      <span>{{title}}</span>
      <font-awesome-icon
          class="ml-2 pt-1 cancel-icon"
          @click="showModal"
          :icon="cancel"
          size="lg"
      />
    </div>
    <Container
        group-name="col"
        @drop="(e) => onCardDrop(id, e)"
        class="cards"
        :get-child-payload="getCardPayload()"
    >
      <Draggable
          v-for="card in cards"
          :key="card.id"
      >
        <SingleCard
            v-if="activeId !== card.id"
            @deleteCard="deleteCard(card.id)"
            :id="card.id"
            :data="card.info"
        />
        <AddListCard
            v-else
            :value="card.info"
            @action="updateCard"
            @closeAddCard="closeAddEditCard"
            btn-text="Update Card"
        />
      </Draggable>
      <AddListCard
          v-if="activeId === id"
          @action="addCard"
          @closeAddCard="closeAddEditCard"
          btn-text="Add Card"
      />
    </Container>
    <div v-if="activeId !== id" class="add-list">
      <div @click="addNewCard">
        <font-awesome-icon :icon="plus"/> Add another list
      </div>
    </div>
    <!-- The modal -->
    <b-modal
        ref="my-modal"
        hide-header
        d="my-modal"
        @ok="deleteList"
    ><div class="text-danger">You are about to delete a List.</div>
    </b-modal>
  </div>
</template>

<script>
  import { faTimes, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
  import AddListCard from "./AddListCard"
  import SingleCard from "./SingleCard"
  import { Container, Draggable } from "vue-smooth-dnd"
  import { BModal } from 'bootstrap-vue'

  export default {
    name: "List",
    components: {SingleCard, AddListCard, Container, Draggable, BModal },
    props: {
      title: {
        type: String,
        required: true
      },
      cards: {
        type: Array,
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
      },
      activeId() {
        return this.$store.state.activeId
      }
    }, data() {
      return {

      }
    },
    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      addNewCard(){
        this.$store.commit('setActiveId', this.id);
      },
      closeAddEditCard(){
        this.$store.commit('setActiveId', '');
      },
      updateCard(data) {
        if(data.length > 0){
          let newCards = [];
          for(let card of this.cards) {
            if(card.id === this.activeId){
              card.info = data
            }
            newCards.push(card);
          }
          this.$store.dispatch('updateCard', {listId: this.id, cards: newCards});
          this.closeAddEditCard();
        }
      },
      addCard(data) {
        if(data.length > 0){
          this.$store.dispatch('addCard', {listId: this.activeId, data});
          this.closeAddEditCard();
        }
      },
      onCardDrop(columnId, dropResult){
        const { removedIndex, addedIndex, payload } = dropResult;

        let originalArray = JSON.parse(JSON.stringify(this.cards.slice()))

        if (removedIndex !== null && addedIndex !== null){
          console.log('same column')
          if(removedIndex !== addedIndex){

            const movedItem = originalArray.find((item, index) => index === removedIndex);
            const remainingItems = originalArray.filter((item, index) => index !== removedIndex);

            const reorderedItems = [
              ...remainingItems.slice(0, addedIndex),
              movedItem,
              ...remainingItems.slice(addedIndex)
            ];

            this.$store.dispatch('updateCard', {listId: this.id, cards: reorderedItems})
          }
        }else if (removedIndex !== null) {
          originalArray.splice(removedIndex, 1)
          this.$store.dispatch('updateCard', {
            listId: this.id,
            cards: originalArray
          })
        }else if (addedIndex !== null) {
          originalArray.splice(addedIndex, 0, payload)
          this.$store.dispatch('updateCard', {
            listId: this.id,
            cards: originalArray
          })
        }else{
          return ''
        }
      },
      getCardPayload () {
        return index => {
          return JSON.parse(JSON.stringify(this.cards[index]))
        }
      },
      deleteCard (id) {
        let tempCards = this.cards.filter(card => card.id !== id)
        this.$store.dispatch('updateCard', {
          listId: this.id,
          cards: tempCards
        })
      },
      deleteList () {
        this.$store.dispatch('deleteList', {listId: this.id, boardId: this.$route.params.id})
      }
    }
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
    overflow-y: auto;
  }

  .cancel-icon{
    cursor: pointer;
  }

  .ghost-drop{
    width: 100px;
  }
</style>