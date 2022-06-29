<template>
  <div class="box">
    <el-drawer size="25%" title="我是标题" :visible.sync="drawer" :with-header="false">
      <!-- <div class="tcc"> -->
      <h2 style="margin-top: 10px;margin-left:5px;font-weight:600">当前播放列表：</h2>
      <table class="layui-table" style="width: 100% !important">
        <colgroup>
          <col />
          <col />
          <!-- <col width="400" /> -->
        </colgroup>
        <thead>
          <!-- <tr>
            <th>歌曲标题</th>
            <th>歌手</th>
          </tr> -->
        </thead>
        <tbody>
          <tr v-for="(item, index) in playList" :key="index" @click="playMusicTc(index)">
            <td style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
              <span v-if="playListIndex === index">
                <svg style="margin-left:10px" class="icon list" id="bofangbtn" aria-hidden="true" @click="play"
                  v-if="isbtnShow">
                  <use xlink:href="#icon-bofang"></use>
                </svg>
                <svg style="margin-left:10px" class="icon list" aria-hidden="true" id="bofangbtn" @click="play" v-else>
                  <use xlink:href="#icon-zanting"></use>
                </svg>
              </span>
              <span style="margin-left: 20px;"> {{ playList[index].name }}</span>
              <svg class="icon" aria-hidden="true" style="margin-left: 5px" v-if="playList[index].fee === 1">
                <use xlink:href="#icon-vip-l"></use>
              </svg>
              <svg class="icon" aria-hidden="true" style="margin-left: 5px" v-if="playList[index].mv != 0"
                @click="toMV(playList[index].mv)">
                <use xlink:href="#icon-MV"></use>
              </svg>
            </td>
            <td class="bfperson" v-if="playList[index].ar !== undefined">
              {{ playList[index].ar[0].name }}
            </td>
            <td class="bfperson" v-else>
              {{ playList[index].artists[0].name }}
            </td>
          </tr>
        </tbody>
      </table>
      <table>


      </table>
      <!-- </div> -->
    </el-drawer>
    <div class="bofangbox">
      <div class="bfleft">
        <img :src="playList[playListIndex].al.picUrl" alt="" @click="changeLyr"
          v-if="playList[playListIndex].al !== undefined" />
        <img :src="`https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg`" alt="" @click="changeLyr"
          v-else />
        <span class="bfname"> {{ playList[playListIndex].name }}-</span>
        <span class="bfperson" v-if="playList[playListIndex].ar !== undefined">{{ playList[playListIndex].ar[0].name
        }}</span>
        <span class="bfperson" v-else>{{
            playList[playListIndex].artists[0].name
        }}</span>
      </div>
      <div class="bfcenter">
        <div class="bfcTop">
          <!-- <span>{{playList[playListIndex].id}}</span> -->
          <svg class="icon" aria-hidden="true" @click="loopMusic" v-if="loop === false">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="loopMusic" v-if="loop === true">
            <use xlink:href="#icon-single-loop"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="change(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg class="icon" id="bofangbtn" aria-hidden="true" @click="play" v-if="isbtnShow">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true" id="bofangbtn" @click="play" v-else>
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="change(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
          <!-- 收藏（喜欢） -->
          <svg class="icon" aria-hidden="true" @click="xihuan(playList[playListIndex].id)" id="xihuan"
            :style="{ 'fill': fills }">
            <use xlink:href="#icon-aixin"></use>
          </svg>

        </div>
        <div class="bfcBottom">
          <div class="bfbegin">{{ cuTime }}</div>
          <div class="jingdutiao">
            <input type="range" min="0" :max="duration" v-model="currentTime"
              :step="`400*${currentTime}/${duration}`" />
          </div>
          <div class="bfend">{{ allTime }}</div>
        </div>
      </div>
      <div class="bfright">
        <svg class="icon" aria-hidden="true" @click="isMuted" v-if="muted === false">
          <use xlink:href="#icon-shengyinkai"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="isMuted" v-if="muted === true">
          <use xlink:href="#icon-shengyinjingyin"></use>
        </svg>
        <div style="width: 150px">
          <el-slider v-model="volume"></el-slider>
        </div>
        <svg class="icon" aria-hidden="true" @click="drawer = true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>

  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { setXihuanList } from '../../request/api/user/user'
