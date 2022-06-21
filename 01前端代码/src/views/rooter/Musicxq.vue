<template>
  <div style="height:100%;margin-top: 60px;">
    <div v-if="isshow">
      <!-- 歌手盒子 -->
      <div class="gsbox" v-if="aa">
        <!-- 歌手图片 -->
        <div class="imgbox">
          <img :src="songslist.picUrl" @mouseenter="xiugai1=true" alt />
        </div>
        <div class="dd">
          <p>{{songslist.name}}</p>
          <p>地区： 内地</p>
          <p>作者id： {{songslist.id}}</p>
          <p>粉丝： {{songslist.albumSize + '' +songslist.musicSize}}万</p>
        </div>
        <div class="imgright">
          <img
            src="https://img0.baidu.com/it/u=1906399282,2371620146&fm=253&fmt=auto&app=138&f=JPG?w=323&h=300"
            alt
          />
        </div>
        <!-- 修改歌手 -->
        <div class="xiugai">
          <el-button type="info" size="mini" round @click="btngsUpdata">修改歌手</el-button>
        </div>
      </div>
      <!-- 修改歌手盒子弹框 -->
      <div class="xgbox" v-show="xggsbox">
        <h2>修改歌手</h2>
        <el-form :model="formgs" label-width="80px">
          <el-form-item label="歌手">
            <el-input v-model="formgs.name"></el-input>
          </el-form-item>
          <el-form-item label="歌手ID" >
            <el-input v-model="formgs.id" disabled></el-input>
          </el-form-item>
          <el-button style="margin: 0 0 20px 240px" @click="xggsbox = false">取消</el-button>
          <el-button type="primary" @click="yesgsEvent">确定</el-button>
        </el-form>
      </div>

      <!-- 歌曲盒子 -->
      <div class="gqbox">
        <h2>相关歌曲</h2>
        <div v-if="bb">
          <div class="gqbox1 gqbox11">
            <div class="box1">图片</div>
            <div class="box2">歌曲名</div>
            <div class="box3">歌手</div>
            <div class="box4">专辑名</div>
            <div class="box5">时长</div>
            <div class="box6">操作</div>
          </div>
          <div class="gqbox1" v-for="(gq,index) in gqlist" :key="gq.id">
            <div class="box1">
              <img :src="gq.picUrl" alt srcset />
            </div>
            <div class="box2">{{gq.name}}</div>
            <div class="box3">{{gq.aname}}</div>
            <div class="box4">{{gq.sname}}</div>
            <div
              class="box5"
            >{{parseInt(gq.dt/60000)<10 ? "0"+parseInt(gq.dt/60000):parseInt(gq.dt/60000)}}:{{parseInt(gq.dt%60)<10 ? '0' + parseInt(gq.dt%60) : parseInt(gq.dt%60)}}</div>

            <div class="box6">
              <el-button type="info" size="mini" round @click="btnUpdata(gq,index)">修改</el-button>

              <el-popconfirm title="你确定要删除这首歌？" @confirm="btnDel(gq.id,index)">
                <el-button slot="reference" size="mini" round type="danger">删除</el-button>
                <!-- <el-button slot="reference" type="danger" size="mini" round @click="btnDel(gqlist.id,index)">删除</el-button> -->
              </el-popconfirm>
            </div>
          </div>
        </div>
        <div v-else>
          <h2>暂时没有该歌手的相关歌曲</h2>
        </div>
      </div>

      <!-- 修改歌曲盒子 -->
      <div class="xgbox" v-show="gqboxshow">
        <h2>修改歌曲</h2>
        <el-form :model="form" label-width="80px">
          <el-form-item label="歌曲">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="歌手">
            <el-input v-model="form.aname"></el-input>
          </el-form-item>
          <el-form-item label="专辑名">
            <el-input v-model="form.sname"></el-input>
          </el-form-item>
          <el-form-item label="时长">
            <el-input v-model="form.dt"></el-input>
          </el-form-item>
          <el-button style="margin: 0 0 20px 240px" @click="gqboxshow = false">取消</el-button>
          <el-button type="primary" @click="yesEvent">确定</el-button>
        </el-form>
      </div>
    </div>
    <div v-else class="gsbox11">
      <div>哈哈!!! 啥也没有</div>
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F18b578d2340a7d7032d35469df001b501f23ff2dee3e-vnvXt4_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657282228&t=ca39318a5492edd7ea9246a25e36f20c"
        alt
      />
    </div>
  </div>
</template>

