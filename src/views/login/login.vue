<template>
   <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="login-from">
      <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
  <el-button type="primary" class="login-btn" @click="submitHandler">登录</el-button>
</el-form>
   </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async submitHandler () {
      const res = await this.$http.post('login', this.formdata)
      const { data, meta: { msg } } = res.data
      sessionStorage.setItem('token', data.token)
      this.$message.success(msg)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-from {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
}
.login-wrap .login-from .login-btn {
  width: 100%;
}
</style>
