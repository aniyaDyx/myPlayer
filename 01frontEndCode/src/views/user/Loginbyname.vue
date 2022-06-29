<template>
  <div class="bbox">
    <div class="top">
      <div class="topp">
        登录
           <router-link to="/login" > <i class="el-icon-close" style="color:white"></i></router-link>
      </div>
    </div>
    <div class="mid">
        <img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9647707645/c8e7/4d8d/1895/6dff82b63181104bbac7cf3743c8b613.png" alt=""style="width:286px;" >
        <input type="text" placeholder="请输入昵称" v-model="username" clearable style="width:280px;height:25px" >
        <input type="text" placeholder="请输入密码" v-model="password" clearable style="width:280px;height:25px" class="mima">
         <el-button type="primary" style="width:288px" @click="login">登录</el-button>
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
    };
  },
  methods: {
    login() {
      if(this.username=='root'&&this.password=='root'){
        this.$router.push('/rooter')
        return
      }
      axios.post("http://127.0.0.1:7001/loginbyname", {
        withCredentials: true,
        username : this.username,
        password : this.password,
        })
        .then((res) => {
          if(res.data.code==0){
      sessionStorage.setItem('nickname', this.username);
      sessionStorage.setItem('avatarUrl', res.data.info.user_img);
      sessionStorage.setItem('shortUserName', res.data.info.phone);
      sessionStorage.setItem('signature', res.data.info.signature);
      sessionStorage.setItem('gender', res.data.info.gender);
if( sessionStorage.getItem("gender")==1){
       sessionStorage.setItem('gender', "男");
}else if(sessionStorage.getItem("gender")==2 ){
       sessionStorage.setItem('gender', "女");
}else{
       sessionStorage.setItem('gender', "保密");

}
 sessionStorage.setItem('isLogin', 0);
          this.$router.push("/");
          //  this.showUinfo()
          }else if(res.data.code==1) {
              alert(res.data.msg)
          }else{
             alert(res.data.msg)
          }
        });
       
    },
 
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