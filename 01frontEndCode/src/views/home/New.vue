<template>
  <div class="nav">
    <!-- 切换按钮 -->
    <div class="btn-head">
      <button :class="[flag ? 'btnActive' : 'btnTop']" @click="newSwitch">
        新歌速递
      </button>
      <button :class="[flag ? 'btnTop' : 'btnActive']" @click="newDsic">
        新碟上架
      </button>
    </div>
    <!--新歌速递 -->
    <div class="home-page-view" v-show="isShow1">
      <div class="new-music-head"></div>
      <!-- 选项导航栏 -->
      <div class="new-music-view mtop-20">
        <div class="new-song">
          <div class="new-song-head">
            <div class="area-wrap" @click="change">
              <button
                class="no-btn mright-10 font-16"
                data-isWeight="0"
                :class="{ 'area-active': isWeight == 0 }"
              >
                全部
              </button>
              <button
                class="no-btn mright-10 font-16"
                data-isWeight="7"
                :class="{ 'area-active': isWeight == 7 }"
              >
                华语
              </button>
              <button
                class="no-btn mright-10 font-16"
                data-isWeight="96"
                :class="{ 'area-active': isWeight == 96 }"
              >
                欧美
              </button>
              <button
                class="no-btn mright-10 font-16"
                data-isWeight="8"
                :class="{ 'area-active': isWeight == 8 }"
              >
                日本
              </button>
              <button
                class="no-btn mright-10 font-16"
                data-isWeight="16"
                :class="{ 'area-active': isWeight == 16 }"
              >
                韩国
              </button>
            </div>
            <!-- 按钮 -->
            <div class="btn-wrap">
              <button class="btn btn-red">
                <span class="el-icon-caret-right"></span> <span class="btn-text">播放全部</span>
              </button>
              <button class="btn btn-white mleft-12">
                  <span class="el-icon-folder-add"></span> <span>收藏全部</span>
              </button>
            </div>
          </div>
          <!-- 歌曲 -->
          <div class="new-song-view">
            <ul class="info-list">
            <a href="#"> <li 
                class="info-item pointer"
                v-for="(item, index) in list"
                :key="index + 1"
                @click="playMusic(index)"
              >
                <div class="sub-index">{{ (index + 1) | listItemId }}</div>
                <img
                  lazy="loaded"
                  class="sub-img mleft-10"
                  :src="item.album.blurPicUrl"
                  alt=""
                />
                <div class="sub-title font-14 mleft-10">
                  {{ item.name }}
                </div>
                <div class="sub-item font-12">
                  <span style="color: rgb(103, 103, 103)">{{
                    item.artists[0].name
                  }}</span>
                </div>
                <div class="sub-item font-12">
                  <span style="color: rgb(103, 103, 103)">
                    {{ item.name }}</span
                  >
                </div>
                <div class="sub-item font-12">
                  {{ item.duration | getTime }}
                </div>
              </li></a>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 新碟上架 -->
    <div class="new-disc" v-show="isShow2">
      <ul>
        <li v-for="(title, index) in list2" :key="index + 1" class="new-li">
         <a href="#"><div class="div-img">
            <img :src="title.blurPicUrl" />
            <span class="el-icon-video-play play"></span>
          </div>
          </a>
          <div class="div-span">
            <div>{{ title.name }}</div>
            <div style="color: rgb(159, 159, 159)">{{ title.artist.name }}</div>
          </div>
        </li>
        <div class="div-new"><span>本 周 新 碟</span></div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getNewMusic, getNewDiscMusic } from "../../request/api/request";
