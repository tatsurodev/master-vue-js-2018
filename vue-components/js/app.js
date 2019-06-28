// componentの第二引数のobject内ではvue instanceで使えるオプションが使える
Vue.component('card', {
    // propertiesは配列で指定
    props: ['title', 'content'],
    // templateにはテンプレートリテラルの`を使うと複数行のヒアドキュメントが使える
    template: `
<div class="card">
    <div class="card-body">
        <h3 class="card-title">
            {{ title }}
        </h3>
        <div class="card-text">
            {{ content }}
        </div>
    </div>
</div>
`
})

new Vue({
    el: '#app',
})
