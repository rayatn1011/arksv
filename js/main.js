
let app = new Vue ({
    el:'#app',
    data() {
      return {
        //使用者資訊
        account: {
          islogin: false,
          userName: '',
          coin: 0,
        },
        // 使用者資訊窗
        acountModal: '',
        // 已選擇
        picked: {
          loginBlock: true,
          accountBlock: false,
        },
        // 錯誤提醒
        errorInfo:{
          loginError:'',
          signupError:'',
        },
        // 連結管理
        linkList:{
          // 導覽列
          nav:[
            {name:'伺服器規則',url:'ServerRules.html',open:true},
            {name:'交易市集',url:'Market.html',open:true},
            {name:'交易系統',url:'',open:false},
          ],
          // 外部連結
          external:[
            {name:'春櫻之城Discord社群',url:'https://discord.gg/XKpqdZTDna',icon:'icon-discord'},
            {name:'匿名意見表',url:'https://forms.gle/hEosESAypVs1b3kP9',icon:'icon-doc'},
          ],
        },
      }
    },
    methods: {
      /* 判斷是否登入 */
      CheckLogin() {
        let vm = this;
        let tokenID = document.cookie;
        // cookie內有tokenID
        if (typeof tokenID !== 'undefined') {
          tokenID = tokenID.slice(8);
          axios.get('https://townofsakura.jw.com.tw/catAssets/ArkUser/isUserLogining.php?enid=' + tokenID)
            .then(function (response) {
              // 伺服器回應成功
              if (response.data.isLogin) {
                // tokenID狀態為登入中
                console.log('使用者已登入');
                vm.account.islogin = response.data.isLogin;
                vm.userBasicInfo();
              }
            })
            .catch(function (error) {
              // 伺服器無回應，檢測登入請求失敗
              console.log('伺服器無回應，登入狀態請求失敗');              
            })
        };
      },

      /* 登入帳號 */
      gotoLogin() {
        let vm = this;
        let loginId = document.getElementById('loginId').value;
        let loginPassword = document.getElementById('loginPassword').value;
        let errorshaking = document.querySelector('#login-error');

        // 錯誤訊息 & 動畫
        function errorAnimate(errorInfo) {
          vm.errorInfo.loginError = errorInfo;
          errorshaking.classList.add('error-shaking');
          errorshaking.addEventListener('animationend', function () {
            errorshaking.classList.remove('error-shaking');
          });
        };
        // 帳號密碼不得為空
        if (loginId == '' | loginPassword == '') {
          console.log('帳號密碼不得為空')
          errorAnimate('帳號密碼不得為空');
          return
        };
        // 開始登入
        axios.post(
            'https://townofsakura.jw.com.tw/catAssets/ArkUser/loginUserApi.php',
            ("userid=" + loginId + "&password=" + loginPassword),
          )
          // 伺服器回應成功
          .then(function (response) {
            if (response.data.isPass) {
              // 登入成功
              console.log('使用者登入成功')
              document.cookie = "tokenID=" + response.data.cookid;
              vm.account.islogin = response.data.isPass;
              vm.errorInfo.loginError = '';
              vm.acountModalToggle();
              vm.userBasicInfo();
            } else if (response.data.isPass == false) {
              // 帳號密碼錯誤
              console.log('帳號密碼錯誤')
              errorAnimate('帳號密碼錯誤');
              return
            } else {
              // 帳號不存在
              console.log('帳號不存在')
              errorAnimate('帳號不存在');
              return
            }
          })
          // 伺服器無回應，登入請求失敗
          .catch(function (error) {
            console.log('伺服器無回應，登入請求失敗');
            errorAnimate('伺服器無回應，登入請求失敗');
            return
          });
      },

      /* 登出帳號 */
      gotoLogout() {
        let vm = this;
        let tokenID = document.cookie;
        tokenID = tokenID.slice(8);
        axios.get('https://townofsakura.jw.com.tw/catAssets/ArkUser/outUserApi.php?enid=' + tokenID)
        .then(function (response) {
          // 登出成功
          if (response.data.isPass) {
            console.log('使用者已登出');
            vm.account.islogin = !response.data.isPass;
            vm.picked.accountBlock = false;
          };
        })
        .catch(function (error) {
          // 登出失敗
          console.log('登出請求失敗，後端無回應');
        })
      },

      /* 註冊帳號，成功後登入 */
      gotoSignup() {
        let vm =this;
        let signupGameId = document.getElementById('signupGameId').value;
        let signupPassword = document.getElementById('signupPassword').value;
        let signupDobulePassword = document.getElementById('signupPasswordDobulecheck').value;
        let signupId = document.getElementById('signupId').value;
        let signupDiscordId = document.getElementById('signupDiscordId').value;
        let signupEmail = document.getElementById('signupEmail').value;
        let errorshaking = document.querySelector('#signup-error');
        
        //抖動錯誤訊息
        function errorAnimate(errorInfo){
          vm.errorInfo.signupError = errorInfo;
          errorshaking.classList.add('error-shaking');
          errorshaking.addEventListener('animationend', function () {
            errorshaking.classList.remove('error-shaking');
          });
        };

        // 有欄位尚未填寫
        if(signupGameId == '' | signupPassword == '' | signupDobulePassword == '' | signupId == '' | signupDiscordId == '' | signupEmail == '') {
          console.log('有欄位尚未填寫')
          errorAnimate('有欄位尚未填寫');
          return
        }
        // 密碼與密碼確認不一致
        if (signupPassword !== signupDobulePassword ) {
          console.log('密碼與密碼確認不一致')
          errorAnimate('密碼與密碼確認不一致');
          return
        }
        // 開始註冊
        axios.post(
          'https://townofsakura.jw.com.tw/catAssets/ArkUser/newUserApi.php',
          ('userid=' + signupGameId + 'username=' + signupId + 'userdcname=' + signupDiscordId + 'usermail' + signupEmail + 'password' + signupPassword)
          )
          // 註冊成功
          .then(function (response) {
            console.log(response);
            if(response.data.isPass === true){
              // 註冊成功
              console.log('註冊成功')
              signupSuccess();
              vm.acountModalToggle();
            } else if (response.data.isPass === false) {
              // 註冊失敗
              console.log('註冊失敗')
              errorAnimate('註冊失敗');
              return
            } else if (response.data.isPass === 0) {
              // 帳戶已存在
              console.log('帳戶已存在')
              errorAnimate('帳戶已存在');
              return
            };
          })
          //  伺服器無回應，註冊請求失敗
          .catch(function (error) {
            console.log('伺服器無回應，註冊請求失敗');
            errorAnimate('伺服器無回應，註冊請求失敗');
            return
          }
        );
        // 註冊成功後登入
        function signupSuccess (){
          axios.post(
            'https://townofsakura.jw.com.tw/catAssets/ArkUser/loginUserApi.php',
            ("userid=" + signupGameId + "&password=" + signupPassword ),
          )
          // 伺服器回應成功
          .then(function (response) {
            if (response.data.isPass) {
              // 登入成功
              console.log('使用者登入成功')
              document.cookie = "tokenID=" + response.data.cookid;
              vm.account.islogin = response.data.isPass;
              vm.errorInfo.loginError = '';
              vm.acountModalToggle();
              vm.userBasicInfo();
            } else if (response.data.isPass == false) {
              // 帳號密碼錯誤
              console.log('帳號密碼錯誤')
              errorAnimate('帳號密碼錯誤');
              return
            } else {
              // 帳號不存在
              console.log('帳號不存在')
              errorAnimate('帳號不存在');
              return
            }
          })
          // 伺服器無回應，登入請求失敗
          .catch(function (error) {
            console.log('伺服器無回應，登入請求失敗');
            errorAnimate('伺服器無回應，登入請求失敗');
            return
          });
        }
      },

      /* 基本資訊 */
      userBasicInfo(){
        let vm = this;
        let tokenID = document.cookie;
        tokenID = tokenID.slice(8);
        axios.get('https://townofsakura.jw.com.tw/catAssets/ArkUser/getUserInfo.php?userid=' + tokenID)
        .then(function (response) {
          // 查詢成功
          vm.account.coin = response.data.money;
          vm.account.userName = response.data.name;
        })
        .catch(function (error) {
          // 伺服器無回應，基本資訊請求失敗
          console.log('伺服器無回應，基本資訊請求失敗');
        })
      },

      /* 計算Banner高度 */
      BannerHeight() {
        let banerText = document.getElementById('baner-text');
        let headerHeight = document.getElementById('header').offsetHeight;
        banerText.style.height = 'calc(100vh - ' + headerHeight + 'px)';
      },
      
      /* ModalToggle */
      acountModalToggle(){
        this.acountModal.toggle();
      }
    },
    watch:{
    },
    mounted(){
      let vm = this;

      /* 計算Banner文字高度 */
      vm.BannerHeight();

      /* 判斷是否登入 */
      vm.CheckLogin();

      /* 初始化Bootstrap - 登入&註冊視窗 */
      vm.acountModal = new bootstrap.Modal(document.getElementById('acountModal'));

    }
})