<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item" v-for="item in items" :key="item.id">
        {{ item.title }} - $ {{ item.price }}
        <button
          @click="$emit('remove-from-cart', item)"
          class="btn badge badge-danger float-right"
        >Remove from cart</button>
      </li>
    </ul>
    <div class="card p-3 my-5">
      <h4 class="text-center">${{ total }}</h4>
    </div>
    <!-- カートの中身ゼロの場合disabledに -->
    <!-- clickで親コンポーネントのcartの中身をクリアに -->
    <button
      :disabled="items.length === 0"
      @click="$emit('pay')"
      class="btn btn-info form-control"
    >Pay Now</button>
  </div>
</template>

<script>
export default {
  props: ["items"],
  computed: {
    total() {
      // reduce(累積値, currentValue, currentIndex, array) { return 処理 }でreturnした値が累積値となる
      return this.items.reduce((acc, item) => acc + Number(item.price), 0);
    }
  }
};
</script>
