<template>
  <div id="app">
    <input v-model="todo" @keyup.enter="saveTodo()" type="text" placeholder="Todo item" />
    <ul>
      <li v-for="(todoitem, index) in todos" :key="index">{{ todoitem }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    todo: "",
    todos: []
  }),
  methods: {
    saveTodo() {
      // スプレッド演算子
      // a = [1, 2, 3];
      // console.log(...a)は、console.log(1, 2, 3)と同義
      // 配列todosにtodoを追加
      this.todos = [...this.todos, this.todo];
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  border: 2px solid black;
  padding: 20px;
  font-size: 22px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 26px;
}
</style>
