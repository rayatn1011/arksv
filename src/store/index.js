import {
  createStore
} from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    isLogin: false, // 是否登入
    userName: '', // 使用者名稱
    userCoin: '', // 使用者餘額
    // 外部連結
    external: [{
        name: '春櫻之城Discord社群',
        url: 'https://discord.gg/XKpqdZTDna',
        icon: 'icon-discord'
      },
      {
        name: '匿名意見表',
        url: 'https://forms.gle/hEosESAypVs1b3kP9',
        icon: 'icon-doc'
      },
    ],
    // 網站連結
    nav:[{
        name: '首頁',
        url: '/',
        isOpen: true
      },
      {
        name: '伺服器規則',
        url: '/ServerRules',
        isOpen: true
      },
      {
        name: '交易市集',
        url: '/Market',
        isOpen: true
      }
    ]
  },
  mutations: {
    // 切換登入狀態
    toggleLogin(state) {
      state.isLogin = !state.isLogin;
    },
    // 登入成功
    loginSuccess(state) {
      state.isLogin = true;
    },
    logoutSuccess(state) {
      state.isLogin = false;
    },
    userBasicInfo(state) {
      let tokenID = document.cookie;
      tokenID = tokenID.slice(8);
      axios.get(
          `https://townofsakura.jw.com.tw/catAssets/ArkUser/getUserInfo.php?userid=${tokenID}`
        )
        .then(function (res) {
          // 查詢成功
          state.userCoin = res.data.money;
          state.userName = res.data.name;
        })
        .catch(function (err) {
          // 伺服器無回應，基本資訊請求失敗
          console.log("伺服器無回應，基本資訊請求失敗");
          console.log(err);
        });
    },
  },
  actions: {},
  modules: {}
})