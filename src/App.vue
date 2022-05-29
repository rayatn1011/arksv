<script setup>
import { useStore } from 'vuex'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

const store = useStore()
function getUserInfo() {
  store.dispatch('getUserInfo')
}
onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <TheHeader class="sticky top-0 z-10 shrink-0" />
  <main class="flex grow">
    <router-view />
  </main>
  <TheFooter class="shrink-0" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
:root {
  --el-color-primary: #e24973;
  --el-color-primary-light-1: #ff5370;
  --el-color-primary-light-2: #ff667a;
  --el-color-primary-light-3: #ff798f;
  --el-color-primary-light-4: #ff8c9b;
  --el-color-primary-light-5: #ffa0b0;
  --el-color-primary-light-6: #ffb3ca;
  --el-color-primary-light-7: #ffc6d9;
  --el-color-primary-light-8: #ffd9e4;
  --el-color-primary-light-9: #fcecf1;
  --el-color-primary-dark-2: #e24973;
}
.router-link-active {
  color: var(--el-color-primary);
  cursor: default;
}
</style>
