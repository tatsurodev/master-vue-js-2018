<template>
  <h1>The total number fo all todos is: {{ count }}</h1>
</template>
<script>
export default {
  computed: {
    count() {
      return this.$store.getters['todos/todosCount']
    }
  }
}
</script>
