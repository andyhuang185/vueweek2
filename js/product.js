import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = ({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'andy22',
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    checkAdmin() {
        //檢查是否登入成功
      const url = `${this.url}/api/user/check`;
      axios.post(url)
        .then((res) => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message)
          //cookie不存在會轉址，轉回登入頁面
          window.location = 'index.html';
        })
    },
    getData() {
        //取得產品
      const url = `${this.url}/api/${this.path}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)andyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    console.log(token);
    this.checkAdmin()
  }
})

Vue.createApp(app).mount("#app");