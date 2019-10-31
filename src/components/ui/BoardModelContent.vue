<template>
  <div>
    <div class="d-block">
      <label for="input-formatter">Board Name</label>
      <b-form-input
          id="input-formatter"
          v-model="name"
          placeholder="Enter name"
      ></b-form-input>
    </div>
    <div class="mt-3 d-flex justify-content-end">
      <b-button variant="secondary"  @click="$emit('hideModal')">Cancel</b-button>
      <b-button
          class="ml-2"
          variant="primary"
          @click="createBoard"
          :disabled="name.length === 0"
      >OK</b-button>
    </div>
  </div>
</template>

<script>
  import { BButton, BFormInput } from 'bootstrap-vue'

  export default {
    name: "BoardModelContent",
    components: { BButton, BFormInput },
    data() {
      return {
        name: ''
      }
    },
    methods: {
      createBoard() {
        this.$emit('createBoard', this.name)
        this.name = ''
      }
    },
  }
</script>

<style scoped>

</style>