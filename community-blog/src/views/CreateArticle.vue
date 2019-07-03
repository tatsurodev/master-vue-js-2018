<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card my-5">
          <div class="card-body">
            <picture-input
              accept="image/jpeg, image/png"
              size="5"
              button-class="btn btn-danger"
              @change="onChange"
            />
            <select class="form-control my-3" v-model="category">
              <option selected>Select a Category</option>
              <option
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
              >{{ category.name }}</option>
            </select>
            <input type="text" placeholder="Title" class="form-control my-3" v-model="title" />
            <wysiwyg v-model="content" />
            <div class="text-center">
              <button
                :disabled="loading"
                @click="createArticle()"
                class="btn btn-success btn-lg mt-3"
              >
                <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                {{ loading ? '' : 'Create Article' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PictureInput from "vue-picture-input";
import Axios from "axios";
import config from "@/config";

export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("auth")) {
      next({ path: "/login" });
    }
    next();
  },
  mounted() {
    this.getCategories();
  },
  components: {
    PictureInput
  },
  data() {
    return {
      title: "",
      content: "",
      image: null,
      // 取得したcategoryを配列で格納
      categories: [],
      // selectで選択したcategoryとv-model
      category: "",
      loading: false
    };
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {
      if (!this.title || !this.image || !this.category || !this.content) {
        this.$noty.error("Please fill in all fields.");
        return;
      }
      this.loading = true;
      // FormDataはjsのbuilt-in object
      const form = new FormData();
      form.append("file", this.image);
      // process.env.環境変数名で.env.localで設定した変数を使用でき、.gitignoreにも記載されているのでsecure
      form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);
      // cloudinaryに画像アップロード
      Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
        .then(res =>
          // postの第一引数path, 第二引数data, 第三引数config option
          Axios.post(
            `${config.apiUrl}/articles`,
            {
              title: this.title,
              content: this.content,
              category_id: this.category,
              imageUrl: res.data.secure_url
            },
            {
              headers: {
                Authorization: `Bearer ${this.$root.auth.token}`
              }
            }
          )
            .then(() => {
              this.loading = false;
              this.$noty.success("Article created successfully.");
              this.$router.push("/");
            })
            .catch(() => {
              this.loading = false;
              this.$noty.error("Ooops ! something went wrong.");
            })
        )
        .catch(() => {
          this.loading = false;
          this.$noty.error("Ooops ! something went wrong.");
        });
    },
    // categories自体何度も変わるものでないのでlocalStorageにキャッシュし、キャッシュがあればそのcategoriesをjsonからobjectにparse, なければapiからobjectを取得し、jsonにstringifyしてlocalStorageに保存
    getCategories() {
      const categories = localStorage.getItem("categories");
      if (categories) {
        this.categories = JSON.parse(categories);
        return;
      }
      Axios.get(`${config.apiUrl}/categories`).then(res => {
        this.categories = res.data.categories;
        // categoriesはpromiseなのでaxios.getの外に書くとまだ取得できていない時に実行されてしまうので注意
        localStorage.setItem("categories", JSON.stringify(this.categories));
      });
    }
  }
};
</script>
