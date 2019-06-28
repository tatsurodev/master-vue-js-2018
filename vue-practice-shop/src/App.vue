<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <div class="row">
          <div :key="product.id" class="col-md-6" v-for="product in Products">
            <!-- custom eventをキャッチ -->
            <product
              :isInCart="isInCart(product)"
              @add-to-cart="addToCart(product)"
              :product="product"
            ></product>
          </div>
        </div>
      </div>
      <div class="col-md-5 my-5">
        <cart :items="cart"></cart>
      </div>
    </div>
  </div>
</template>

<script>
import Products from "@/products.json";
import Product from "@/components/Product.vue";
import Cart from "@/components/Cart.vue";

export default {
  name: "app",
  components: {
    Product,
    Cart
  },
  data() {
    return {
      Products,
      // カートに入れたproductを格納
      cart: []
    };
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
    // productがカートの中にあるかどうか
    isInCart(product) {
      const item = this.cart.find(item => {
        return item.id === product.id;
      });
      if (item) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
body {
  background-color: #fbf8f3;
}
</style>
