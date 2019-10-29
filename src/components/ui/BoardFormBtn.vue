<template>
  <div class="mt-1">
    <b-button variant="success" @click="$emit('submit')" size="sm">{{ text }}</b-button>
    <font-awesome-icon class="ml-2 pt-1 cancel-btn" :icon="cancel" size="lg"
                       @click="$emit('closeform')"/>
  </div>
</template>

<script>
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  import { BButton } from 'bootstrap-vue'

  export default {
    name: "BoardFormBtn",
    components: {
      BButton
    },
    props: {
      text: {
        type: String,
        required: true
      },
    },
    computed: {
      cancel () {
        return faTimes
      }
    }
  }
</script>

<style scoped>
  .cancel-btn{
    cursor: pointer;
  }
</style>