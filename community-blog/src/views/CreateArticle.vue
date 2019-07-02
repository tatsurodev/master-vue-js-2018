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
            <input type="text" placeholder="title" class="form-control mb-3" />
            <wysiwyg v-model="content" />
            <div class="text-center">
              <button @click="createArticle()" class="btn btn-success btn-lg mt-3">Create Article</button>
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

export default {
  mounted() {
    console.log(process.env);
  },
  components: {
    PictureInput
  },
  data() {
    return {
      content: "",
      image: null
    };
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {
      // FormDataはjsのbuilt-in object
      const form = new FormData();
      form.append("file", this.image);
      // process.env.環境変数名で.env.localで設定した変数を使用でき、.gitignoreにも記載されているのでsecure
      form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);
      // cloudinaryに画像アップロード
      Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form).then(res =>
        console.log(res)
      );
    }
  }
};
</script>
