<template>
  <div class="card my-3">
    <div class="card-header font-weight-bolder">{{ article.title }}</div>
    <div class="card-body">
      <!-- article.contentはhtmlを含むのでv-html directiveを使う -->
      <div class="my-3" v-html="article.content.substring(0,200)"></div>
      <button class="btn btn-primary">Read more</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["article"]
};
</script>
