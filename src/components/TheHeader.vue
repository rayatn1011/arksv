<script setup>
import { useStore } from 'vuex'
const store = useStore()
const navLinks = ref([
  {
    value: '/',
    label: '首頁',
  },
  {
    value: '/server-rules',
    label: '伺服器規則',
  },
  {
    value: '/market',
    label: '交易市集',
  },
])
const authDialog = ref(false)
const activeName = ref('login')
const registerSuccess = ref(false)

// 清空登入小視窗並關閉
const closeAuthDialog = () => {
  loginFormData.userId = ''
  loginFormData.password = ''
  registerFormData.userId = ''
  registerFormData.password = ''
  registerFormData.passwordConfirm = ''
  registerFormData.userName = ''
  registerFormData.disocrdName = ''
  registerFormData.email = ''
  authDialog.value = false
  activeName.value = 'login'
}
// 登入
const loginFormData = reactive({
  userId: '',
  password: '',
})
const userLogin = () => {
  if (!(loginFormData.userId && loginFormData.password)) {
    ElMessage({
      message: '請輸入帳號和密碼',
      type: 'warning',
      center: true,
    })
    return
  }
  const login = store.dispatch('login', loginFormData)
  login.then((response) => {
    if (response) {
      store.dispatch('getUserInfo')
      closeAuthDialog()
    } else if (response === false) {
      ElMessage({
        message: '帳號密碼錯誤',
        type: 'error',
        center: true,
      })
    } else {
      ElMessage({
        message: '帳號不存在',
        type: 'error',
        center: true,
      })
    }
  })
}

// 註冊
const registerFormData = reactive({
  userId: '',
  password: '',
  passwordConfirm: '',
  userName: '',
  disocrdName: '',
  email: '',
})
const userRegister = () => {
  const clearRegisterFormData = () => {
    registerFormData.userId = ''
    registerFormData.password = ''
    registerFormData.passwordConfirm = ''
    registerFormData.userName = ''
    registerFormData.disocrdName = ''
    registerFormData.email = ''
  }
  if (
    !(
      registerFormData.userId &&
      registerFormData.password &&
      registerFormData.passwordConfirm &&
      registerFormData.userName &&
      registerFormData.disocrdName &&
      registerFormData.email
    )
  ) {
    ElMessage({
      message: '欄位未填寫完成',
      type: 'warning',
      center: true,
    })
    return
  } else if (registerFormData.password !== registerFormData.passwordConfirm) {
    ElMessage({
      message: '密碼與重複密碼不一致',
      type: 'warning',
      center: true,
    })
    return
  }
  const register = store.dispatch('registerUser', registerFormData)
  register.then((response) => {
    if (response) {
      registerSuccess.value = true
      clearRegisterFormData()
    } else if (response === false) {
      ElMessage({
        message: '註冊失敗',
        type: 'error',
        center: true,
      })
      clearRegisterFormData()
    } else if (response === 0) {
      ElMessage({
        message: '帳戶已存在',
        type: 'error',
        center: true,
      })
    }
  })
}
// 登出
const userLogout = () => {
  store.dispatch('logout')
}
// 前往登入
const gotoLogin = () => {
  registerSuccess.value = false
  activeName.value = 'login'
}
// 取得登入狀態及使用者資訊
const isLogin = computed(() => store.state.auth.isLogin)
const userInfo = computed(() => store.state.auth.userInfo)
</script>

