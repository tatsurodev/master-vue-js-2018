<template>
  <input v-model="todo" @keyup.enter="saveTodo()" type="text" placeholder="Todo item" />
</template>

<script>
export default {
  data: () => ({
    todo: ""
  }),
  methods: {
    saveTodo() {
      // 非同期処理のactionsをdispatchして、新規todoをtodosに追加
      this.$store.dispatch("addTodo", this.todo);
    }
  }
};
</script>
