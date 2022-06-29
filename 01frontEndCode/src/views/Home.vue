<template>
  <div class="box">
    <!-- 头部导航栏 -->
    <div class="bigbox" v-if="isShow===true">
      <div class="header">
        <HeaderNav />
      </div>
      <!-- 内容主体区域 -->
      <div class="main">
        <!-- 内容左侧 -->
        <div class="main-left">
          <MainCentent />
        </div>
        <!-- 内容右侧 -->
        <div class="main-right">
          <div class="right-view">
            <!-- <BtnNav></BtnNav> -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  <div class="musicLyrics" v-if="isShow===false">
    <Lyrics />
  </div>
    <!-- 底部播放区域 -->
    <div class="footer">
      <FooterMusic :isShow="isShow" @change="change"/>
    </div>
  </div>
</template>

<script>
import HeaderNav from "../components/headerNav/HeaderNav.vue";
import MainCentent from "../views/home/MainCentent.vue";
import FooterMusic from "../components/footer/FooterMusic.vue";
import Lyrics from "../views/lyrics/Lyrics.vue";
// import BtnNav from "../components/btnNav/BtnNav.vue"

export default {
  components: {
    HeaderNav,
    MainCentent,
    FooterMusic,
    Lyrics,
    // BtnNav
  },
  data(){
    return {
      isShow:true
    }
  },
  methods:{
   change(value){
     this.isShow=value;
   }
  }
};
</script>

<style>
.el-drawer.ltr, .el-drawer.rtl {
    height: 68% !important;
    top: 160px !important;
    bottom: 48px !important;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}
.header {
  position: absolute;
  height: 60px;
  width: 100%;
  top: 0;
}
.main {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 80px;
  height: auto;
  width: auto;
}
.main-left {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 100%;
  /* overflow-y: scroll; */
}
.main-right {
  position: absolute;
  left: 200px;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
}

.right-view {
  width: 90%;
  margin: 0 auto;
  max-width: 1200px;
}
@media screen and (max-width: 768px) {
  .left {
    left: -200px;
    z-index: 999;
    transition: all 0.4s;
  }

  .right {
    left: 0;
  }
  .footer {
    height: 51px;
  }
  .main {
    bottom: 51px;
  }
}
</style>