import { mapMutations } from "vuex";
export default {
  name: "",
  data() {
    return {
      list: [],
      list2: [],
      isWeight: 0,
      flag: true,
      isShow1: true,
      isShow2: false,
    };
  },

  filters: {
    listItemId(v) {
      return v < 10 ? "0" + v : v;
    },
    // 毫秒数转换成分秒
    getTime(time) {
      let m = parseInt((time / 60 / 1000) % 60);
      m = m < 10 ? "0" + m : m;
      let s = parseInt((time / 1000) % 60);
      s = s < 10 ? "0" + s : s;
      // 作为返回值返回
      return `${m}:${s}`;
    },
  },

  created() {
    this.newMusic(0);
  },
  methods: {
    //点击字体加粗
    change(event) {
      const currer = this.isWeight;
      event.target.dataset.isweight
        ? (this.isWeight = event.target.dataset.isweight)
        : currer;
      this.newMusic(this.isWeight);
    },
    // 获取音乐选项
    newMusic(type) {
      getNewMusic(type)
        .then((res) => {
          this.list = res.data.data.slice(0, 10);
          // console.log('news',this.list);
          this.list = res.data.data.slice(0, 30);
        })
        .catch(() => {
          this.$message.error("亲,网络开小差了哦");
        });
    },
    // 点击切换音乐页面
    newDsic() {
      this.flag = false;
      this.isShow1 = false;
      this.isShow2 = true;
      this.newDiscMusic();
    },
    newSwitch() {
      this.flag = true;
      this.isShow1 = true;
      this.isShow2 = false;
    },
    //获取新碟上架
    async newDiscMusic() {
      let res = await getNewDiscMusic();
      this.list2 = res.data.monthData;
      console.log('this.list2',this.list2);
    },
    // 点击显示隐藏

    //播放音乐
    playMusic(i) {
      // console.log(555, this.timer);
      this.updatePlayList(this.list);
      this.updatePlayListIndex(i);
      // this.updateMusictime(this.mstime[i]);
    },
     ...mapMutations([
      "updatePlayList",
      "updatePlayListIndex",
    ]),
  },
};
</script>

<style lang="scss" scoped>
// 新歌速递顶层盒子
.nav {
  position: relative;
}
.home-page-view {
  .new-music-head {
    display: flex;
    justify-content: center;
  }

  //选项导航栏
  .mtop-20 {
    margin-top: 20px;

    .new-song {
      .area-active {
        font-weight: 700;
      }
      .no-btn {
        outline: 0;
        border: 0;
        color: #676767;
        background-color: #fff;
      }
      .mright-10 {
        margin-right: 10px;
      }
      .font-16 {
        font-size: 16px;
      }
      button {
        margin: 0;
      }
      .new-song-head {
        margin-top: 50px;
        width: 1111px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        .btn-wrap {
          display: flex;

          .btn-red {
            background-color: #ec4141;
            color: #fff;
          }
          .btn {
            border: none;
            height: 30px;
            padding: 4px 14px;
            border-radius: 15px;
            cursor: pointer;
          }
          .mleft-12 {
            margin-left: 12px;
          }
          .btn-white {
            border: 1px solid #d8d8d8;
            background-color: #fff;
            color: #373737;
          }
        }
        .area-wrap {
          button:hover {
            color: #373737;
          }
        }
      }
      .new-song-view {
        ul {
          list-style: none;
          display: block;
          margin-top: 20px;
          li:nth-child(even) {
            background-color: #ffffff;
          }
          li:hover {
            background-color: #f0f1f2;
          }
          .info-item {
            background-color: #f9f9f9;
            display: flex;
            height: 90px;
            align-items: center;

            .sub-index {
              width: 50px;
              text-align: center;
              color: #cfcfdf;
            }
            .sub-img {
              height: 60px;
              width: 60px;
              border-radius: 4px;
            }

            .sub-title {
              min-width: 100px;
              flex: 1;
            }
            .mleft-10 {
              margin-left: 10px;
            }
            .font-14 {
              font-size: 14px;
            }
            .sub-item {
              width: 150px;
              color: #c3c3c4;
              text-align: center;
            }
            .font-12 {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
// 切换按钮
.btn-head {
  position: absolute;
  left: 400px;
  width: 200px;
  height: 30px;
  border: 1px solid #bbb;
  border-radius: 16px;

  .btnActive {
    width: 100px;
    height: 30px;
    background-color: #bbb;
    color: #373737;
    border: 0;
    border-radius: 15px;
  }
  .btnTop {
    width: 100px;
    height: 30px;
    border: 0;
    border-radius: 15px;
    color: #373737;
    background-color: #fff;
  }
}
// 新碟上架顶层盒子
.new-disc {
  margin-left: -30px;
  width: 1200px;
  position: absolute;
  top: 60px;
  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    li {
      margin-left: 20px;
      margin-bottom: 60px;
      position: relative;
      .div-span {
        position: absolute;
        top: 210px;
      }
      .div-img {
        position: relative;
      }
      .div-img img {
        width: 210px;
        height: 210px;
        border-radius: 5px;
      }
      .play {
        position: absolute;
        top: 178px;
        left: 178px;
        font-size: 30px;
        color: aliceblue;
        display: none;
      }
    }

    .new-li:hover {
      transition: 0.3s;
      transform: scale(1.1);
    }


    .div-new {
      width: 30px;
      color: #2c3e50;
      font-size: 20px;
      position: absolute;
      top: -8px;
      left: -10px;
      span {
        writing-mode: tb-rl;
      }
    }
    .div-img:hover > .play {
      display: block;
    }
  }
}
</style>

