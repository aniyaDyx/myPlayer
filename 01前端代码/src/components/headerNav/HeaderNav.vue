<template>
  <div class="header">
    <div style="display: flex">
      <div style="width: 165px">
        <div class="logoimg">
          <router-link to="/" > 
  
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wangyiyunyinle1"></use>
          </svg>
           </router-link>
          <span>myPlayer</span>
        </div>
      </div>
      <div class="landr">
        <div class="leftj">
          <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou1"></use>
          </svg>
        </div>
        <div class="rightj">
          <svg
            class="icon"
            aria-hidden="true"
            style="padding-left: 5px"
            @click="$router.go(1)"
          >
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
      <div class="inputbox" style="display: flex">
       <router-link :to="{ path: '/SearchM'}"><i class="el-icon-search" @click="search"></i></router-link>
        <input type="text" placeholder="搜索" v-model="key"/>
      </div>

     
  <!-- 头部用户登录 -->
  <div class="userimg" v-if="isLogin !=0">
            <router-link to="/Usernotlogoin" >
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-renbudaiwaiquan"></use>
             </svg>
            </router-link>
          </div> 
 <div class="userimg" v-else>
  <router-link to="/userinfo">
  <img :src="avatarUrl" alt="" class="userimgs">
              </router-link>
          </div>
<div class="dlzt"  v-if="isLogin !=0"> <router-link to="/login" > 
  {{ "未登录" }}  </router-link>
  </div> 
<div class="dlzt"  v-else>{{ nickname }}
</div> 

    </div>
  </div>
</template>
<script>
// import axios from "axios"
// import { getSearch } from "../../request/api/request"
export default {

  data(){
      return {
      key:'',
      isLogin: '',
      loginVisible: false,
      nickname: '',
      avatarUrl:''
      }
  },
mounted(){
    this.isLogin=sessionStorage.getItem("isLogin"),
    this.avatarUrl=sessionStorage.getItem("avatarUrl")
    this.nickname=sessionStorage.getItem("nickname")
  },
  methods:{
    search(){
      this.$store.commit('updateSearchKey',this.key);
      console.log('this.key',this.key);
    // async search(){
    //   let res = await getSearch(this.key)
    //   this.$store.commit('updateSearchKey',res.data.result.songs);
    // }
  //   async search(){
  //     let res = await getSearch(this.key)
  //     this.$store.commit('updateSearchKey',res.data.result.songs);
  //     // console.log(this.key,res.data.result.songs);
  //   }
  }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  background-color: #ec4141;
  position: relative;
  top: 0;
}

.logoimg {
  height: 40px;
  width: 40px;
  margin-left: 30px;
  background-color: #fff;
  border-radius: 50%;
  margin-top: 10px;
  // display: flex;
  /* background: url('./assets/logo.png') no-repeat;
  background-size: 100% 100%; */
  svg {
    margin-top: 7px;
    margin-left: 7px;
    width: 25px;
    height: 25px;
    fill: rgb(26, 25, 25);
    z-index: 1000;
  }
  span {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    position: relative;
    top: -25px;
    left: 49px;
  }
}
.el-icon-search {
  position: relative;
  top: 21px;
  left: 26px;
  color: #fff;
  font-size: 17px;
}
.landr {
  width: 72px;
  height: 26px;
  padding-top: 17px;
  margin-left: 100px;
  display: flex;
  justify-content: space-around;
}

.leftj,
.rightj {
  height: 26px;
  width: 26px;
  margin-right: 10px;
  border-radius: 50%;
  font-size: 28px;
  line-height: 26px;
  background-color: rgba(217, 59, 59);
  svg {
    width: 20px;
    height: 20px;
    fill: rgb(191, 179, 179);
  }
}

.inputbox {
  width: 200px;
  margin-left: 10px;
}

.inputbox input {
  height: 36px;
  width: 140px;
  padding: 0 30px;
  border: none;
  background-color: #45454594;
  border-radius: 18px;
  margin-top: 12px;
  color: rgb(209, 209, 209);
  font-size: 16px;
  outline: none;
}

.userimg {
  height: 34px;
  width: 34px;
  margin-left: 25px;
  margin-top: 13px;
  background-color: rgb(224, 224, 224);
  border-radius: 50%;
  svg {
    margin-top: 2px;
    margin-left: 5px;
    fill: #fff;
    width: 25px;
    height: 25px;
  }
}

.dlzt {
  display: inline-block;
  // width: 36px;
  height: 16px;
  line-height: 16px;
  margin-left: 10px;
  font-size: 12px;
  margin-top: 22px;
  color: #fff;
}
.userimgs {
  
   height: 34px;
  width: 34px;
  border-radius:50%

}
</style>