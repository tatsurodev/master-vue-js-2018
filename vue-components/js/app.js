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
        <button @click="deleteArticle" class="btn btn-danger btn-sm">Delete Me</button>
    </div>
</div>
`,
    methods: {
        deleteArticle() {
            // custom eventを発火させ、親に伝える
            this.$emit('delete-article', this.title)
        }
    }
})

new Vue({
    el: '#app',
    data: {
        articles: [{
                title: 'Build fullstack applications with laravel and vuejs',
                content: 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making i over 2000',
            },
            {
                title: 'Where does it come from?',
                content: 'Sed ut bla bla bla...'
            },
            {
                title: '1914 translation by H.Rackham',
                content: 'But I msut explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give.'
            }
        ]
    },
    methods: {
        removeArticle(event) {
            console.log(event)
            this.articles = this.articles.filter(article => article.title !== event)
        }
    }
})
