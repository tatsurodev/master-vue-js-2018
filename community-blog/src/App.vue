<template>
  <div id="app">
    <Navbar/>
    <!-- routerで設定したcomponentがrouter-viewに表示 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
* {
  font-family: "Poppins";
  border-radius: 0px !important;
}
body {
  background-color: #f5f3ef;
}
</style>
