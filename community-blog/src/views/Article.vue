<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <div class="card" v-if="!loading">
          <!-- params_nameはrouter.jsで設定したもの -->
          <img height="420px" :src="article.imageUrl" alt class="card-img-top">
          <div class="card-body">
            <h1 class="card-title text-center my-3">{{ article.title }}</h1>
            <div class="article-content" v-html="article.content"></div>
          </div>
        </div>
        <div class="loader" v-else>
          <i class="fas fa-spin fa-5x fa-spinner"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import config from "@/config";

export default {
  mounted() {
    this.getArticle();
  },
  data() {
    return {
      article: {},
      loading: true
    };
  },
  methods: {
    getArticle() {
      // $routeにscript内でアクセスするにはthisが必要
      Axios.get(`${config.apiUrl}/article/${this.$route.params.id}`).then(
        response => {
          // console.log(response);
          this.loading = false;
          this.article = response.data.data;
        }
      );
    }
  }
};
</script>
