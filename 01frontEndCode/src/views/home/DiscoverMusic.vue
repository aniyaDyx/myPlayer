<template>
  <div v-if="true">
    <Banner></Banner>
    <div class="rmtj">
      <h4>热门推荐 ></h4>
      <div class="rmtjbigbox">
        <div class="rmtjbox" v-for="item in msg" :key="item.id">
          <router-link :to="{ path: '/Playlist', query: { id: item.id } }">
            <div class="imgg">
              <span>播放量 {{ item.playCount / 1000 }}万</span>
              <img :src="item.picUrl" alt="" />
            </div>
            <p>{{ item.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../../components/banner/Banner.vue";
import axios from "axios";
import { getMusicList } from "../../request/api/request";
export default {
  components: {
    Banner,
  },
  data() {
    return {
      msg: [],
    };
  },
  methods: {
    async getGeDan() {
      let res = await getMusicList();
      console.log(res);
      this.msg = res.data.result;
    },
  },
  created() {

    this.getGeDan();
  },
};
</script>
<style lang="scss" scoped>
.rmtjbigbox {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  font-size: 14px;
}

.rmtj {
  margin-top: 10px;
  width: 1100px;
  text-align: left;
}

.rmtjbox {
  width: 220px;
  margin-top: 10px;
  /* background-color: aquamarine; */
}

.rmtjbox:hover,
.rmtjbox img {
  transition: 0.3s;
  transform: scale(1.1);
}

.rmtjbox p {
  width: 175px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 5px;
}

.rmtj img {
  width: 180px;
  font-size: 0;
  border-radius: 10px;
  position: absolute;
}
.rmtj span {
  position: absolute;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
  z-index: 2;
}

.imgg {
  width: 180px;
  height: 180px;
  border: 1px solid rgb(164, 164, 164);
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 5px rgb(56, 56, 56);
  margin-top: 10px;
}
.imgg span {
  color: #fff;
}
</style>