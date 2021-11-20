import {
  createStore
} from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    isLogin: false, // 是否登入
    userName: '', // 使用者名稱
    userCoin: '', // 使用者餘額
    userId: '', //使用者ID
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
    nav: [{
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
    ],
    // 商店連結
    markeLink: [{
        name: "社群市集",
        url: "/Market/Community/1"
      },
      {
        name: "官方市集",
        url: "/Market/Official/1"
      },
      {
        name: "個人專區",
        url: "/Market/UserArea/AddNew"
      }
    ],
    // 個人專區連結
    userAreaLink: [{
      name: "新商品上架",
      url: "/Market/UserArea/AddNew"
    }, {
      name: "上架中的商品",
      url: "/Market/UserArea/Launched"
    }, {
      name: "被預定的商品",
      url: "/Market/UserArea/Booked"
    }, {
      name: "交易紀錄",
      url: "/Market/UserArea/Record"
    }]
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
          console.log("基本資訊查詢成功");
          state.userId = res.data.gameid;
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