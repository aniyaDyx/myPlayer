<template>
  <div class="bbox">
    <div class="top">
      <div class="topp">
        注册
           <router-link to="/login" > <i class="el-icon-close" style="color:white"></i></router-link>
      </div>
    </div>
    <div class="mid">
        <img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9647707645/c8e7/4d8d/1895/6dff82b63181104bbac7cf3743c8b613.png" alt=""style="width:286px;" >
        <input type="text" placeholder="请输入用户名" v-model="username" clearable style="width:280px;height:25px" >
        <input type="text" placeholder="请设置登录密码" v-model="password" clearable style="width:280px;height:25px" class="mima">
        <input type="text" placeholder="请确认密码" v-model="repassword" clearable style="width:280px;height:25px" class="mima">
        <input type="text" placeholder="请绑定手机号" v-model="tel" clearable style="width:280px;height:25px" class="mima">
           <div>
                     <span class="gx">
                    <input type="checkbox" class="checkbox" title="" lay-skin="primary" style="margin-top: px;">
                    <a style="height: 18px;padding-top: 0px;">
                        同意
                        <a href="http://st.music.163.com/official-terms/service">《服务条款》</a>
                         & <a href="http://st.music.163.com/official-terms/privacy">《隐私政策》</a> 
                         & <a href="https://st.music.163.com/official-terms/children">《儿童隐私政策》</a>
                    </a>
                </span>
                </div>
         <el-button type="primary" style="width:288px" @click="register">注册</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      tel:"",
      repassword:""
    };
  },
  methods: {
   register() {
    var tel =this.tel
    var reg = /^1[3|4|5|7|8|9]\d{9}$/;
    if(!(/^1[3|4|5|7|8|9]\d{9}$/.test(this.tel))){
        var layer = layui.layer;
        layer.msg("手机号码错误！");
    }else if (this.password != this.repassword) {
        var layer = layui.layer;
        layer.msg("两次设置的密码不一致");
       this.password= ''
        this.repassword = ''
    } else if (document.querySelector(".checkbox").checked == false) {
        var layer = layui.layer;
        layer.msg("请勾选隐私政策");
    } else if (
        this.password == this.repassword
        && document.querySelector(".checkbox").checked == true
    ) {
        axios.post("http://127.0.0.1:7001/register", {
            telNumber:this.tel,
            username: this.username,
            password: this.password
        }, {
            withCredentials: true
        }).then(res => {
            if (res.data.code == 0) {
                alert("注册成功，请登录")
                 this.$router.push("/");
               
            } else {
                alert("注册失败，该用户已存在，请登录")
                
            }

        })
    }
}
  },
};
</script>

<style lang="scss" scoped>
.bbox {
  margin: auto;
  position: relative;
  width: 700px;
  // height: 370px;
  background-color: #fff;
  border: #333 solid 1px;
}
.top {
  width: 700px;
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
.mid{
    margin-top: 8px;
    // margin-left: 52px;
   padding-left: 93px;
    padding-top: 21px;
    padding-bottom: 10px;
    margin: auto;
    width: 400px;
    display: flex;
    flex-wrap:wrap;
     align-items:center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);


}

.mima{
    margin-top: 20px;
}
.mid button{
    background-color: rgb(49, 125, 200);
    color: #fff;
   margin-top: 10px;}
   .mid img{
       margin-bottom:10px ;
   }

</style>