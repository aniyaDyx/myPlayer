<template>
  <div class="tablebox">
    <h2>歌曲列表:</h2>
    <el-table :data="tableData" style="width: 100%" height="100%">
      <el-table-column fixed prop="id" label="歌曲id" width="150"></el-table-column>
      <el-table-column prop="name" label="歌曲名" width="200"></el-table-column>
      <el-table-column prop="aname" label="歌手" width="120"></el-table-column>
      <el-table-column prop="sname" label="专辑" width="300"></el-table-column>
      <el-table-column prop="dt" label="时长(毫秒)" width="120"></el-table-column>
      <el-table-column prop="mv" label="MV" width="120"></el-table-column>
    </el-table>
    <div class="fybox">
      <el-pagination
        :page-size="10"
        :pager-count="11"
        :current-page.sync='num'
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange(num)"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        num: 1,
      total: 200,
      tableData: []
    };
  },
  created() {
    this.Songs();
  },
  methods: {
    Songs() {
      this.$axios({
        method: "GET",
        url: `/api/songss`,
        params: { num: this.num }
      }).then(res => {
        // console.log(res.data.data, 2222);
        if (res.data.code == 1) {
          this.bb = false;
        } else {
          this.tableData = res.data.data;
          this.total = res.data.data1[0].num
        //   console.log(this.total);
          //   console.log(this.tableData);
        }
      });
    },
    currentChange(v) {
    //   console.log(v);
      this.num = v;
      this.Songs();
    }
  }
};
</script>

<style lang="scss" scoped>
.tablebox {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translate(-50%, 0);
  height: 530px;
  //background-color: rgb(229, 140, 23);

  .fybox {
    //width: 10px;
    position: absolute;
    right: 0;
    margin: 20px auto;
    font-size: 20px;
  }
  h2 {
    margin-bottom: 20px;
  }
}
</style>