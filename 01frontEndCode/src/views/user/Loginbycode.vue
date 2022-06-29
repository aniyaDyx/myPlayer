<template>
  <div class="bbox">
    <div class="top">
      <div class="topp">
        登录
        <router-link to="/login"> <i class="el-icon-close" style="color:white"></i></router-link>
      </div>
    </div>
    <div class="mid">
      <div class="left">
        <img
          src="
         https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png"
          alt="">
      </div>
      <div class="right">
        <div class="rightt">扫码登陆</div>
        <img :src="qrimgs" alt="" style="width:200px;height:200px">
        <div class="rightb">使用&nbsp;<a href="https://music.163.com/#/download" style="color:skyblue">网易云app</a>
          扫码登录</div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
export default {
  props: {
    // 登录弹框是否存在
    loginVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      unikey: "", //key
      qrurl: "",
      qrimgs: "", //二维码图片
      qrCheckData: {}, //状态
      isLogin: false, //是否登录
      times: null
    };
  },
  mounted() {
    this.getKey();
  },
  methods: {
    //获取二维码的key值
    getKey() {
      let keyData = axios
        .get(
          "https://netease-cloud-music-api-beta-lyart.vercel.app/login/qr/key",
          {
            params: {
              timerstamp: new Date().getTime(),
            },
          }
        )
        .then((res) => {
          this.unikey = res.data.data.unikey;
          this.loginQqr(this.unikey);
        });
    },
    //通过key去获取二维码
    loginQqr(key) {
      let qrData = axios
        .get(
          "https://netease-cloud-music-api-beta-lyart.vercel.app/login/qr/create",
          {
            params: {
              timerstamp: new Date().getTime(), //传入参数时间戳
              qrimg: true,
              key: key,
            },
          }
        )
        .then((res) => {
          this.qrurl = res.data.data.qrurl;
          this.qrimgs = res.data.data.qrimg;
          this.qrCheck();
        });
    },
    //获取二维码的状态
    qrCheck() {
      this.times = setInterval(() => {
        let qrCheckData = axios
          .get(
            "https://netease-cloud-music-api-beta-lyart.vercel.app/login/qr/check",
            {
              params: {
                key: this.unikey,
                timerstamp: new Date().getTime(), //传入参数时间戳
                withCredentials: true,
              },
            }
          )
          .then((res) => {
            this.qrCheckData = res.data;
            this.isLogins(res)
          });
      }, 1000)
    },
    // 判断登录状态
    isLogins(res) {
      let code = this.qrCheckData.code;
      // 判断返回值中的code
      if (code === 801) {
      } else if (code === 802) {
      } else if (code === 803) {
        //  sessionStorage.setItem("user", true);
        sessionStorage.setItem("cookie", res.data.cookie);
        this.isLogin = true;
        this.$router.push("/");
        //用户登录成功后清除定时器
        clearInterval(this.times);
        //获取登录之后的uid和用户详情以及登录状态
        this.getStatus();
        // this.getUinfo()
      }
    },

    //获取登录之后的状态
    getStatus() {
      let getStatus = axios
        .get(
          `https://netease-cloud-music-api-beta-lyart.vercel.app/login/status?cookie=${sessionStorage.getItem(
            "cookie"
          )}`,
        )
        .then((res) => {

          ;
          sessionStorage.getItem("cookie");

          sessionStorage.setItem("isLogin", res.data.data.account.status);
          sessionStorage.setItem("userid", res.data.data.account.id);
          sessionStorage.setItem("avatarUrl", res.data.data.profile.avatarUrl);
          sessionStorage.setItem("nickname", res.data.data.profile.nickname);
          sessionStorage.setItem("signature", res.data.data.profile.signature);
          sessionStorage.setItem("gender", res.data.data.profile.gender);
          sessionStorage.setItem("shortUserName",res.data.data.profile.shortUserName);
          sessionStorage.setItem("birthday",res.data.data.profile.birthday);
          sessionStorage.setItem("province",res.data.data.profile.province);
          sessionStorage.setItem("city",res.data.data.profile.city);
          
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.bbox {
  margin: auto;
  position: relative;
  width: 530px;
  height: 350px;
  background-color: #fff;
  border: #333 solid 1px;
}

.top {
  width: 530px;
  height: 50px;
  background-color: rgb(49, 35, 35);
  color: white;
}

.topp {
  font-weight: bold;
  margin-left: 18px;
  margin-right: 18px;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
}

.mid {
  padding: 30px;
  display: flex;
}

.left img {
  width: 125px;
  height: 220px;
  margin-left: 20px;
}

.right {
  margin-left: 20px;
  display: flex;
  align-content: space-between;
  flex-direction: column;
}

.rightt {
  margin-left: 5px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  // width: 200px;
  // height: 24px;
  color: rgba(0, 0, 0, 0.4);
}

.rightb {
  margin-left: 15px;
}

.but {
  position: absolute;
  bottom: 0;
  margin-left: 10px;
}

.mid {
  margin-left: 50px;
}
</style>