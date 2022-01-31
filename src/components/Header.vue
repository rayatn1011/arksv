<template>
  <header id="header">
    <div id="header-block">
      <div
        class="container-full d-flex justify-content-between align-items-center"
      >
        <h1>
          <a href="index.html">
            <img src="../assets/image/logo.png" alt="LOGO" class="logo-img" />
          </a>
        </h1>
        <nav class="d-flex align-items-center">
          <ul class="d-flex align-items-center">
            <template
              v-for="(item, index) in getNavLinks"
              :key="item.name + index"
            >
              <li v-if="item.isOpen">
                <router-link :to="item.url" :alt="item.name">{{
                  item.name
                }}</router-link>
              </li>
            </template>
          </ul>
          <button
            type="button"
            id="btn-login-signup"
            @click="acountModalToggle"
            v-if="!isLogin"
          >
            登入 / 註冊
          </button>
          <div id="account" v-else>
            <div
              id="accountBlockModal"
              v-if="picked.accountBlock"
              @click="picked.accountBlock = false"
            ></div>
            <button
              type="button"
              id="btn-account"
              :class="{ active: picked.accountBlock }"
              @click="picked.accountBlock = !picked.accountBlock"
            >
              <i class="icon-acount"></i>
              帳戶
            </button>
            <transition name="fade" mode="out-in">
              <div id="userModal" class="shadow" v-show="picked.accountBlock">
                <div
                  class="
                    modal-content
                    d-flex
                    flex-column
                    justify-content-center
                    align-items-center
                  "
                >
                  <div class="user-name">{{ getUserName }}</div>
                  <div class="user-coin">{{ getUserCoin }}</div>
                  <div class="coin-name">櫻花幣</div>
                  <button type="button" id="btn-logout" @click="gotoLogout">
                    登出
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </nav>
      </div>
    </div>
  </header>
  <div
    id="acountModalDom"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="acountModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header flex-wrap justify-content-center">
          <div class="w-100">
            <button
              type="button"
              class="btn-shout-down d-block ms-auto"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span></span><span></span>
            </button>
          </div>
          <div class="logo">
            <img src="../assets/image/logo.png" alt="LOGO" />
          </div>
        </div>
        <div class="modal-body d-flex justify-content-center flex-wrap">
          <div id="switch-block" class="d-flex justify-content-center w-100">
            <button
              type="button"
              @click="
                picked.loginBlock = true;
                errorInfo.signupError = '';
              "
              :class="{ isactive: picked.loginBlock }"
            >
              帳號登入
            </button>
            <button
              type="button"
              @click="
                picked.loginBlock = false;
                errorInfo.loginError = '';
              "
              :class="{ isactive: !picked.loginBlock }"
            >
              帳號註冊
            </button>
          </div>
          <div id="content-block" class="w-100">
            <transition name="fade" mode="out-in">
              <div class="login-block" v-if="picked.loginBlock" key="login">
                <label for="loginId">登入ID</label>
                <input
                  type="text"
                  placeholder="請輸入遊戲ID(樣本植入體)"
                  id="loginId"
                  autocomplete="off"
                />
                <label for="loginPassword">登入密碼</label>
                <input
                  type="password"
                  placeholder="請輸入密碼"
                  id="loginPassword"
                  autocomplete="off"
                />
                <div
                  id="login-error"
                  :class="{
                    show: errorInfo.loginError != '',
                    'error-shaking': errorInfo.loginError != '',
                  }"
                >
                  {{ errorInfo.loginError }}
                </div>
                <button type="button" id="btn-login" @click="gotoLogin">
                  帳號登入
                </button>
              </div>
              <div class="signup-block" v-else key="signup">
                <label for="signupGameId">遊戲ID（網站登入ID）</label>
                <input
                  type="text"
                  placeholder="請輸入遊戲ID(樣本植入體)"
                  id="signupGameId"
                />
                <label for="signupPassword">密碼</label>
                <input
                  type="password"
                  placeholder="請輸入密碼"
                  id="signupPassword"
                />
                <label for="signupPasswordDobulecheck">密碼確認</label>
                <input
                  type="password"
                  placeholder="請再次輸入密碼"
                  id="signupPasswordDobulecheck"
                />
                <label for="signupUserName">用戶名稱</label>
                <input
                  type="text"
                  placeholder="請輸入用戶名稱"
                  id="signupId"
                  autocomplete="off"
                />

                <label for="signupDiscordId">Discord名稱</label>
                <input
                  type="text"
                  placeholder="輸入Discord名稱"
                  id="signupDiscordId"
                  autocomplete="off"
                />
                <label for="signupEmail">電子郵件</label>
                <input
                  type="text"
                  placeholder="請輸入電子郵件"
                  id="signupEmail"
                  autocomplete="off"
                />
                <div
                  id="signup-error"
                  :class="{
                    show: errorInfo.signupError != '',
                    'error-shaking': errorInfo.signupError != '',
                  }"
                >
                  {{ errorInfo.signupError }}
                </div>
                <button id="btn-signup" @click="gotoSignup">帳號註冊</button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  name: "headerComponent",
  props: {},
  data() {
    return {
      // 使用者資訊窗
      acountModal: null,
      // 已選擇
      picked: {
        loginBlock: true,
        accountBlock: false,
      },
      // 錯誤提醒
      errorInfo: {
        loginError: "",
        signupError: "",
      },
    };
  },
  methods: {
    /* 判斷是否登入 */
    CheckLogin() {
      let vm = this;
      let tokenID = document.cookie;
      // cookie內有tokenID
      if (typeof tokenID !== "undefined") {
        tokenID = tokenID.slice(8);
        vm.axios
          .get(
            "/catAssets/ArkUser/isUserLogining.php?enid=" +
              tokenID
          )
          .then( function (response) {
            // 伺服器回應成功
            if (response.data.isLogin) {
              // tokenID狀態為登入中
              console.log("使用者已登入");
              vm.$store.commit("loginSuccess");
              vm.$store.commit("userBasicInfo");
            }
          })
          .catch(function (error) {
            // 伺服器無回應，檢測登入請求失敗
            console.log("伺服器無回應，登入狀態請求失敗");
            console.log(error);
          });
      }
    },

    /* 登入帳號 */
    gotoLogin() {
      let vm = this;
      let loginId = document.getElementById("loginId").value;
      let loginPassword = document.getElementById("loginPassword").value;
      let errorshaking = document.querySelector("#login-error");

      // 錯誤訊息 & 動畫
      function errorAnimate(errorInfo) {
        vm.errorInfo.loginError = errorInfo;
        errorshaking.classList.add("error-shaking");
        errorshaking.addEventListener("animationend", function () {
          errorshaking.classList.remove("error-shaking");
        });
      }
      // 帳號密碼不得為空
      if ((loginId == "") | (loginPassword == "")) {
        console.log("帳號密碼不得為空");
        errorAnimate("帳號密碼不得為空");
        return;
      }
      // 開始登入
      vm.axios
        .post(
          "/catAssets/ArkUser/loginUserApi.php",
          "userid=" + loginId + "&password=" + loginPassword
        )
        // 伺服器回應成功
        .then(function (response) {
          if (response.data.isPass) {
            // 登入成功
            console.log("使用者登入成功");
            document.cookie = `tokenID=${response.data.cookid}`;
            vm.$store.commit("loginSuccess");
            vm.errorInfo.loginError = "";
            vm.acountModalToggle();
            vm.$store.commit("userBasicInfo");
          } else if (response.data.isPass == false) {
            // 帳號密碼錯誤
            console.log("帳號密碼錯誤");
            errorAnimate("帳號密碼錯誤");
            return;
          } else {
            // 帳號不存在
            console.log("帳號不存在");
            errorAnimate("帳號不存在");
            return;
          }
        })
        // 伺服器無回應，登入請求失敗
        .catch(function (error) {
          console.log("伺服器無回應，登入請求失敗");
          console.log(error);
          errorAnimate("伺服器無回應，登入請求失敗");
          return;
        });
    },

    /* 登出帳號 */
    gotoLogout() {
      let vm = this;
      let tokenID = document.cookie;
      tokenID = tokenID.slice(8);
      vm.axios
        .get(
          "/catAssets/ArkUser/outUserApi.php?enid=" +
            tokenID
        )
        .then(function (response) {
          // 登出成功
          if (response.data.isPass) {
            console.log("使用者已登出");
            vm.$store.commit("logoutSuccess");
            document.cookie = "tokenID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            vm.picked.accountBlock = false;
          }
        })
        .catch(function (error) {
          // 登出失敗
          console.log("登出請求失敗，後端無回應");
          console.log(error);
        });
    },

    /* 註冊帳號，成功後登入 */
    gotoSignup() {
      let vm = this;
      let signupGameId = document.getElementById("signupGameId").value;
      let signupPassword = document.getElementById("signupPassword").value;
      let signupDobulePassword = document.getElementById(
        "signupPasswordDobulecheck"
      ).value;
      let signupId = document.getElementById("signupId").value;
      let signupDiscordId = document.getElementById("signupDiscordId").value;
      let signupEmail = document.getElementById("signupEmail").value;
      let errorshaking = document.querySelector("#signup-error");

      //抖動錯誤訊息
      function errorAnimate(errorInfo) {
        vm.errorInfo.signupError = errorInfo;
        errorshaking.classList.add("error-shaking");
        errorshaking.addEventListener("animationend", function () {
          errorshaking.classList.remove("error-shaking");
        });
      }

      // 有欄位尚未填寫
      if (
        signupGameId == "" ||
        signupPassword == "" ||
        signupDobulePassword == "" ||
        signupId == "" ||
        signupDiscordId == "" ||
        signupEmail == ""
      ) {
        console.log("有欄位尚未填寫");
        errorAnimate("有欄位尚未填寫");
        return;
      }
      // 密碼與密碼確認不一致
      if (signupPassword !== signupDobulePassword) {
        console.log("密碼與密碼確認不一致");
        errorAnimate("密碼與密碼確認不一致");
        return;
      }
      // 開始註冊
      vm.axios
        .post(
          "/catAssets/ArkUser/newUserApi.php",
          "userid=" +
            signupGameId +
            "&username=" +
            signupId +
            "&userdcname=" +
            signupDiscordId +
            "&usermail=" +
            signupEmail +
            "&password=" +
            signupPassword
        )
        // 註冊成功
        .then(function (response) {
          console.log(response);
          if (response.data.isPass === true) {
            // 註冊成功
            console.log("註冊成功");
            signupSuccess();
            vm.acountModalToggle();
          } else if (response.data.isPass === false) {
            // 註冊失敗
            console.log("註冊失敗");
            errorAnimate("註冊失敗");
            return;
          } else if (response.data.isPass === 0) {
            // 帳戶已存在
            console.log("帳戶已存在");
            errorAnimate("帳戶已存在");
            return;
          }
        })
        //  伺服器無回應，註冊請求失敗
        .catch(function (error) {
          console.log("伺服器無回應，註冊請求失敗");
          console.log(error);
          errorAnimate("伺服器無回應，註冊請求失敗");
          return;
        });
      // 註冊成功後登入
      function signupSuccess() {
        vm.axios
          .post(
            "/catAssets/ArkUser/loginUserApi.php",
            "userid=" + signupGameId + "&password=" + signupPassword
          )
          // 伺服器回應成功
          .then(function (response) {
            if (response.data.isPass) {
              // 登入成功
              console.log("使用者登入成功");
              document.cookie = "tokenID=" + response.data.cookid;
              vm.$store.commit("loginSuccess");
              vm.errorInfo.loginError = "";
              vm.acountModalToggle();
              vm.$store.commit("userBasicInfo");
            } else if (response.data.isPass == false) {
              // 帳號密碼錯誤
              console.log("帳號密碼錯誤");
              errorAnimate("帳號密碼錯誤");
              return;
            } else {
              // 帳號不存在
              console.log("帳號不存在");
              errorAnimate("帳號不存在");
              return;
            }
          })
          // 伺服器無回應，登入請求失敗
          .catch(function (error) {
            console.log("伺服器無回應，登入請求失敗");
            console.log(error);
            errorAnimate("伺服器無回應，登入請求失敗");
            return;
          });
      }
    },

    /* ModalToggle */
    acountModalToggle() {
      this.acountModal.toggle();
    },
  },
  computed: {
    /* 取得登入及使用者資訊 */
    isLogin() {
      return this.$store.state.isLogin;
    },
    getUserName() {
      return this.$store.state.userName;
    },
    getUserCoin() {
      return this.$store.state.userCoin;
    },
    /* 取得nav清單 */
    getNavLinks() {
      return this.$store.state.nav;
    },
  },
  async created() {
    /* 判斷是否登入 */
    this.CheckLogin();
  },
  mounted() {
    /* 初始化Bootstrap - 登入&註冊視窗 */
    this.acountModal = new Modal(document.getElementById("acountModalDom"));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  #header-block {
    background: rgba($color: #fff, $alpha: 0.9);
    box-shadow: 0 6px 16px rgba($color: #000, $alpha: 0.2);
    h1 {
      padding: 8px 0;
      .logo-img {
        width: 160px;
      }
    }
    nav {
      ul {
        gap: 30px;
        a {
          position: relative;
          padding: 5px 5px;
          font-size: $fs * 1.5;
          font-weight: bold;
          color: #555;
          letter-spacing: 2px;
          transition: color 0.3s;
          &::after {
            position: absolute;
            content: "";
            top: 100%;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, $c-main 50%, transparent 50%);
            background-size: 201% 100%;
            background-position: right;
            transition: background 0.4s;
          }
          &:hover,
          &.router-link-active {
            color: $c-main;
            &::after {
              background-position: left;
            }
          }
        }
        .unopen {
          position: relative;
          pointer-events: none;
          color: #999;
          &::after {
            position: absolute;
            width: 100%;
            top: 80%;
            content: "(暫未啟用)";
            font-size: $fs * 0.7;
            font-weight: normal;
            text-align: center;
          }
        }
      }
      #btn-login-signup,
      #btn-account {
        border-radius: $fs * 3;
        margin-left: 60px;
        padding: 10px 20px;
        font-size: $fs * 1.5;
        font-weight: bold;
        letter-spacing: 2px;
        transition: background 0.25s;
        &:hover {
          background: $c-main-dark;
        }
      }
      #btn-login-signup {
        border: none;
        color: #fff;
        background: $c-main;
      }
      #account {
        position: relative;
        #btn-account {
          border: 3px solid $c-main;
          font-size: $fs * 1.2;
          color: $c-main;
          background: transparent;
          transition: color 0.25s, background 0.25s;
          &:hover,
          &.active {
            color: #fff;
            background: $c-main;
          }
          i {
            font-size: $fs * 1.1;
            vertical-align: baseline;
            margin-right: 4px;
          }
        }
        #accountBlockModal {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: transparent;
        }
        #userModal {
          width: 220px;
          position: absolute;
          right: 0;
          top: calc(100% + 20px);
          .modal-content {
            position: relative;
            border-radius: $fs * 0.5;
            border: 2px solid #555;
            padding: 20px 0 10px;
            background: #333;
            .user-name {
              width: 100%;
              border-bottom: 2px solid #555;
              margin-bottom: 20px;
              padding-bottom: 10px;
              font-size: $fs * 1.5;
              font-weight: bold;
              text-align: center;
              color: $c-main;
              &::after {
                content: "";
                position: absolute;
                right: 32px;
                top: -14px;
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 14px solid #333;
              }
            }
            .user-coin {
              font-size: $fs * 2.5;
              font-weight: bold;
              color: #fff;
            }
            .coin-name {
              font-size: $fs * 1.2;
              color: #999;
            }
            #btn-logout {
              border-radius: $fs * 2;
              border: 3px solid $c-main;
              margin-top: 20px;
              padding: 5px 20px;
              font-size: $fs * 1.2;
              font-weight: bold;
              letter-spacing: 2px;
              color: $c-main;
              background: transparent;
              transition: color 0.25s, background 0.25s;
              &:hover {
                color: #fff;
                background: $c-main;
              }
            }
          }
        }
      }
    }
  }
}
#acountModalDom {
  .modal-header {
    border: none;
    .logo {
      width: 160px;
    }
    .btn-shout-down {
      position: relative;
      width: $fs * 2;
      height: $fs * 2;
      border-radius: 50%;
      border: 1px solid $c-main;
      color: $c-main;
      background: #fff;
      transition: background 0.2s;
      &:hover {
        background: $c-main;
        span {
          background: #fff;
        }
      }
      span {
        position: absolute;
        width: $fs * 1.2;
        height: 2px;
        background: $c-main;
        left: 50%;
        top: 50%;
        transition: background 0.2s;

        &:nth-child(1) {
          transform: translateX(-50%) rotate(45deg);
        }

        &:nth-child(2) {
          transform: translateX(-50%) rotate(-45deg);
        }
      }
    }
  }

  .modal-body {
    padding: 10px 60px 40px;

    #switch-block {
      margin-bottom: 40px;

      button {
        width: 50%;
        border: none;
        border-bottom: 3px solid #ccc;
        padding-bottom: 5px;
        font-size: $fs * 1.2;
        font-weight: bold;
        letter-spacing: 2px;
        color: #999;
        background: none;

        &.isactive {
          pointer-events: none;
          border-bottom: 3px solid $c-main;
          color: $c-main;
        }
      }
    }

    #content-block {
      label {
        display: block;
        margin-bottom: 4px;
        font-size: $fs * 0.9;
        color: #555;
      }

      input {
        display: block;
        width: 100%;
        border-radius: $fs * 0.5;
        border: 1px solid #ccc;
        padding: 15px 10px;

        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }

      #login-error,
      #signup-error {
        visibility: hidden;
        margin: 10px auto;
        text-align: center;
        padding: 5px 40px;
        letter-spacing: 2px;
        color: #fff;
        background: $c-error-linear;
        transition: opacity 0.3s;
        &.show {
          visibility: visible;
        }
        &.error-shaking {
          animation: error-shaking;
          animation-duration: 0.1s;
          animation-iteration-count: 5;
          animation-timing-function: linear;

          @keyframes error-shaking {
            0% {
              transform: translateX(-5px);
            }
            50% {
              transform: translateX(5px);
            }
            100% {
              transform: translateX(0);
            }
          }
        }
      }

      button {
        width: 100%;
        border-radius: $fs * 1.2;
        border: 2px solid $c-main;
        padding: 10px;
        font-size: $fs * 1.2;
        font-weight: bold;
        letter-spacing: 2px;
        color: $c-main;
        background: #fff;
        transition: color 0.25s, background 0.25s;
        &:hover {
          color: #fff;
          background: $c-main;
        }
      }
    }
  }
}
</style>
