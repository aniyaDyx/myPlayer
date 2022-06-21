<template>
  <div style="width: 800px; margin: 60px auto;">
    <h2 style="text-align: center;margin-bottom:20px;">歌曲发布</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="歌曲名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="歌曲作者">
        <el-input v-model="form.aname"></el-input>
      </el-form-item>
      <el-form-item label="歌手ID">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="专辑名">
        <el-input v-model="form.sname"></el-input>
      </el-form-item>
      <el-form-item label="地区">
        <el-select v-model="form.region" placeholder="请选择地区">
          <el-option label="内地" value="内地"></el-option>
          <el-option label="台湾" value="台湾"></el-option>
          <el-option label="欧美" value="欧美"></el-option>
          <el-option label="韩国" value="韩国"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col style="text-align: center;" :span="2">--</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="图片地址">
        <el-input v-model="form.picUrl"></el-input>
      </el-form-item>
      <el-form-item label="是否付费">
        <el-switch v-model="form.fee"></el-switch>
      </el-form-item>
      <el-form-item label="类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="流行" name="type"></el-checkbox>
          <el-checkbox label="摇滚" name="type"></el-checkbox>
          <el-checkbox label="70年代" name="type"></el-checkbox>
          <el-checkbox label="80年代" name="type"></el-checkbox>
          <el-checkbox label="90年代" name="type"></el-checkbox>
          <el-checkbox label="纯音乐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="时长">
        <el-input v-model="form.dt"></el-input>
      </el-form-item>
      <el-form-item label="歌曲品质">
        <el-radio-group v-model="form.resource">
          <el-radio label="标准"></el-radio>
          <el-radio label="无损音质"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="歌词文件">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="歌曲说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        aname: "",
        sname: "",
        picurl: "",
        dt: "",
        region: "",
        date1: "",
        date2: "",
        fee: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      // console.log("submit!");

      // 添加歌曲
      this.$axios({
        method: "GET",
        url: `/api/dd1`,
        params: {
          id: this.form.id,
          name: this.form.name,
          aname: this.form.aname, //[0].name+'/'+item.ar[1].name
          sid: 6666,
          sname: this.form.sname,
          picUrl: this.form.picUrl,
          dt: this.form.dt,
          fee: this.form.fee == true ? 1 : 0,
          mv: 0,

          arid: this.form.id,
          arname: this.form.aname,

          alid: this.form.id,
          alsname: this.form.sname,
          alpicurl: this.form.picurl
        }
      }).then(res => {
        // console.log(res.data.data);
      });
    }
  }
};
</script>


<style>

</style>

