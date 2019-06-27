new Vue({
    el: '#app',
    data: {
        currencies: {}
    },
    mounted() {
        // 通貨リスト取得
        // https://free.currencyconverterapi.com/
        // api key 237d851531b84315a6ef
        axios.get('https://free.currconv.com/api/v7/currencies?apiKey=237d851531b84315a6ef').then(response => {
            this.currencies = response.data.results
        })
    }
})
