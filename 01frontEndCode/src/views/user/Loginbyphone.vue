<template>

  <div class="bbox">
    <div class="top">
      <div class="topp">
        登录
               <router-link to="/login" > <i class="el-icon-close" style="color:white"></i></router-link>
      </div>
    </div>
    <div class="mid">
        <img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9647707645/c8e7/4d8d/1895/6dff82b63181104bbac7cf3743c8b613.png" alt=""style="width:286px;" >
 
      <div id="form-container" style="margin:10px">
      <!-- <el-input placeholder="请输入手机号" v-model="phoneNumber" class="input-with-select">
        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
      </el-input> -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="login-ruleFrom" style="margin:0 15px">
        <el-form-item label="" prop="phoneNumber">
          <el-input v-model="ruleForm.phoneNumber" placeholder="请输入手机号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
          <el-button size="mini" class="getCodeButton" :disabled="attcode" v-if="showBtn" @click="getCode">获取验证码</el-button>
          <el-button class="getCodeButton" plain disabled v-else >{{codeMsg}}</el-button>
        </el-form-item>
        <el-form-item label="" prop="phoneCode">
          <el-input v-model="ruleForm.phoneCode" placeholder="请输入验证码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="type" style="margin-top:-10px">
          <el-switch v-model="ruleForm.autoLogin" active-text="自动登录" ></el-switch>
        </el-form-item>
        <el-form-item style="margin-bottom:-20px">
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;">登录</el-button>
        
        </el-form-item>
      </el-form>
    </div>
   
  </div>
  </div>
</template>

<script>
import axios from "axios";
import { byCode, sendCode,byCaptcha } from '@/api/LoginAndRegister/loginByPhone.js'
export default {
  data () {
    return {
      // 获取验证码按钮是否禁用
      attcode: true,
      // 获取验证码按钮是否展示
      showBtn: true,
      codeMsg: '获取验证码',
      // 倒计时
      codeSec: 60,
      ruleForm: {
        phoneNumber: '',
        phoneCode: '',
        autoLogin: false
      },
      rules: {
        phoneNumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请正确填写您的手机号码', trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^[0-9]{4}$/, message: '请填写有效的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 监听手机号 改变获取验证码按钮状态
    'ruleForm.phoneNumber': function (value) {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      const val = reg.test(value)
      if (val) {
        this.attcode = false
      } else {
        this.attcode = true
      }
    },
    'ruleForm.phoneCode': async function (code) {
      if (code.length === 4) {
        // 自动请求并且登录
        const { data: byCodeData } = await byCode(this.ruleForm.phoneNumber, this.ruleForm.phoneCode)
        // if (byCodeData.code === 200) {
        //   this.successLoginMsg()
        //      sessionStorage.setItem("isLogin", 0);
        //   this.$router.push("/");
        //   // 保存信息到 Vuex 跳转页面
        // }
      }
    }
  },
  methods: {
    // 错误提示信息
    errorMsg () {
      this.$message({
        showClose: true,
        message: '电话或验证码错误！',
        type: 'error'
      })
    },
    // 短信发送成功提示信息
    successSendMsg () {
      this.$message({
        showClose: true,
        message: '短信发送成功！',
        type: 'success'
      })
    },
    // 登录成功提示信息
    successLoginMsg () {
      this.$message({
        showClose: true,
        message: '登录成功！',
        type: 'success'
      })
    },
    // 提交登录表单
    async submitForm (formName) {
      console.log(this.ruleForm.phoneNumber, this.ruleForm.phoneCode, this.ruleForm.autoLogin)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送请求
          const byCodeData = await byCode(this.ruleForm.phoneNumber, this.ruleForm.phoneCode)
          if (byCodeData.data.code === 200) {
            const a=await byCaptcha(this.ruleForm.phoneNumber,this.ruleForm.phoneCode)
            sessionStorage.setItem("cookie",a.data.cookie)
            this.getStatus()
            this.successLoginMsg()
              sessionStorage.setItem("isLogin", 0);
              this.$router.push("/");
            
          } else {
            this.errorMsg()
          }
        } else {
          return false
        }
      })
    },
    // 发送验证码
    async getCode () {
      // 调用 sendCode 发送验证码
      const sendCodeData = await sendCode(this.ruleForm.phoneNumber)
      if (sendCodeData.code !== 200) this.successSendMsg()
      // 修改页面样式
      const timer = setInterval(() => {
        this.codeSec = this.codeSec - 1
        this.codeMsg = this.codeSec + 's后重试'
        this.showBtn = false
        if (this.codeSec === 0) {
          clearInterval(timer)
          this.codeSec = 60
          this.showBtn = true
        }
      }, 1000)
    },
     //获取登录之后的状态
    getStatus() {
      let getStatus = axios
        .get(
          `https://netease-cloud-music-api-beta-lyart.vercel.app/login/status?cookie=${sessionStorage.getItem(
            "cookie"
          )}`,
          {}
        )
        .then((res) => {

          ;
          sessionStorage.getItem("cookie");
          
          sessionStorage.setItem("isLogin", res.data.data.account.status);
          sessionStorage.setItem("userid", res.data.data.account.id);
          sessionStorage.setItem("avatarUrl", res.data.data.profile.avatarUrl);
          sessionStorage.setItem("nickname", res.data.data.profile.nickname);
          sessionStorage.setItem("signature", res.data.data.profile.signature);
          sessionStorage.setItem("gender", res.data.data.profile.gender);
          sessionStorage.setItem("shortUserName",res.data.data.profile.shortUserName);
          sessionStorage.setItem("birthday",res.data.data.profile.birthday);
          sessionStorage.setItem("province",res.data.data.profile.province);
          sessionStorage.setItem("city",res.data.data.profile.city);
          
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.bbox {
  margin: auto;
  position: relative;
  width: 700px;
  // height: 370px;
  background-color: #fff;
  border: #333 solid 1px;
}
.top {
  width: 700px;
  height: 50px;
  background-color: rgb(49, 35, 35);
  color: white;
}
.topp {
  font-weight: bold;
  margin-left: 18px;
  margin-right: 18px;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
}
.mid{
    margin-top: 8px;
    // margin-left: 52px;
   padding-left: 93px;
    padding-top: 21px;
    padding-bottom: 10px;
    margin: auto;
    width: 400px;
    display: flex;
    flex-wrap:wrap;
     align-items:center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);


}

.mima{
    margin-top: 20px;
}
.login{
    background-color: rgb(49, 125, 200);
    color: #fff;
   margin-top: 10px;}
   .mid img{
       margin-bottom:10px ;
   }
   .send{
    background-color: rgb(49, 125, 200);
    color: #fff;
   height: 29px;
    margin-top: 19px;

   }
   .huoqu{
   display: flex;
   justify-content: space-between;
   }

</style>