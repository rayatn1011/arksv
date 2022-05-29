import { setCookie, getCookie } from '../../utils/cookie'
import { userApi } from '../../utils/api.js'
import { router } from '../../router/index.js'
export const moduleAuth = {
  state: () => ({
    isLogin: false,
    userInfo: {
      id: '',
      name: '',
      money: '',
      isRootUser: false,
    },
  }),
  mutations: {
    setIsLogin(state, loginStatus) {
      if (loginStatus) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    setUserToken(state, tokenId) {
      let day = tokenId ? 30 : false
      setCookie('tokenID', tokenId, day)
    },
    setUserInfo(state, userInfo) {
      if (userInfo) {
        state.userInfo.id = userInfo.gameid
        state.userInfo.name = userInfo.name
        state.userInfo.money = userInfo.money
        state.userInfo.isRootUser = Boolean(userInfo.isRootUser)
      } else {
        state.userInfo.id = ''
        state.userInfo.name = ''
        state.userInfo.money = ''
        state.userInfo.isRootUser = false
      }
    },
    checkRouteAuth(state) {
      if (!state.isLogin && router.currentRoute.value.meta.requiresAuth) {
        router.push({ name: 'Home' })
      }
    },
  },
  actions: {
    async login(context, data) {
      try {
        let formdata = new URLSearchParams()
        formdata.append('userid', data.userId)
        formdata.append('password', data.password)

        const response = await userApi({
          method: 'post',
          url: '/loginUserApi.php',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: formdata,
        })
        let loginStatus = response.data.isPass
        let tokenId = response.data.cookid ? response.data.cookid : ''
        context.commit('setIsLogin', loginStatus)
        context.commit('setUserToken', tokenId)
        return response.data.isPass
      } catch (error) {
        context.commit('setIsLogin', false)
        console.error(error)
        alert('登入無回應')
      }
    },
    async logout(context) {
      let tokenId = getCookie('tokenID')
      if (tokenId) {
        try {
          const response = await userApi({
            method: 'get',
            url: '/outUserApi.php',
            params: {
              enid: tokenId,
            },
          })
          let loginStatus = !response.data.isPass
          context.commit('setIsLogin', loginStatus)
          context.commit('setUserToken', null)
          context.commit('setUserInfo', null)
          context.commit('checkRouteAuth')
        } catch (error) {
          alert('登出無回應')
          console.error(error)
        }
      } else {
        context.commit('setIsLogin', false)
      }
    },
    async checkLogin(context) {
      let tokenId = getCookie('tokenID')
      if (tokenId) {
        try {
          const response = await userApi({
            method: 'get',
            url: '/isUserLogining.php',
            params: {
              enid: tokenId,
            },
          })
          let loginStatus = response.data.isLogin
          context.commit('setIsLogin', loginStatus)
          return loginStatus
        } catch (error) {
          alert('檢測登入無回應')
          console.error(error)
          context.commit('setIsLogin', false)
        }
      } else {
        context.commit('setIsLogin', false)
      }
    },
    async getUserInfo(context) {
      let tokenId = getCookie('tokenID')
      try {
        const response = await userApi({
          method: 'get',
          url: '/getUserInfo.php',
          params: {
            userid: tokenId,
          },
        })
        let userInfo = response.data
        context.commit('setUserInfo', userInfo)
      } catch (error) {
        alert('取得使用者資訊無回應')
        console.error(error)
      }
    },
    async registerUser(context, data) {
      let formdata = new URLSearchParams()
      formdata.append('userid', data.userId)
      formdata.append('password', data.password)
      formdata.append('username', data.userName)
      formdata.append('userdcname', data.disocrdName)
      formdata.append('usermail', data.email)

      try {
        const response = await userApi({
          method: 'post',
          url: '/newUserApi.php',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: formdata,
        })
        return response.data.isPass
      } catch (error) {
        alert('註冊無回應')
        console.error(error)
      }
    },
  },
  getters: {},
}
