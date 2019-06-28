<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <div class="row">
          <div :key="product.id" class="col-md-6" v-for="product in Products">
            <product :product="product"></product>
          </div>
        </div>
      </div>
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script>
import Products from "@/products.json";
import Product from "@/components/Product.vue";

export default {
  name: "app",
  components: {
    Product
  },
  data() {
    return {
      Products
    };
  }
};
</script>

<style>
body {
  background-color: #fbf8f3;
}
</style>
