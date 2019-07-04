import Axios from 'axios'

const url = "http://5cf93cf0e3c79f001439b58b.mockapi.io/todos"

export default {
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
