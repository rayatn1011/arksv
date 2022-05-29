<script setup>
const bannerList = ref([
  {
    backgroundImage: './src/assets/image/中文3.jpg',
    title: '春櫻之城官方網站',
    subTitle: '櫻花幣月卡已上線',
  },
])
bannerList.value.forEach((item) => {
  item.backgroundImage = item.backgroundImage ? `url(${item.backgroundImage})` : '#F5F5F5'
})

const headerHeight = document.querySelector('header').offsetHeight
</script>

<template>
  <div class="flex w-full flex-col gap-24">
    <article class="relative" :style="{ top: `-${headerHeight}px` }">
      <el-carousel height="100vh">
        <el-carousel-item v-for="item in bannerList" :key="item.title" class="h-full">
          <div :style="{ 'background-image': item.backgroundImage }" class="banner-background">
            <h2 class="mb-4 text-2xl font-bold text-white lg:mb-10 lg:text-5xl">
              {{ item.title }}
            </h2>
            <p class="banner-subtitle lg:text-lg lg:tracking-widest">
              {{ item.subTitle }}
            </p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </article>

    <article class="container flex flex-col gap-24">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div class="flex flex-col gap-4">
          <h2 class="text-xl font-bold lg:text-4xl">最新的遊戲消息</h2>
          <p class="lg:text-xl">
            不管是伺服器獨家的限時活動，還是各地圖的維修通知，都可以在Discord看到最新消息。
          </p>
        </div>
        <div>
          <img src="../assets/image/home/dc-intro.jpg" alt="最新的遊戲消息" />
        </div>
      </div>
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <iframe
            src="https://discordapp.com/widget?id=781422087066746890&theme=dark"
            width="100%"
            height="320"
            allowtransparency="true"
            frameborder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
        <div class="flex flex-col items-start gap-4">
          <h2 class="text-xl font-bold lg:text-4xl">豐富的社群分享</h2>
          <p class="mb-8 lg:text-xl">
            多名玩家隨時在線上，不管你是想問遊戲問題，還是想秀出你的生猛霸王龍，先進來再說！
          </p>
          <a
            href="https://discord.gg/XKpqdZTDna"
            alt="discord"
            target="_blank"
            class="w-full self-center rounded-lg bg-[#5865f2] p-4 text-center text-2xl font-bold text-white shadow-lg transition hover:shadow-xl lg:w-auto lg:px-32"
            >Discord 社群</a
          >
        </div>
      </div>
    </article>
    <article class="bg-gray-100 py-32">
      <div class="container">
        <div class="grid items-end gap-16 lg:grid-cols-2">
          <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold lg:text-4xl">匿名意見表</h2>
            <p class="lg:text-xl">
              我們很重視玩家的想法，也同時保障你的隱私，若有任何的建議，都請放心地說出來。
            </p>
          </div>
          <div class="flex flex-col items-start gap-4">
            <a
              href="https://forms.gle/hEosESAypVs1b3kP9"
              alt="匿名意見表"
              target="_blank"
              class="w-full self-center rounded-lg bg-brand p-4 text-center text-2xl font-bold text-white shadow-lg transition hover:shadow-xl lg:w-auto lg:px-32"
              >說出您的想法</a
            >
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.banner-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-blend-mode: multiply;
  background-color: rgba(0, 0, 0, 0.4);
  height: 100%;
}
.banner-subtitle {
  color: #fff;
  font-weight: bold;
  text-align: center;
  padding: 8px 40px;
  width: 50%;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--el-color-primary) 10%,
    var(--el-color-primary) 90%,
    transparent 100%
  );
}
</style>
