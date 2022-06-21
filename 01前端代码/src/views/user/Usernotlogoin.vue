<template>
<div> 
<HeaderNav></HeaderNav>
<MainCentent></MainCentent>
  <div class="bbox" style="background-image: url('https://s2.music.126.net/style/web2/img/mymusic.png?1d2f344ce9c9b7ec2ea2bca6927b8fea');
  no-repeat 10000 10000px;width:807px;height:277px">
  </div>
  </div>
</template>

<script>
import HeaderNav from "../../components/headerNav/HeaderNav.vue";
import Banner from "../../components/banner/Banner.vue";
import MainCentent from "../../views/home/MainCentent.vue";
export default {
   components: {
    Banner,HeaderNav,MainCentent
  },
}
</script>
<style lang="scss" scoped>
.bbox{
  margin-top: 40px;
  margin-left: 400px;
  width: 100%;
  height: 1000px;
 box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//  margin:auto
}


</style>