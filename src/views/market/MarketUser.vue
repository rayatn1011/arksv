<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const userRoutes = [
  {
    label: '上架新商品',
    name: 'market-user-add',
  },
  {
    label: '上架中的商品',
    name: 'market-user-launched',
  },
  {
    label: '被下訂的商品',
    name: 'market-user-booked',
  },
  {
    label: '我下訂的商品',
    name: 'market-user-mybooked',
  },
  // {
  //   label: '交易紀錄',
  //   name: 'market-user-record',
  // },
]
const picked = reactive({
  userRoute: 'market-user-add',
})
const clickTab = (e) => {
  router.push({ name: e.paneName })
}
const resetPicked = () => {
  picked.userRoute = router.currentRoute.value.name
}
//生命週期
onMounted(() => {
  resetPicked()
})
</script>

<template>
  <div>
    <nav id="user-nav">
      <el-tabs v-model="picked.userRoute" @tab-click="clickTab">
        <el-tab-pane
          v-for="(item, index) in userRoutes"
          :key="index"
          :label="item.label"
          :name="item.name"
          class="text-lg font-bold"
        >
        </el-tab-pane>
      </el-tabs>
    </nav>
    <router-view class="rounded bg-gray-100 px-4 py-4"></router-view>
  </div>
</template>

<style>
#user-nav .el-tabs__item {
  font-size: 1.125rem;
  font-weight: bold;
}
#user-nav .el-tabs__item.is-active {
  color: var(--el-color-primary);
}
</style>
