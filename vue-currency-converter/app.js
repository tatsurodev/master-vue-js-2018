new Vue({
    el: '#app',
    data: {
        currencies: {}
    },
    mounted() {
        this.getCurrencires()
    },
    methods: {
        // 通貨リスト取得
        // https://free.currencyconverterapi.com/
        // api key 237d851531b84315a6ef
        getCurrencires() {
            // apiのリクエストを抑えるために、頻繁に変わらない通貨リストをlocalStorageにキャッシュする
            // WebStorage API(LocalStorage)をチェックしてcurrenciesの値を格納
            const currencies = localStorage.getItem('currencies')
            // currenciesがあれば
            if (currencies) {
                // JSON.parseでjsonをオブジェクトにデコード
                this.currencies = JSON.parse(currencies)
                return
            }
            // currenciesがなければ通貨リスト取得
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=237d851531b84315a6ef').then(response => {
                this.currencies = response.data.results
                // JSON.stringifyでオブジェクトをjsonにエンコードしてlocalStorageに格納
                // JSON.stringifyは、JSON.parseの逆
                localStorage.setItem('currencies', JSON.stringify(response.data.results))
            })
        }
    }
})
