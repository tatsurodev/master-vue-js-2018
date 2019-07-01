<template>
  <!-- params_nameはrouter.jsで設定したもの -->
  <h1 class="text-center">{{ $route.params.id }}</h1>
</template>
<script>
import Axios from "axios";
import config from "@/config";

export default {
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      // $routeにscript内でアクセスするにはthisが必要
      Axios.get(`${config.apiUrl}/article/${this.$route.params.id}`).then(
        response => {
          console.log(response);
        }
      );
    }
  }
};
</script>
