<script setup>
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
let currentYear = new Date().getFullYear()
let copyright = ref(`Copyright © ${currentYear} Town of Sakura`)
</script>

<template>
  <footer class="bg-gray-700 py-8 text-white">
    <div class="container">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="row-span-2 flex flex-col items-center justify-center gap-2">
          <img src="../assets/image/logo-w.png" alt="logo" class="w-32" />
          <h3 class="text-lg font-bold">方舟：生存進化伺服器</h3>
          <p class="text-sm">{{ copyright }}</p>
        </div>
        <div>
          <h3 class="text-xl">網站導覽</h3>
          <el-divider class="my-2 border-gray-600" />
          <nav>
            <ul v-for="item in navLinks" :key="item.value" class="flex flex-col gap-2">
              <li>
                <router-link
                  :to="item.value"
                  :alt="item.label"
                  class="text-gray-300 transition hover:text-gray-100"
                  >{{ item.label }}</router-link
                >
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h3 class="text-xl">外部連結</h3>
          <el-divider class="my-2 border-gray-600" />
          <nav>
            <ul class="flex flex-col gap-2">
              <li>
                <a
                  href="https://forms.gle/hEosESAypVs1b3kP9"
                  alt="匿名意見表"
                  target="_blank"
                  class="text-gray-300 transition hover:text-gray-100"
                  >匿名意見表</a
                >
              </li>
              <li>
                <a
                  href="https://discord.gg/XKpqdZTDna"
                  alt="discord"
                  target="_blank"
                  class="text-gray-300 transition hover:text-gray-100"
                  >Discord 社群</a
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-span-2">
          <h3 class="text-xl">網站維護</h3>
          <el-divider class="my-2 border-gray-600" />
          <p class="mb-2 text-gray-300">管理員： 冰的熱拿鐵、asd456uu</p>
          <p class="text-gray-300">網站工程師： ☆Rainbow·catjennie☆、狐狸乎離</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
a.router-link-active {
  color: #777;
}
</style>
