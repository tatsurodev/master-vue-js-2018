export default {
    // payloadは、commitから渡される引数
    // 新規にtodoをtodosに追加
    addTodo(state, payload) {
        // スプレッド演算子
        // a = [1, 2, 3];
        // console.log(...a)は、console.log(1, 2, 3)と同義
        // 配列todosにpayload(todo)を追加
        state.todos = [...state.todos, payload]
    },
    // todosに取得したdataを格納
    addTodos(state, payload = []) {
        state.todos = [
            ...state.todos,
            ...payload
        ]
    }
}
