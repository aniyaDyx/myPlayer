<template>
  <div>
    <h2>全部MV</h2>
    <!-- <mvlunbo></mvlunbo> -->
    <div class="daohao">
      <div class="daohaobox">
        <!-- 分类切换 -->
        <div>
          地区：
          <ul v-for="(item, index) in area" :key='index'>
            <li @click="areachoose(item.areachoose)" :class="{ active: item.areachoose == areachooseed }">
              {{ item.areachoose }}
            </li>|
          </ul>

        </div>
        <div>
          类型： <ul v-for="(item, index) in type" :key='index'>
            <li @click="typechoose(item.typechoose)" :class="{ active: item.typechoose == typechooseed }">
              {{ item.typechoose }}
            </li>|
          </ul>
        </div>
        <div>
          排序： <ul v-for="(item, index) in order" :key='index'>
            <li @click="orderchoose(item.orderchoose)" :class="{ active: item.orderchoose == orderchooseed }">
              {{ item.orderchoose }}
            </li>|
          </ul>
        </div>
      </div>
    </div>
    <!-- mv容器 -->
    <div class="shipin">
      <div class="shipinbox">
        <div class="spbox" v-for="(item, index) in list" :key='index'>
          <div @click="toMV(item.id)">
            <svg class="icon" aria-hidden="true" id="xihuan">
              <use xlink:href="#icon-bofang"></use>
            </svg>

            <img :src="item.cover" alt="" />

            <div class="songname">{{ item.name }}</div>
            <div class="songperson">{{ item.artistName }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getListMv } from '../../request/api/request'
import axios from 'axios';
export default {
  data() {
    return {
      // active:'active',
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 12,
      // 偏移量
      offset: (this.page - 1) * this.limit,
      // 地区
      area: [
        { areaid: 0, areachoose: "全部" },
        { areaid: 1, areachoose: "内地" },
        { areaid: 2, areachoose: "港台" },
        { areaid: 3, areachoose: "欧美" },
        { areaid: 4, areachoose: "韩国" },
        { areaid: 4, areachoose: "日本" },
      ],
      areachooseed: '全部',
      // 类型
      type: [
        { typeid: 0, typechoose: "全部" },
        { typeid: 1, typechoose: "官方版" },
        { typeid: 2, typechoose: "原声" },
        { typeid: 3, typechoose: "现场版" },
        { typeid: 4, typechoose: "网易出品" },

      ],
      typechooseed: '全部',
      // 排序
      order: [
        { orderid: 0, orderchoose: "上升最快" },
        { orderid: 1, orderchoose: "最热" },
        { orderid: 2, orderchoose: "最新" },
      ],
      orderchooseed: '上升最快',
      // 查询的结果
      list: []
    }
  },
  watch: {


  },
  created() {
    // console.log("created");
    // 获取数据
    // this.getList()
  },
  methods: {

    async getList(area, type, order, limit) {


      console.log(" area, type, order, limit", area, type, order, limit);
      let res = await getListMv(area, type, order, limit);
      console.log("全部mv返回", res.data.data);
        console.log("全部mv返回id", res.data.data[0].id);
      this.list = res.data.data
    },

    // 获取数据
    // getList() {

    //   axios({
    //     url: "http://localhost:3000/mv/all",
    //     method: "get",

    //     params: {
    //       area: this.areachooseed,
    //       // 类型
    //       type: this.typechooseed,
    //       // 排序
    //       order: this.orderchooseed,
    //       //数量
    //       limit: this.limit,
    //       // 偏移量 分页（页码-1）*数码
    //       offset: (this.page - 1) * this.limit
    //     }

    //   }).then(res => {
    //     console.log("全部mv返回", res.data.data);
    //     this.list = res.data.data
    //   })
    // },

    // 去mv详情页
    toMV(id) {
       console.log("去mv详情页",id);
      this.$router.push('/mvdetail?mvid=' + id)
    },
    areachoose(choose) {
      console.log("areachoose", choose);
      this.areachooseed = choose
      console.log("this.areachooseed", this.areachooseed);
      console.log("areachooseed", this.areachooseed, this.typechooseed, this.orderchooseed, this.limit);
   this.getList(this.areachooseed, this.typechooseed, this.orderchooseed, this.limit)
 
    },
    typechoose(choose) {
      console.log("typechoose", choose);
      this.typechooseed = choose
      this.getList(this.areachooseed, this.typechooseed, this.orderchooseed, this.limit)
    },
    orderchoose(choose) {
      console.log("orderchoose", choose);
      this.orderchooseed = choose
       this.getList(this.areachooseed, this.typechooseed, this.orderchooseed, this.limit)
  }

  },

  components: {
    // mvlunbo
  },
  mounted() {

    this.getList(this.areachooseed, this.typechooseed, this.orderchooseed, this.limit)
  }


};
</script>
<style lang="scss" scoped>
h2 {
  font-weight: bolder;
  margin: 20px;
 
}
.daohao {
  margin: 10px;

  .daohaobox {
    div {
      display: flex;
      line-height: 40px;

      ul {
        display: flex;
        // background-color: antiquewhite;

        color: rgb(236, 236, 236);

        li {
          line-height: 20px;
          margin: 10px;
          width: 120px;
          height: 20px;
          border-radius: 10px;
          // background-color: aquamarine;
          text-align: center;
          color: rgb(92, 92, 92);
          //          background-color: rgb(254, 221, 221);
          // color: rgb(202, 0, 0);
        }

      }
    }

  }
}

.shipinbox {

  width: 1300px;
  //  height: 800px;
  // background-color: beige;
  display: flex;
  flex-flow: wrap;
}

.spbox {
  position: relative;
  // background-color: antiquewhite;
  width: 260px;
  height: 180px;
  margin: 20px;

  //   background-color: rgb(228, 228, 150);
  svg {
    position: absolute;
    left: 100px;
    top: 55px;
    display: none;
    width: 50px;
    height: 50px;
    fill: rgb(127, 127, 127);


  }

  img {
    width: 260px;
    height: 150px;
    border-radius: 20px;
  }
}

.shipinbox>div:hover {
  color: rgb(193, 1, 1);

  svg {
    display: block;
  }
}

.songname {
  line-height: 20px;
  font-size: 14px;
  // height:20px;
  width: 255px;
  overflow: hidden;
  text-overflow: ellipsis;
  // border: 1px solid black;
  /*弹性伸缩盒子模型显示*/
  display: -webkit-box;
  /*限制在一个块元素显示的文本的行数*/
  -webkit-line-clamp: 1;
  /*设置或检索伸缩盒对象的子元素的排列方式*/
  -webkit-box-orient: vertical;
}

.songperson {
  padding: 5px 0px;
  color: gray;
  font-size: 12px;
}

.active {
  background-color: rgb(255, 221, 221);
  font-weight: 700;
  color: rgb(219, 0, 0) !important;

}
</style>