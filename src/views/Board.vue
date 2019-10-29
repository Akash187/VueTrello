<template>
  <div>
    <Container @drop="onDrop" orientation="horizontal" class="boards">
      <Draggable v-for="list in orderedList" :key="list.id">
        <List :id="list.id" :title="list.title"/>
      </Draggable>
      <AddListButton/>
    </Container>
  </div>
</template>

<script>
  import List from '../components/ui/List'
  import AddListButton from "../components/ui/AddListButton";
  import { Container, Draggable } from "vue-smooth-dnd";

  export default {
    name: "Board",
    created(){
      this.$store.dispatch('fetchLists', this.$route.params.id)
      this.$store.dispatch('currentBoard', this.$route.params.id)
    },
    components: {
      List,
      AddListButton,
      Container,
      Draggable
    },
    computed: {
      orderedList: {
        get() {
          return this.$store.getters.orderedList;
        },
        set(value) {
          console.log(value);
        }
      }
    },
    methods: {
      onDrop (dropResult) {

        const { removedIndex, addedIndex, payload, element } = dropResult;

        if(removedIndex !== addedIndex){
          let originalArray = this.$store.state.board.lists;

          const movedItem = originalArray.find((item, index) => index === removedIndex);
          const remainingItems = originalArray.filter((item, index) => index !== removedIndex);

          const reorderedItems = [
            ...remainingItems.slice(0, addedIndex),
            movedItem,
            ...remainingItems.slice(addedIndex)
          ];

          this.$store.dispatch('updateBoard',{ boardId: this.$route.params.id, newLists: reorderedItems});
        }
      }
    }
  }
</script>

<style scoped>
  .boards{
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    align-items: flex-start;
    padding: 1rem 0.5rem;
    height: calc(100vh - 4rem);
  }
</style>