<template>
  <div class="login-panel">
    <h1 class="panel-title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span class="login-user"><user class="style-icon" /> 账号登录 </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="login-phone"
            ><iphone class="style-icon" /> 手机登录</span
          >
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>
<script lang="ts">
import { User, Iphone } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
    User,
    Iphone
  },
  setup() {
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const handleLoginClick = () => {
      accountRef.value?.loginAction(isKeepPassword.value)
    }

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef
    }
  }
})
</script>
<style lang="less" scoped>
.style-icon {
  width: 1em;
  height: 1em;
  margin-right: 5px;
}
.login-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .panel-title {
    text-align: center;
  }
  .login-user {
    .login-content();
  }
  .login-phone {
    .login-content();
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
