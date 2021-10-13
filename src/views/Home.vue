<template>
  <main id="main">
    <section id="banner">
      <div class="banner-block"></div>
      <div
        id="baner-text"
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <h2>歡迎來到</h2>
        <h2>春櫻之城官方網站</h2>
        <h2>本網站目前測試中，僅開放交易市集</h2>
      </div>
    </section>
    <section id="intro-DC">
      <div class="container">
        <div class="row gy-5 align-items-center justify-content-between">
          <div class="col-12 col-lg-6">
            <h2>最新的遊戲消息</h2>
            <p>
              不管是伺服器獨家的限時活動，還是各地圖的維修通知，都可以在Discord看到最新消息。
            </p>
          </div>
          <div class="col-12 col-lg-5">
            <img
              src="../assets/image/home/dc-intro.jpg"
              alt="春櫻之城-Discord"
            />
          </div>
          <div class="col-12 col-lg-4">
            <iframe
              src="https://discordapp.com/widget?id=781422087066746890&theme=dark"
              width="100%"
              height="500"
              allowtransparency="true"
              frameborder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
          </div>
          <div class="col-12 col-lg-6">
            <h2>豐富的社群分享</h2>
            <p>
              多名玩家隨時在線上，不管你是想問遊戲問題，還是想秀出你的生猛霸王龍，先進來再說！
            </p>
            <a
              class="link-dc"
              :href="getExternalLink[0].url"
              target="_blank"
              :alt="getExternalLink[0].name"
            >
              <i :class="getExternalLink[0].icon" class="me-3"></i
              >春櫻之城Discord社群</a
            >
          </div>
        </div>
      </div>
    </section>
    <section id="feedback">
      <div class="container-full">
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-lg-5">
            <div class="img-feedback"></div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="feedback-block">
              <h2>匿名意見表</h2>
              <p>
                我們很重視玩家的想法，也同時保障你的隱私，若有任何的建議，都請放心地說出來。
              </p>
              <a
                class="link-feedback"
                :href="getExternalLink[1].url"
                target="_blank"
                :alt="getExternalLink[1].name"
              >
                <i :class="getExternalLink[1].icon" class="me-3"></i
                >說出你的想法</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  methods: {},
  computed: {
    /* 取得外部連結 */
    getExternalLink() {
      return this.$store.state.external;
    },
  },
  watch: {},
  created() {},
  mounted() {
    let banerText = document.getElementById("baner-text");
    let headerHeight = document.getElementById("header").offsetHeight;
    banerText.style.height = "calc(100vh - " + headerHeight + "px)";
  },
};
</script>

<style lang="scss" scoped>
section {
  h2 {
    margin-bottom: 20px;
    font-size: $fs * 3;
    font-weight: bold;
  }
  p {
    font-size: $fs * 1.5;
  }
}
#banner {
  .banner-block {
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-blend-mode: multiply;
      background-color: rgba($color: #000, $alpha: 0.4);

      background-image: url(../assets/image/中文3.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
    }
  }
  #baner-text {
    h2 {
      color: #fff;
      font-weight: bold;
      letter-spacing: 8px;
      &:nth-child(1) {
        font-size: $fs * 2;
        margin-bottom: 30px;
      }
      &:nth-child(2) {
        font-size: $fs * 3;
        margin-bottom: 40px;
      }
      &:nth-child(3) {
        font-size: $fs * 1.2;
        padding: 10px 80px;
        background: linear-gradient(
          to right,
          rgba($color: $c-main, $alpha: 0) 0%,
          rgba($color: $c-main, $alpha: 0.8) 10%,
          rgba($color: $c-main, $alpha: 0.8) 90%,
          rgba($color: $c-main, $alpha: 0) 100%
        );
      }
    }
  }
}
#intro-DC {
  padding: 150px 0;
  background-color: rgba($color: #fff, $alpha: 0.8);
  background-blend-mode: lighten;
  background-image: url(../assets/image/home/dc-bg.jpg);
  background-position: center;
  background-size: cover;
  .link-dc {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-top: 60px;
    padding: 20px 40px;
    font-size: $fs * 1.5;
    font-weight: bold;
    color: #fff;
    background: #5865f2;
    box-shadow: inset 0px -4px 0px 4px rgba($color: #000, $alpha: 0.16);

    transition: box-shadow 0.25s, background 0.25s;
    &:hover {
      background: #4a55cb;
      box-shadow: inset 0px 0px 0px 2px rgba($color: #000, $alpha: 0.16);
    }
  }
}
#feedback {
  padding: 150px 0;
  .img-feedback {
    width: 100%;
    border-radius: 8px;
    padding-bottom: 80%;
    background: url(../assets/image/home/feedback.jpg);
    background-position: center;
    background-size: cover;
  }
  .feedback-block {
    width: 80%;
    margin: 0 auto;
    .link-feedback {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      margin-top: 60px;
      padding: 20px 40px;
      font-size: $fs * 1.5;
      font-weight: bold;
      color: #fff;
      background: $c-main;
      box-shadow: inset 0px -4px 0px 4px rgba($color: #000, $alpha: 0.16);

      transition: box-shadow 0.25s, background 0.25s;
      &:hover {
        background: $c-main-dark;
        box-shadow: inset 0px 0px 0px 2px rgba($color: #000, $alpha: 0.16);
      }
    }
  }
}
</style>
