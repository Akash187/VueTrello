<template>
  <div>
    <div class="mx-2 mb-1 form">
      <b-form-textarea
          v-model="info"
          rows="3"
          max-rows="8"
          placeholder="Enter card detail..."
          :autofocus="true"
      />
      <BoardFormBtn :text='btnText' @submit="submit"
                    @closeform="$emit('closeAddCard')"/>
    </div>
  </div>
</template>

<script>
  import { faPlus } from '@fortawesome/free-solid-svg-icons'
  import { BFormTextarea } from 'bootstrap-vue'
  import BoardFormBtn from "./BoardFormBtn";

  export default {
    name: "AddListButton",
    components: {
      BFormTextarea,
      BoardFormBtn
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      btnText: {
        type: String,
        required: true
      }
    },
    computed: {
      plus () {
        return faPlus
      }
    },
    data() {
      return {
        info: this.value || ''
      }
    },
    methods: {
      submit() {
        this.$emit('action', this.info);
        this.info = '';
      }
    }
  }
</script>

<style scoped>
  .form{
    width: auto;
    background: var(--board-list-bg-color);
    border-bottom-left-radius: var(--board-list-border-radius);
    border-bottom-right-radius: var(--board-list-border-radius);
  }
</style>