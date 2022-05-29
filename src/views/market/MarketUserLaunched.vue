<script setup>
import { useStore } from 'vuex'
import { marketApi } from '../../utils/api.js'

const store = useStore()
const userInfo = ref(store.state.auth.userInfo)

// 全螢幕載入中狀態
const fullscreenLoading = ref(false)

// 已選取的tab
const activeTab = ref('community')

const productType = [
  {
    label: '武器',
    value: 'weapon',
  },
  {
    label: '防具',
    value: 'armor',
  },
  {
    label: '道具',
    value: 'props',
  },
  {
    label: '資源',
    value: 'resource',
  },
  {
    label: '其他',
    value: 'other',
  },
]
const productQuality = [
  {
    label: '原始',
    value: 'primitive',
  },
  {
    label: '普通',
    value: 'ramshackle',
  },
  {
    label: '優秀',
    value: 'apprentice',
  },
  {
    label: '精良',
    value: 'journeyman',
  },
  {
    label: '史詩',
    value: 'mastercraft',
  },
  {
    label: '傳說',
    value: 'ascendan',
  },
]
// 未下訂的清單
const unBookedList = reactive({
  community: [],
  formatedCommunity: computed(() => {
    return unBookedList.community.map((item) => {
      let newItem = { ...item }
      let currentType = productType.find((type) => type.value === item.class)
      if (currentType) {
        newItem.type = currentType.label
        newItem.qualityLabel = productQuality.find((type) => type.value === item.quality).label
      }
      newItem.dealContent = item.money ? `櫻花幣 $${item.money}` : item.money_item
      return newItem
    })
  }),
  official: [],
  formatedOfficial: computed(() => {
    return unBookedList.official.map((item) => {
      let newItem = { ...item }
      let currentType = productType.find((type) => type.value === item.class)
      if (currentType) {
        newItem.type = currentType.label
        newItem.qualityLabel = productQuality.find((type) => type.value === item.quality).label
      }
      newItem.dealContent = item.money ? `櫻花幣 $${item.money}` : item.money_item
      return newItem
    })
  }),
})

// 取得未下訂的清單
const getUnBookedList = async () => {
  let formData = new FormData()
  formData.append('gmid', userInfo.value.id)
  formData.append('getOrderList', 0)

  await Promise.all([
    marketApi({
      method: 'post',
      url: 'getTanListApi.php',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    }),
    marketApi({
      method: 'post',
      url: 'getRootTanListApi.php',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    }),
  ])
    .then((response) => {
      unBookedList.community = response[0].data
      unBookedList.official = response[1].data
    })
    .catch((error) => {
      alert('取得上架商品清單失敗')
      console.error(error)
    })
}

// 生命週期
onMounted(async () => {
  await getUnBookedList()
})
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="服務處理中">
    <section class="mb-8">
      <ul class="grid grid-cols-[repeat(2,_minmax(0,_max-content))] gap-4">
        <li>
          <label for="userId" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >個人ID</label
          >
          <input
            id="userId"
            type="text"
            autocomplete="off"
            :value="userInfo.id"
            readonly
            class="w-full rounded-md border border-gray-100 bg-gray-200 px-3 py-2 transition focus:border-brand focus:outline-none"
          />
        </li>
        <li>
          <label for="userName" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >名稱</label
          >
          <input
            id="userName"
            type="text"
            autocomplete="off"
            :value="userInfo.name"
            readonly
            class="w-full rounded-md border border-gray-100 bg-gray-200 px-3 py-2 transition focus:border-brand focus:outline-none"
          />
        </li>
      </ul>
    </section>
    <section>
      <el-tabs v-model="activeTab">
        <el-tab-pane name="community">
          <template #label><span class="text-base font-bold">社群市集</span></template>
          <el-table
            :data="unBookedList.formatedCommunity"
            border
            max-height="480"
            style="width: 100%"
          >
            <el-table-column prop="title" label="商品圖片" width="80">
              <template #default="scope">
                <div>
                  <img :src="scope.row.icon" class="max-w-[4rem] border bg-white p-1" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="商品名稱" min-width="120" />
            <el-table-column prop="isBlueprint" label="藍圖" width="60">
              <template #default="scope">
                <div v-if="scope.row.isBlueprint">
                  <i-custom-done class="mx-auto text-green-700" />
                </div>
                <div v-else></div>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="類別" width="60" />
            <el-table-column prop="qualityLabel" label="品質" width="60" />
            <el-table-column prop="message" label="商品內容" min-width="120" />
            <el-table-column prop="dealContent" label="交換方式" min-width="120" />
            <el-table-column fixed="right" label="操作" align="center" width="140">
              <template #default>
                <el-tooltip placement="top" content="請通知管理員取消上架">
                  <button
                    type="button"
                    class="rounded border bg-white px-2 py-1 transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <i-custom-cancel class="mr-2 inline-block" />取消上架
                  </button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <template v-if="userInfo.isRootUser">
          <el-tab-pane name="official">
            <template #label><span class="text-base font-bold">官方市集</span></template>
            <el-table
              :data="unBookedList.formatedOfficial"
              border
              max-height="480"
              style="width: 100%"
            >
              <el-table-column prop="title" label="商品圖片" width="80">
                <template #default="scope">
                  <div>
                    <img :src="scope.row.icon" class="max-w-[4rem] border bg-white p-1" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="商品名稱" min-width="120" />
              <el-table-column prop="isBlueprint" label="藍圖" width="60">
                <template #default="scope">
                  <div v-if="scope.row.isBlueprint">
                    <i-custom-done class="mx-auto text-green-700" />
                  </div>
                  <div v-else></div>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="類別" width="60" />
              <el-table-column prop="qualityLabel" label="品質" width="60" />
              <el-table-column prop="message" label="商品內容" min-width="120" />
              <el-table-column prop="dealContent" label="交換方式" min-width="120" />
              <el-table-column fixed="right" label="操作" align="center" width="140">
                <template #default>
                  <el-tooltip placement="top" content="請通知管理員取消上架">
                    <button
                      type="button"
                      class="rounded border bg-white px-2 py-1 transition hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <i-custom-cancel class="mr-2 inline-block" />取消上架
                    </button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
    </section>
  </div>
</template>

<style></style>