<template>
  <header
    class="flex items-center justify-between bg-[rgb(255,255,255,0.95)] p-4 shadow-md lg:px-8"
  >
    <router-link to="/" alt="Home">
      <img src="../assets/image/logo.png" alt="logo" class="w-32" />
    </router-link>
    <div class="flex items-center gap-6">
      <nav>
        <ul class="flex gap-6 text-xl font-bold">
          <li v-for="item in navLinks" :key="item.value">
            <router-link
              :to="item.value"
              :alt="item.label"
              class="under-line relative transition hover:text-brand"
              >{{ item.label }}</router-link
            >
          </li>
        </ul>
      </nav>
      <el-button
        v-if="!isLogin"
        size="large"
        plain
        round
        class="text-xl font-bold"
        @click="authDialog = true"
        >登入</el-button
      >
      <el-dropdown v-else trigger="click">
        <el-button size="large" plain round class="text-xl font-bold">帳戶</el-button>
        <template #dropdown>
          <div class="flex w-40 flex-col pt-4 text-center">
            <div class="px-4 text-lg text-brand">{{ userInfo.name }}</div>
            <el-divider class="my-4" />
            <div class="px-4">櫻花幣</div>
            <div class="px-4 text-2xl font-bold text-brand">
              {{ userInfo.money }}
            </div>
            <el-divider class="mt-4 mb-0" />
            <el-button
              class="border-transparent px-4 py-2 text-sm hover:border-transparent"
              @click="userLogout"
              >登出</el-button
            >
          </div>
        </template>
      </el-dropdown>
    </div>

    <el-dialog v-if="!isLogin" v-model="authDialog" width="375px" :before-close="closeAuthDialog">
      <img src="../assets/image/logo.png" alt="logo" class="mx-auto mb-4 w-40" />
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="登入" name="login">
          <el-form ref="loginForm" :model="loginFormData" label-position="top" class="mt-4">
            <el-form-item label="登入ID">
              <el-input
                v-model="loginFormData.userId"
                size="large"
                placeholder="請輸入遊戲ID (樣本植入體)"
              ></el-input>
            </el-form-item>
            <el-form-item label="密碼">
              <el-input
                v-model="loginFormData.password"
                show-password
                size="large"
                type="password"
                placeholder="請輸入密碼"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" class="mt-4 w-full bg-brand" @click="userLogin"
                >登入</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="註冊" name="register" class="max-h-72 overflow-y-auto">
          <el-form
            v-if="!registerSuccess"
            ref="registerForm"
            :model="registerFormData"
            label-position="top"
            class="mt-4 mr-4"
          >
            <el-form-item label="登入ID(網站登入ID)">
              <el-input
                v-model="registerFormData.userId"
                size="large"
                placeholder="請輸入遊戲ID (樣本植入體)"
              ></el-input>
            </el-form-item>
            <el-form-item label="密碼">
              <el-input
                v-model="registerFormData.password"
                show-password
                size="large"
                type="password"
                placeholder="請輸入密碼"
              ></el-input>
            </el-form-item>
            <el-form-item label="密碼確認">
              <el-input
                v-model="registerFormData.passwordConfirm"
                show-password
                size="large"
                type="password"
                placeholder="請再次輸入密碼"
              ></el-input>
            </el-form-item>
            <el-form-item label="用戶名稱">
              <el-input
                v-model="registerFormData.userName"
                size="large"
                placeholder="請輸入用戶名稱"
              ></el-input>
            </el-form-item>
            <el-form-item label="Discord名稱">
              <el-input
                v-model="registerFormData.disocrdName"
                size="large"
                placeholder="請輸入Discord名稱"
              ></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input
                v-model="registerFormData.email"
                size="large"
                type="email"
                placeholder="請輸入Email"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                class="mt-4 w-full bg-brand"
                @click="userRegister"
                >註冊</el-button
              >
            </el-form-item>
          </el-form>
          <el-result v-else icon="success" title="註冊成功" sub-title="註冊成功，請重新登入">
            <template #extra>
              <el-button type="primary" class="bg-brand" @click="gotoLogin()">登入</el-button>
            </template>
          </el-result>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </header>
</template>

<style scoped>
.under-line::after {
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, var(--el-color-primary) 50%, transparent 50%);
  background-size: 201% 100%;
  background-position: right;
  transition: background 0.4s;
}
.under-line:hover::after,
.under-line.router-link-active::after {
  background-position: left;
}
</style>
