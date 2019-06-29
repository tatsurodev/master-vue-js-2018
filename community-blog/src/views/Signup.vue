<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center my-5">Signup</h3>
          <div class="form-group">
            <input
              :class="{ 'is-invalid': errors.name, 'is-valid': !errors.name && this.submitted }"
              v-model="name"
              type="text"
              placeholder="Name"
              class="form-control"
            >
            <div class="errors" v-if="errors.name">
              <small class="text-danger" v-for="error in errors.name" :key="error">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <input
              :class="{ 'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted }"
              v-model="email"
              type="text"
              placeholder="Email"
              class="form-control"
            >
            <div class="errors" v-if="errors.email">
              <small class="text-danger" v-for="error in errors.email" :key="error">{{ error }}</small>
            </div>
          </div>
          <div class="form-group">
            <input
              :class="{ 'is-invalid': errors.password, 'is-valid': !errors.password && this.submitted }"
              v-model="password"
              type="password"
              placeholder="Password"
              class="form-control"
            >
            <div class="errors" v-if="errors.password">
              <small class="text-danger" v-for="error in errors.password" :key="error">{{ error }}</small>
            </div>
          </div>
          <div class="form-group text-center">
            <button @click="registerUser()" class="btn btn-success form-control">Signup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      // apiから返ってきたエラー内容格納
      errors: {},
      // !errors.name等だけだと最初のリロード時もis-validクラスが付与されてしまうので、signupボタンを押したかどうかのフラグも判定材料にする
      submitted: false
    };
  },
  methods: {
    registerUser() {
      console.log(this.name, this.email, this.password);

      Axios.post("https://react-blog-api.bahdcasts.com/api/auth/register", {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(response => {
          // signup, loginの流れ: apiで返ってきたauth dataをjsonでlocalStorageに保存→vue instanceのlocalStorageからauth dataをparseしてobjectでdataに保存→vue instanceにauth dataが復元できたので各page, componentでもauth dataを利用できる
          // response.data.dataにapiから登録成功時のdataが入っている
          // console.log(response);
          const { data } = response.data;
          // ローカルにauth dataをJSONで保存
          localStorage.setItem("auth", JSON.stringify(data));
          // this.$root.data_nameでvue instanceのdataにアクセス
          this.$root.auth = data;
          // Signupボタンを押したよフラグ
          this.submitted = true;
          // redirect
          this.$router.push("home");
        })
        // errorの中身であるresponseを分割代入、
        .catch(({ response }) => {
          console.log(response);
          this.errors = response.data;
          this.submitted = true;
        });
    }
  }
};
</script>
