<script setup>
const carouselList = [
  {
    src: './src/assets/image/中文3.jpg',
    label: '交易系統新上線！',
  },
]
const marketNavList = [
  {
    label: '社群市集',
    value: 'market-community',
  },
  {
    label: '官方市集',
    value: 'market-official',
  },
  {
    label: '個人店鋪',
    value: 'market-user',
  },
]
</script>

<template>
  <div class="container">
    <div class="mx-8">
      <div class="mt-4 mb-8">
        <el-carousel trigger="click" arrow="never" height="150px">
          <el-carousel-item v-for="item in carouselList" :key="item">
            <div class="relative h-full w-full">
              <img
                class="object-cdnter h-full w-full rounded-lg object-cover"
                :src="item.src"
                :alt="item.label"
              />
              <div
                class="bg-carousel absolute bottom-0 right-0 select-none rounded-br-lg text-2xl font-bold text-white"
              >
                {{ item.label }}
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="flex justify-items-stretch">
        <aside class="w-40 shrink-0">
          <nav>
            <ul class="text-xl font-bold">
              <li v-for="(item, index) in marketNavList" :key="item.label">
                <el-divider v-if="index == marketNavList.length - 1" />
                <router-link
                  class="mb-1 block rounded px-4 py-2 transition hover:bg-brand-light hover:text-brand"
                  :to="{ name: item.value }"
                  :alt="item.label"
                  >{{ item.label }}</router-link
                >
              </li>
            </ul>
          </nav>
        </aside>
        <article class="ml-8 mb-24 grow">
          <router-view></router-view>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-carousel {
  padding: 4px 8px 4px 56px;
  background: linear-gradient(to right, rgba(226, 73, 115, 0) 0%, var(--el-color-primary) 48px);
}
.router-link-active {
  background-color: var(--el-color-primary-light-9);
}
</style>
