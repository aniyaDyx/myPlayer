<template>
    <div class="rmtj">
      <h2>热门推荐：</h2>
      <div class="rmtjbigbox">
        <div class="rmtjbox" v-for="(item,index ) in artists" :key="index">
          <router-link :to="{ path: '/Songer', query: { name: item.name } }">
            <div class="imgg" @click="transform(index)">
              <!-- <span>播放量 {{ item.playCount / 1000 }}万</span> -->
              <img :src="item.picUrl" alt="" />
            </div>
            <p>{{ item.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
// import bus from '../../utils/bus'
import {mapMutations} from "vuex"
import { getArtist } from "../../request/api/request";
export default {
  components: {
  },
  data() {
    return {
      artists: [],
    };
  },
  methods: {
    async getGeShou() {
      // let res = await getArtist();
      // console.log("88888",res);
      // this.artists = res.data.artists;
      axios.get("http://127.0.0.1:7001/ar", {
        params: {
        }
    }).then(res => {
        console.log('res',res);
        this.artists = res.data.data;
    })
    },
    transform(i){
        // bus.$emit('capture', this.artists[i]);
        // this.updateArtists(this.artists[i]);
        this.$store.commit('updateArtists',this.artists[i])
    },
    
    ...mapMutations["updateArtists"]
  },
  created() {
    this.getGeShou();
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
  height: 180px;
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