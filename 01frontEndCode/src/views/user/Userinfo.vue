<template>
  <div>
    <HeaderNav></HeaderNav>
    <MainCentent></MainCentent>
    <div class="bbox">
      <div class="set">
        <h1>个人设置</h1>
        <div class="daohang"></div>
        <div class="biaodan">
          <el-form
            ref="form"
            :model="form"
            label-width="-3px"
            style="margine-top: 10px"
          >
            <el-form-item label=" 昵称：">
              <el-input v-model="form.name" style="width: 260px"></el-input>
            </el-form-item>
            <el-form-item label=" 手机：">
              <el-input
                v-model="form.shortUserName"
                style="width: 260px"
              ></el-input>
            </el-form-item>

            <el-form-item label="介绍：">
              <el-input
                type="textarea"
                v-model="form.signature"
                style="width: 260px"
              ></el-input>
            </el-form-item>

            <el-form-item label="性别：">
              <el-radio-group v-model="form.gender">
                <el-radio label="0">保密</el-radio>
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="block" style="margin-bottom: 10px">
              <span class="demonstration">生日：</span>
              <el-date-picker
                v-model="birthday"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="timestamp"
              >
              </el-date-picker>
            </div>
            <div style="margin-bottom: 10px">
              <span>地址：</span>
              <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
              >
              </el-cascader>
            </div>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="out">退出</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="touxiang">
          <el-upload
            ref="upload"
            :multiple="false"
            :auto-upload="false"
            :on-change="changePic"
            :http-request="submitUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            action=""
          >
            <!-- eslint-disable -->
            <img
              v-if="imageUrl && !newImageUrl"
              :src="imageUrl"
              class="avatar"
            />
            <img v-if="newImageUrl" :src="newImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { updataUserInfo } from "../../request/api/request";
import HeaderNav from "../../components/headerNav/HeaderNav.vue";
import Banner from "../../components/banner/Banner.vue";
import MainCentent from "../../views/home/MainCentent.vue";
import { provinceAndCityDataPlus } from "element-china-area-data";

export default {
  components: {
    Banner,
    HeaderNav,
    MainCentent,
  },
  data() {
    return {
      form: {
        name: "",
        type: [],
        gender: "",
        signature: "",
        imageUrl: "",
        shortUserName: "",
      },
      newImageUrl: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      birthday: "",
      options: provinceAndCityDataPlus,
      selectedOptions: [],
      width:0,
      height:0
    };
  },
  created() {
    this.imageUrl = sessionStorage.getItem("avatarUrl");
    this.form.name = sessionStorage.getItem("nickname");
    this.form.shortUserName = sessionStorage.getItem("shortUserName");
    this.form.signature = sessionStorage.getItem("signature");
    this.form.gender = sessionStorage.getItem("gender");
    this.birthday = sessionStorage.getItem("birthday");

    this.selectedOptions = [
      sessionStorage.getItem("province"),
      sessionStorage.getItem("city"),
    ];
    this.getStatus();
  },
  methods: {
      getImgSize(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function (theFile) {
            let image = new Image()
            image.src = theFile.target.result
            image.onload = function () {
              resolve({
                width: this.width,
                height: this.height,
              })
            }
          }
        })
      },
     async beforeAvatarUpload(file) {
     const a=await this.getImgSize(file)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        console.log(1111111111);
        console.log(file);
        console.log(a);
        this.width=a.width
        this.height =a.height


        return isJPG && isLt2M;
        
      },
    out() {
      // 清空token
      window.sessionStorage.clear();
      // 跳转到登录页
      this.$router.push("/");
    },
    //获取登录之后的状态
    getStatus() {
      let getStatus = axios
        .get(
          `https://netease-cloud-music-api-beta-lyart.vercel.app/login/status?cookie=${sessionStorage.getItem(
            "cookie"
          )}&time=${new Date().getTime()}`,
          {}
        )
        .then((res) => {
          sessionStorage.getItem("cookie");
          this.form.name = res.data.data.profile.nickname;
          this.form.signature = res.data.data.profile.signature;
          this.form.gender = String(res.data.data.profile.gender);
          sessionStorage.setItem("isLogin", res.data.data.account.status);
          sessionStorage.setItem("userid", res.data.data.account.id);
          sessionStorage.setItem("avatarUrl", res.data.data.profile.avatarUrl);
          this.newImageUrl = this.form.imageUrl =
            res.data.data.profile.avatarUrl;
          sessionStorage.setItem("nickname", res.data.data.profile.nickname);
          sessionStorage.setItem("signature", res.data.data.profile.signature);
          sessionStorage.setItem("gender", res.data.data.profile.gender);
          sessionStorage.setItem(
            "shortUserName",
            res.data.data.profile.shortUserName
          );
          sessionStorage.setItem("birthday", res.data.data.profile.birthday);
          sessionStorage.setItem("city", res.data.data.profile.city);
          sessionStorage.setItem("province", res.data.data.profile.province);
        });
    },
    async updataUserInfo(ele1, ele2, ele3, ele4, ele5) {
      let res = await updataUserInfo(ele1, ele2, ele3, ele4, ele5);
    },
    async submitAddForm() {
      await this.$refs.upload.submit();
    },
    onSubmit() {
      this.updataUserInfo(
        this.form.gender,
        this.form.signature,
        this.form.name,
        this.birthday,
        this.selectedOptions
        // sessionStorage.getItem("province"),
        // sessionStorage.getItem("city")
      );
      sessionStorage.setItem("nickname", this.form.name);
      sessionStorage.setItem("gender", this.form.gender);
      sessionStorage.setItem("signature", this.form.signature);
      sessionStorage.setItem("birthday", this.birthday);
      sessionStorage.setItem("province", this.selectedOptions[0]);
      sessionStorage.setItem("city", this.selectedOptions[1]);
    },

    handleAvatarSuccess() {
      console.log("success");
    },
    async submitUpload(content) {
      const formData = new FormData();
      formData.append("imgFile", content.file);
      const cookie = sessionStorage.getItem("cookie");
      const res = await axios({
        method: "post",
        url: `https://netease-cloud-music-api-beta-lyart.vercel.app/avatar/upload?cookie=${cookie}&timestamp=${Date.now()}&imgSize=${this.width}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      this.newImageUrl = res.data.data.url;
      sessionStorage.setItem("avatarUrl", res.data.data.url);
    },
    changePic() {
      console.log("pic change");
      this.submitAddForm();
    },
    handleChange() {
      var location = "";
      // for (let i = 0; i < this.selectedOptions.length; i++) {
      //     location+= CodeToText[this.selectedOptions[i]];
      // }
      console.log(location); //打印区域码所对应的属性值即中文地址
    },
   
  },
   
    
};
</script>

<style lang="scss" scoped>
.bbox {
  margin-top: 0;
  margin-left: 400px;
  width: 60%;
  height: 1000px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  //  margin:auto
}
.set {
  margin-left: 70px;
  // margin-top: 60px;
  padding-top: 50px;
  // display: flex;
  // justify-content: space-between;
}
.daohang {
  width: 782px;
  height: 39px;
  border: 1px solid #ccc;
  border-width: 1px;
  background-color: rgb(247, 247, 247);
  margin-top: 10px;
}
.biaodan {
  margin-top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.touxiang {
  position: absolute;

  top: 210px;
  right: 436px;
  border: 1px solid black;
  width: 100px;
  height: 100px;
}
.births {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}
.births span {
  height: 50px;
  line-height: 50px;
}
</style>
