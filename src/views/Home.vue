<template>
        <main id="main">
            <section id="banner">
                <div class="banner-block">
                </div>
                <div id="baner-text" class="d-flex flex-column align-items-center justify-content-center">
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
                            <p>不管是伺服器獨家的限時活動，還是各地圖的維修通知，都可以在Discord看到最新消息。</p>
                        </div>
                        <div class="col-12 col-lg-5">
                            <img src="img/index/dc-intro.jpg" alt="春櫻之城-Discord">
                        </div>
                        <div class="col-12 col-lg-4">
                            <iframe src="https://discordapp.com/widget?id=781422087066746890&theme=dark" width="100%"
                                height="500" allowtransparency="true" frameborder="0"
                                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                        </div>
                        <div class="col-12 col-lg-6">
                            <h2>豐富的社群分享</h2>
                            <p>多名玩家隨時在線上，不管你是想問遊戲問題，還是想秀出你的生猛霸王龍，先進來再說！</p>
                            <!-- <a class="link-dc" :href="linkList.external[0].url" target="_blank"
                                :alt="linkList.external[0].name">
                                <i :class="linkList.external[0].icon" class="me-3"></i>春櫻之城Discord社群</a> -->
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
                                <p>我們很重視玩家的想法，也同時保障你的隱私，若有任何的建議，都請放心地說出來。</p>
                                <!-- <a class="link-feedback" :href="linkList.external[1].url" target="_blank"
                                    :alt="linkList.external[1].name">
                                    <i :class="linkList.external[1].icon" class="me-3"></i>說出你的想法</a> -->
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
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>
