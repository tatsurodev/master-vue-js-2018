new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: null,
        // defaultの通貨セットを用意
        from: 'EUR',
        to: 'USD',
        result: 0,
    },
    mounted() {
        this.getCurrencires()
    },
    computed: {
        // 通貨リストをv-for用にオブジェクトから配列にする
        formattedCurrencies() {
            // Object.valuesでオブジェクトの値を配列にして返す
            return Object.values(this.currencies)
        },
        // convert結果を表示
        calculateResult() {
            // inputから取得できるdataは文字列なので型変換して計算
            return (Number(this.amount) * this.result).toFixed(3);
        }
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
        },
        convertCurrency() {
            const key = `${this.from}_${this.to}`
            axios.get(`https://free.currconv.com/api/v7/convert?q=${key}&apiKey=237d851531b84315a6ef`).then(response => {
                console.log(response.data)
                this.result = response.data.results[key].val
            })

        }
    }
})