export default {
  name: "FooterMusic",
  props: ["isShow"],
  data() {
    return {
      // cuIndex: 0,
      isChange: true, //是否切换歌词界面
      loop: false, //是否循环播放歌曲
      interval: 0, //当前歌曲时间的定时器
      cuTime: "00:00", //歌曲当前播放时间
      allTime: "00:00",
      muted: false, //控制静音
      volume: 50, //音量
      drawer: false, //右侧抽屉

      PlayedList: [],
      repeat: false,
      isLogin: '',
      userid: '',
      fills: '',
      likes: ''
    };
  },
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "musictime",
      "isbtnShow",
      "currentTime",
      "duration",
      "likedListid"
    ]),
  },
  created() {
    // console.log("created");
    this.isLogin = sessionStorage.getItem("isLogin")
    // console.log("this.isLogin", this.isLogin);
    // console.log("userid", sessionStorage.getItem("userid"));

  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
    // console.log(this.$refs.audio.duration);
    // console.log(this.volume)
  },
  mounted() {
    this.updateTime();
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    console.log(444);
    console.log('999',this.$store.state.likedListid);
  },
  methods: {
    changeLyr() {
      //切换到歌词界面
      this.isChange = !this.isShow;
      this.$emit("change", this.isChange);
    },
    loopMusic() {
      //歌曲循环播放
      this.loop = !this.loop;
      if (this.loop === true) {
        this.$refs.audio.loop = true;
      }
    },
    isMuted() {
      //是否静音
      this.muted = !this.muted;
      if (this.muted === true) {
        this.$refs.audio.muted = true;
      } else {
        this.$refs.audio.muted = false;
      }
    },
    play() {
      //判断音乐播放/暂停
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateIsbtnShow(false);
        // this.updateTime(); //播放调用函数
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        // clearInterval(this.interval); //暂停清除定时器
      }
    },
    //上一首、下一首
    change(i) {
      console.log(2222233, this.playList);
      let index = this.playListIndex + i;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index === this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
      this.jugelike()
    },

    updateTime() {
      //更新播放时间
     
        this.interval = setInterval(() => {
        if(this.$refs.audio!==undefined){
        this.updateCurrentTime(this.$refs.audio.currentTime);
        }
      }, 1000);
      
      
    },
    addDuration() {
      //播放时长
      this.updateDuration(this.$refs.audio.duration);
    },
    changeVolume() {
      if (this.volume === 0) {
        this.$refs.audio.muted = true;
        this.muted = true;
      } else {
        this.$refs.audio.volume = this.volume / 100;
        this.$refs.audio.muted = false;
        this.muted = false;
      }
      // console.log(this.$refs.audio.muted);

    },
    playMusicTc(i) {//弹出层播放列表
      // console.log(555, this.timer);
      // this.playListIndex=i;
      console.log(i);
      this.updatePlayList(this.playList);
      this.updatePlayListIndex(i);
      // this.updateMusictime(this.mstime[i]);
    },
    toMV(id) {
      //  console.log("去mv详情页",id);
      this.$router.push('/mvdetail?mvid=' + id)

    },
    // 加入收藏（喜欢）
    async xihuan(id) {
      console.log("歌曲的id", id);
      if (this.isLogin == 0) {
        if (this.fills != 'red') {
          console.log("已登录，加入收藏");
          // console.log('login',sessionStorage.getItem("isLogin"));

          this.fills = 'red';
          this.likes = true;

          let res = await setXihuanList(id, this.likes);
          console.log("返回是否喜欢成功code为200，，", res.status);

        } else {
          console.log("已登录，取消收藏");
          this.fills = '';
          this.likes = false

          let res = await setXihuanList(id, this.likes);
          console.log("返回是否喜欢成功code为200，，", res.status);
        }

      } else {
        console.log("需要登录");
        this.login()
      }


    },
    login() {
      alert("需要登录")
    },
    // 判断是否收藏（喜欢）
