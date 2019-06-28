// componentの第二引数のobject内ではvue instanceで使えるオプションが使える
Vue.component('card', {
    // templateにはテンプレートリテラルの`を使うと複数行のヒアドキュメントが使える
    template: `
<div class="card">
    <div class="card-body">
        <h3 class="card-title">
            Vuejs fundamentals
        </h3>
        <div class="card-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae amet consequatur suscipit, exercitationem quisquam sequi quo facilis molestiae repudiandae sed ea rerum accusantium rem ipsum iure natus consectetur, ipsa itaque!</div>
    </div>
</div>
`
})

new Vue({
    el: '#app',
})
