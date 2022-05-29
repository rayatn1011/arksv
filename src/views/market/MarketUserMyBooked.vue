<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { marketApi } from '../../utils/api.js'

const store = useStore()
const userInfo = ref(store.state.auth.userInfo)
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

// 下訂的清單
const bookedList = reactive({
  community: [],
  formatedCommunity: computed(() => {
    return bookedList.community.map((item) => {
      let newItem = { ...item }
      let currentType = productType.find((type) => type.value === item.class)
      if (currentType) {
        newItem.type = currentType.label
        newItem.qualityLabel = productQuality.find((type) => type.value === item.quality).label
      }
      if (newItem.getTanPlList) {
        for (let pDatum of newItem.getTanPlList) {
          if (pDatum.gameid === userInfo.value.id) {
            newItem.isComp = pDatum.isComp
            newItem.number = pDatum.number
            break
          }
        }
        delete newItem.getTanPlList
      }
      newItem.dealContent = item.money ? `櫻花幣 $${item.money}` : item.money_item

      return newItem
    })
  }),
  official: [],
  formatedOfficial: computed(() => {
    return bookedList.official.map((item) => {
      let newItem = { ...item }
      let currentType = productType.find((type) => type.value === item.class)
      if (currentType) {
        newItem.type = currentType.label
        newItem.qualityLabel = productQuality.find((type) => type.value === item.quality).label
      }
      if (newItem.getTanPlList) {
        for (let pDatum of newItem.getTanPlList) {
          if (pDatum.gameid === userInfo.value.id) {
            newItem.isComp = pDatum.isComp
            newItem.number = pDatum.number
            break
          }
        }
        delete newItem.getTanPlList
      }
      newItem.dealContent = item.money ? `櫻花幣 $${item.money}` : item.money_item

      return newItem
    })
  }),
})

// 取得下訂的清單
const getUserBooked = async () => {
  let formData = new FormData()
  formData.append('getGmidOrder', userInfo.value.id)
  formData.append('getTanPlList', 1)
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
      bookedList.community = response[0].data
      bookedList.official = response[1].data
    })
    .catch((error) => {
      alert('取得已下訂的商品清單失敗')
      console.error(error)
    })
}

const confirmTradeByBuer = async (data) => {
  let formData = new FormData()
  formData.append('tanid', data.tanid)
  await marketApi({
    method: 'post',
    url: `transactionCompleteApi.php?tanum=${data.number}`,
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  })
    .then(async (response) => {
      if (response.data.isPass) {
        await getUserBooked()
        await store.dispatch('getUserInfo')
        ElMessage.success('交易成功')
      } else {
        ElMessage.error('交易失敗')
      }
    })
    .catch((error) => {
      alert('買家確認交易失敗')
      console.error(error)
    })
}
const cancelTradeByBuer = async (data) => {
  let formData = new FormData()
  formData.append('tanid', data.tanid)
  await marketApi({
    method: 'post',
    url: `cancelTradeApi.php?tanum=${data.number}`,
    data: formData,
  })
    .then(async (response) => {
      if (response.data.isPass) {
        await getUserBooked()
        await store.dispatch('getUserInfo')
        ElMessage.success('成功取消下訂')
      } else {
        ElMessage.error('取消下訂失敗')
      }
    })
    .catch((error) => {
      alert('買家取消交易失敗')
      console.error(error)
    })
}
onMounted(() => {
  getUserBooked()
})
</script>

<template>
  <div>
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
            :data="bookedList.formatedCommunity"
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
            <el-table-column fixed="right" label="操作" align="center" width="240">
              <template #default="scope">
                <div class="flex justify-center gap-2">
                  <button
                    type="button"
                    class="flex items-center justify-center rounded-full border bg-white px-2 py-1 transition hover:border-brand hover:bg-brand hover:text-white disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400"
                    :disabled="!scope.row.isComp"
                    @click="confirmTradeByBuer(scope.row)"
                  >
                    <i-custom-done-all class="mr-2" />
                    確認交易
                  </button>

                  <button
                    type="button"
                    class="flex items-center justify-center rounded-full border bg-white px-2 py-1 transition hover:border-brand hover:bg-brand hover:text-white"
                    @click="cancelTradeByBuer(scope.row)"
                  >
                    <i-custom-cancel class="mr-2" />
                    取消
                  </button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane name="official">
          <template #label><span class="text-base font-bold">官方市集</span></template>
          <el-table :data="bookedList.formatedOfficial" border max-height="480" style="width: 100%">
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
            <el-table-column fixed="right" label="操作" align="center" width="240">
              <template #default="scope">
                <div class="flex justify-center gap-2">
                  <button
                    type="button"
                    class="flex items-center justify-center rounded-full border bg-white px-2 py-1 transition hover:border-brand hover:bg-brand hover:text-white disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400"
                    :disabled="!scope.row.isComp"
                    @click="confirmTradeByBuer(scope.row)"
                  >
                    <i-custom-done-all class="mr-2" />
                    確認交易
                  </button>

                  <button
                    type="button"
                    class="flex items-center justify-center rounded-full border bg-white px-2 py-1 transition hover:border-brand hover:bg-brand hover:text-white"
                    @click="cancelTradeByBuer(scope.row)"
                  >
                    <i-custom-cancel class="mr-2" />
                    取消
                  </button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<style></style>