jugelike(){
  //  this.jugeliked(this.playList);
// 将下一首置为空
          this.fills = '';
          this.likes = false
},
    ...mapMutations([
      "updateIsbtnShow",
      "updataDetailShow",
      "updatePlayListIndex",
      "updateCurrentTime",
      "updateDuration",
      "updatePlayList",
      "updatePlayListIndex",
    ]),
  },
  watch: {
    playListIndex() {
      this.updateIsbtnShow(false);
      this.$refs.audio.autoplay = true; //监听下标自动播放
      if (this.$refs.audio.paused) {
        //监听状态
        this.updateIsbtnShow(false);
      }
      // this.play()



      // 添加到最近播放列表
      this.PlayedList.push(this.playList[this.playListIndex])
      // 判断最近播放列表是否重复
      console.log("已经播放的列表", this.PlayedList);
      // this.PlayedList.forEach((value, index, array) => {
      //   console.log(value);
      //   if (value.id == this.playList[this.playListIndex].id) {
      //     array.splice(value, 1)
      //   }
      // })
      console.log(this.PlayedList);
      // 储存到local
      sessionStorage.setItem('PlayedList', JSON.stringify(this.PlayedList))
      console.log("pp-PlayedList", this.PlayedList);

    },
    playList() {
      //播放/暂停的控制
      if (this.isbtnShow) {
        this.updateIsbtnShow(false);
        this.$refs.audio.autoplay = true;
      }
    },
    currentTime(newV) {
      //底部播放栏当前播放时间的处理
      let time = parseInt(this.currentTime);
      let mm =
        parseInt(time / 60) < 10
          ? "0" + parseInt(time / 60)
          : parseInt(time / 60);
      let ss = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      this.cuTime = mm + ":" + ss;
      if (newV === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
    duration() {
      //监听播放时长
      // if(this.duration!==NaN){
      let time = parseInt(this.duration);
      if (time.toString() == "NaN") {
        this.allTime = "00:00";
        return;
      }
      // console.log("time:",time);
      let mm =
        parseInt(time / 60) < 10
          ? "0" + parseInt(time / 60)
          : parseInt(time / 60);
      let ss = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      this.allTime = mm + ":" + ss;
      // }
    },
    // 监听音量的改变
    volume() {
      this.changeVolume();
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  // position: fixed;
  // bottom: 0;
  // z-index: -1;
  height: 80px;
  width: 100%;
  // background-color: red;
}

.bofangbox {
  display: flex;
  height: 80px;
  padding: 0px 40px;
  border: 1px solid rgb(231, 231, 231);
  margin-bottom: 200px;
  justify-content: space-between;
  background-color: rgb(255, 255, 250);
}

.bfleft {
  display: flex;
  line-height: 80px;
  color: rgb(71, 71, 71);
  width: 400px;
}

.bfperson {
  font-size: 12px;
}

.bfleft img {
  // margin-bottom: 30px;
  margin: 15px;
  height: 50px;
  width: 50px;
  border-radius: 12%;
}

.bfcenter {
  width: 600px;
  /* background-color: aquamarine; */
  /* margin-bottom: ; */
  position: absolute;
  left: 480px;
}

.bfcTop {
  margin: 10px 120px;
}

.bfcTop svg {
  text-align: center;
  height: 20px;
  margin: 0px 20px;
  width: 20px;
}

#bofangbtn {
  height: 26px;
  width: 26px;
}

.bfcBottom {
  display: flex;
  margin: 10px 50px;
}

.jingdutiao {
  margin-top: 2px;

  input {
    margin: 5px 7px 0px;
    border: 2px solid rgb(239, 232, 232);
    width: 400px;
    height: 0px;
    // background: red;
  }
}

.bfright {
  display: flex;
  width: 400px;
  position: fixed;
  right: -30px;
}

.bfright svg {
  padding-top: 30px;
  text-align: center;
  height: 28px;
  margin: 0px 15px;
  width: 28px;
}

.bfright div {
  width: 170px;
  padding-top: 13px;
  margin-right: 40px;
}

table {
  // margin-top: 20px;
  // padding: 20px;
  height: auto;
  width: 100%;
  overflow: scroll;

}

tr {
  width: 100%;
  height: 35px;
  position: relative;

  .list {
    width: 18px !important;
    height: 18px !important;
    position: absolute;
    left: 0px;
    top: 8px;
  }

  .tu {
    // position: absolute;
    // left: 50px;
    // top: 8px;
    padding-left: 150px;
  }

  tr:nth-child(2n) {
    width: 100%;
    background-color: #fff;
  }

  tr:nth-child(2n + 1) {
    width: 100%;
    background-color: rgb(240, 241, 242);
  }

  .bfname {
    width: 70%;
    padding-left: 30px;
    // background-color: red;
  }

  // .icon {
  //   width: 18px;
  //   height: 18px;
  // }
  // td{
  //   // position: absolute;
  //   margin-left: 10px;
  // }
}

.xihuan {
  fill: red
}

.icon {
  width: 17px;
  height: 17px;
}
</style>