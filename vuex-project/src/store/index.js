import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

// vuex登録
Vue.use(Vuex)

// actionの非同期処理で使用する
const url = "http://5cf93cf0e3c79f001439b58b.mockapi.io/todos"

const store = new Vuex.Store({
    state: {
        todos: []
    },
    // stateの値を変更する
    mutations: {
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
    },
    // stateの算出プロパティ
    getters: {
        todosCount(state) {
            return state.todos.length;
        }
    },
    // 非同期処理に使用。非同期でdata取得, mutationsをcommitしてstateを更新する。引数にはcontextを受け取る
    actions: {
        // CreateTodoのsaveTodo methodで実行。新しいtodoをapiでpostした後、state.todosに追加して表示を更新
        addTodo({
            state,
            commit
        }, payload) {
            Axios.post(url, {
                name: payload
            }).then(() => {
                commit('addTodo', payload)
            })
        },
        // root componentのmountedで実行
        getTodos({
            commit
        }) {
            Axios.get(url).then((response) => {
                // console.log(response.data)
                // (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                // 0: { id: "1", createdAt: "2019-06-06T16:22:52.088Z", name: "Taylor Gerlach Jr.", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/hafeeskhan/128.jpg" }
                // 1: { id: "2", createdAt: "2019-06-05T19:17:43.763Z", name: "Evan Dietrich", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/darylws/128.jpg" }
                // mapは、forEachの写像版。forEachは破壊的で返り値がないが、mapは写像でreturnしたものが返り値となる
                // todosの配列からtodo.nameのみの配列を抽出
                commit('addTodos', response.data.map(item => item.name))
            })
        }

    }
})

export default store
