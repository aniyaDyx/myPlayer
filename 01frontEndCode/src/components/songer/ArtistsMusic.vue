<template>
  <div class="box" style="margin-left: 50px;margin-top:170px">
    <h2 style="margin-top: 20px">歌曲列表</h2>
    <div class="mbox">
      <table class="layui-table" style="width: 1200px !important">
        <colgroup>
          <col width="30" />
          <col  />
          <col width="60" />
          <col />
          <!-- <col width="400" /> -->
          <col width="300" />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>歌曲标题</th>
            <th>时长</th>
            <th>歌手</th>
            <th>专辑</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in musicList"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
               <svg
                class="icon"
                aria-hidden="true"
                style="margin-right: 5px"
                @click="playMusic(index)"
              >
                <use xlink:href="#icon-bofanganniu"></use>
              </svg>
              {{ item.name }}
              <svg
                class="icon"
                aria-hidden="true"
                style="margin-right: 5px"
                v-if="item.fee===1"
              >
                <use xlink:href="#icon-vip-l"></use>
              </svg>
              <svg
                class="icon"
                aria-hidden="true"
                style="margin-right: 5px"
                v-if="item.mv != 0"
                 @click="toMV(item.mv)"
              >
                <use xlink:href="#icon-MV"></use>
              </svg>
            </td>
            <td>{{ musicTime(item.dt) }}</td>
            <td>
              <span v-for="(ele, i) in item.ar" :key="i">
                <span v-if="i == 1">/</span>
                {{ ele.name }}
              </span>
            </td>
            <td>{{ item.al.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      mstime: [],
    };
  },
  computed: {
   
  },
  props: ["musicList"],
  mounted() {
    console.log("tttt",this.musicList);
  },
  methods: {
    musicTime(mt) {
      let allsecond = parseInt(mt / 1000); //歌曲总时长
      let mimute = parseInt(allsecond / 60); //歌曲的分钟数
      let second = allsecond % 60; //歌曲的秒数
      let timer;
      // console.log('hhhhh',second);updateMusictime
      if (second === 0) {
        second = "00";
      }else if(second < 10 && second > 0) {
        second = '0' + second
      }
      if (mimute < 10) {
        timer = "0" + mimute + ":" + second;
      } else {
        timer = mimute + ":" + second;
      }
      // this.mstime.push(timer);
      return timer;
    },
    playMusic(i) {
      // console.log(555, this.timer);
      this.updatePlayList(this.musicList);
      this.updatePlayListIndex(i);
      // this.updateMusictime(this.mstime[i]);
    },
      // 去mv详情页
    toMV(id){
      //  console.log("去mv详情页",id);
      this.$router.push('/mvdetail?mvid='+id)
 
    },
    ...mapMutations([
      "updatePlayList",
      "updatePlayListIndex",
      "updateMusictime",
      "updateMusictime",
    ]),
  },
  watch: {
    musictime() {
      // console.log(999999999999);
    },
  },
};
</script>

<style lang="scss" scoped>
.mbox{
  margin-top: 20px !important;
  height: 70vh !important;
  overflow: scroll;
  overflow-x: hidden;
}

.icon {
  width: 17px;
  height: 17px;
}
</style>