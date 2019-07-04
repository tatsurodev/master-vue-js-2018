import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
    state: {
        todos: []
    },
    // stateの値を変更する
    mutations,
    // stateの算出プロパティ
    getters,
    // 非同期処理に使用。非同期でdata取得, mutationsをcommitしてstateを更新する。引数にはcontextを受け取る
    actions

}
