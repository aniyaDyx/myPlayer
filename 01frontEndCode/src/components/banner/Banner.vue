<template>
  <div class="banner">
    <el-carousel :interval="5000" type="card" height="240px">
      <el-carousel-item v-for="(item, index) in imsrc" :key="index">
             <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import axios from "axios";
import { getBanner } from "../../request/api/request";
export default {
  components: {
  },
  data() {
    return {
      maginnum: 0,
      time: "",
      imsrc: [],
    };
  },
  methods: {
    async getImg() {
      let res = await getBanner();
      this.imsrc = res.data.banners;
      console.log("ss", res);
    },
  },
  created() {
    this.getImg();
  },
};
</script>
<style lang="scss" scoped>
.banner img {
  height: 240px;
  width: 100%;
  border-radius: 10px;
}

.banner {
  height: 260px;
  width: 1100px;
  position: relative;
  /* background-color: rgb(118, 118, 118); */
}
</style>