<script>
// import aa from "./aaa.js";
export default {
  data() {
    return {
      xggsbox: false,
      songslist: [],
      gqlist: [],
      isshow: true,
      aa: true,
      bb: true,
      sum: 0,
      gqboxshow: false,
      form: {
        index: 0,
        name: "",
        anane: "",
        sname: "",
        dt: ""
      },
      formgs: {
        id: "",
        name: ""
      }
    };
  },
  methods: {
    //点击修改按钮时赋值给from表单
    btnUpdata(m, i) {
      // console.log(m, i);
      this.gqboxshow = true;
      this.form = {
        index: i,
        id: m.id,
        name: m.name,
        aname: m.aname,
        sname: m.sname,
        dt: m.dt
      };
    },
    //更新歌手按钮
    btngsUpdata() {
      this.xggsbox = true;
      this.formgs = {
        id: this.songslist.id,
        name: this.songslist.name,
      };
    },
    //确认更新
    yesEvent(gq, i) {
      // console.log(this.form, i, gq);
      // console.log(this.form.id);
      this.gqboxshow = false;

      this.gqlist[this.form.index].name = this.form.name;
      this.gqlist[this.form.index].aname = this.form.aname;
      this.gqlist[this.form.index].sname = this.form.sname;
      this.gqlist[this.form.index].dt = this.form.dt;

      this.$axios({
        method: "GET",
        url: `/api/songs23`,
        params: {
          id: this.form.id,
          name: this.form.name,
          aname: this.form.aname,
          sname: this.form.sname,
          dt: this.form.dt
        }
      }).then(res => {
        // console.log(res.data.data, 2222);
        alert("更新成功");
      });
    },
    //更新歌手
    yesgsEvent() {
      // console.log(this.form, i, gq);
      // console.log(this.form.id);
      this.xggsbox = false;

      this.songslist.id = this.formgs.id;
      this.songslist.name = this.formgs.name;

      this.$axios({
        method: "GET",
        url: `/api/gsup`,
        params: {
          id: this.formgs.id,
          aname: this.formgs.name
        }
      }).then(res => {
        // console.log(res.data.data, 2222);
        alert("更新成功");
      });
    },

    //点击删除按钮删除歌曲
    btnDel(m, v) {
      console.log(m);
      this.gqlist.splice(v, 1);

      //删除歌曲
      this.$axios({
        method: "GET",
        url: `/api/delsongs`,
        params: { id: m }
      }).then(res => {
        // console.log(res.data.data, 1111);
      });
    }
  },
  created() {
    // console.log(this.$route.query.res);
    //判断页面是否有请求时显示为空
    if (this.$route.query.res == undefined) {
      this.isshow = false;
      // console.log(111);
    }
    //清水歌手
    this.$axios({
      method: "GET",
      url: `/api/artists`,
      params: { sname: this.$route.query.res }
    }).then(res => {
      // console.log(res.data.data, 1111);
      if (res.data.code == 1) {
        this.aa = false;
        this.sum += 1;
        // this.isshow = false
      } else {
        this.songslist = res.data.data[0];
      }
    });

    //请求歌曲
    this.$axios({
      method: "GET",
      url: `/api/songs`,
      params: { sname: this.$route.query.res }
    }).then(res => {
      // console.log(res.data.data, 2222);
      if (res.data.code == 1) {
        this.bb = false;
        this.sum += 1;
        // this.isshow = false
        // console.log(this.sum);
        if (this.sum == 2) {
          this.isshow = false;
        }
      } else {
        this.gqlist = res.data.data;
      }
    });
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.xiugai {
  position: absolute;
  left: 230px;
  bottom: 0;
  //height: 200px;
  //width: 200px;
  //background-color: rgb(251, 0, 0);
  //text-align: center;
  //line-height: 200px;
  border-radius: 50%;
}
.gsbox11 {
  text-align: center;
  //height: 200px;
  font-size: 40px;
  border-radius: 10px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);

  img {
    height: 200px;
  }
}
.gsbox {
  margin-top: 20px;
  height: 200px;
  background-color: rgb(245, 242, 238);
  display: flex;
  position: relative;
  font-size: 20px;
  border-radius: 10px;
  .imgbox {
    height: 100%;
    width: 200px;
    margin-right: 30px;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

  .imgright {
    height: 200px;
    position: absolute;
    right: 0;

    img {
      height: 180px;
      margin-right: 10px;
      margin-top: 10px;
    }
  }

  .dd {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  p {
    //margin-top: 10px;
    margin: -25px 0;
  }
}

.gqbox {
  height: 1000px;
  //background-color: aquamarine;

  .gqbox1 {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    //border: 1px solid red;
    margin: 10px 0;
    border-bottom: 1px solid #ccc;
    //background-color: rgba(244, 245, 245, 0.5);
    border-radius: 5px;
    .box1 {
      flex: 0.1;

      img {
        height: 40px;
        border-radius: 5px;
      }
    }
    .box2 {
      flex: 0.2;
    }
    .box3 {
      flex: 0.2;
    }
    .box4 {
      flex: 0.2;
    }
    .box5 {
      flex: 0.1;
    }
    .box6 {
      flex: 0.2;
    }
  }

  .gqbox11 {
    background-color: rgba(244, 245, 245, 0);
    border-radius: 0;
    border-bottom: 2px solid #ccc;
    margin-bottom: 5px;
  }

  h2 {
    margin-top: 30px;
  }
}

.xgbox {
  width: 400px;
  background-color: antiquewhite;
  margin: 0 auto;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  font-size: 20px;
  padding: 0 60px;
  h2 {
    padding: 21px;
    text-align: center;
  }
}
</style>
