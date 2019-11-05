<template>
  <div class="loginC">
    <el-form
      class="myform"
      label-position="top"
      label-width="0px"
      :rules="loginRules"
      :model="formData"
      ref="loginForm"
    >
      <!-- logo组件 -->
      <div class="logo">
        <a href="https://github.com/mayizhong/vue/blob/master/README.md" target="_blank">
          <img src="@/assets/image/logo.png" alt />
        </a>
      </div>

      <el-form-item prop="username" style="margin-top:40px;">
        <el-input v-model="formData.username" placeholder="请输入用户名(admin)">
          <!-- 使用slot设置图标 -->
          <i slot="prefix" class="iconfont icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" placeholder="请输入密码(123456)">
          <i slot="prefix" class="iconfont icon-3702mima"></i>
        </el-input>
      </el-form-item>

      <el-form-item class="loginBtn">
        <el-button type="primary" @click.prevent="loginClick">登录</el-button>
        <el-button type="info" @click.prevent="resetClick">重置</el-button>
      </el-form-item>

      <div class="noti">
        <p>
          Vue学习实战项目,进展缓慢啊!!!
          Vue学习实战项目,进展缓慢啊!!!
          Vue学习实战项目,进展缓慢啊!!!
        </p>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      loginRules: {
        // 登录名校检,trigger触发方式:blur时区焦点,change文本改变
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度为3-10个字符', trigger: 'change' }
        ],
        // 登录密码的校验规则
        password: [
          {
            required: true,
            message: '请输入登录密码：123456',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    loginClick() {
      // 发起验证
      this.$refs.loginForm.validate(async vaild => {
        if (!vaild) return null
        // 发起登录的请求 { data: res} 去返回数据中的data 赋值给res
        const { data: res } = await this.$http.post('login', this.formData)
        if (parseInt(res.meta.status) !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          // login suc,save the user token
          localStorage.setItem('token', res.data.token)
          this.$message.success(res.meta.msg)
          this.$router.push({ name: 'home' })
        }
      })
    },
    resetClick() {
      // 操作表单DOM
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped lang="less">
.loginC {
  width: 100%;
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;

  .myform {
    width: 300px;
    padding: 30px;
    margin: 0px;
    background-color: white;
    border-radius: 5px;

    * {
      margin-top: 0px;
    }

    .logo {
      width: 100px;
      height: 100px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(-50% - 30px);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .loginBtn {
      display: flex;
      justify-content: space-between;
    }

    .noti {
      margin-top: 20px;
      width: 300px;
      text-align: center;

      p {
        color: orange;
      }
    }
  }
}
</style>
