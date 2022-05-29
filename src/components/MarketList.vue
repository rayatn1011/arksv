<script setup>
import { useStore } from 'vuex'
import { marketApi } from '../utils/api.js'

const route = useRoute()
const store = useStore()
const userInfo = ref(store.state.auth.userInfo)
const isCommunity = ref()
// 取得登入狀態
const isLogin = computed(() => useStore().state.auth.isLogin)
// 取得該頁面商品列表的api路徑
const getProductListApi = () => {
  const paths = route.path.split('/')
  isCommunity.value = paths.includes('community') ? true : false
  const apiPath = isCommunity.value ? '/getTanListApi.php' : '/getRootTanListApi.php'
  return apiPath
}

// 取得商品列表
let productRawList = ref([])
const getProductList = async (path) => {
  try {
    const response = await marketApi({
      method: 'get',
      url: path,
    })
    productRawList.value = response.data
  } catch (error) {
    alert('取得商品列表無回應')
    console.error(error)
  }
}

// 商品列表篩選
const product = reactive({
  keyword: '',
  filterList: [
    { label: '時間-由新到舊', value: 'new-old' },
    { label: '時間-由舊到新', value: 'old-new' },
    { label: '價格-由大到小', value: 'expensive-cheap' },
    { label: '價格-由小到大', value: 'cheap-expensive' },
  ],
  filtered: 'new-old',
})

// 已篩選的商品列表
let productList = computed(() => {
  let filteredList = JSON.parse(JSON.stringify(productRawList.value))

  // 篩選關鍵字
  if (product.keyword.length > 0) {
    let keyword = product.keyword
    filteredList = filteredList.filter((item) => {
      let conditions = ['dcname', 'message', 'title']
      let isMatching = conditions.some((condition) => item[condition].includes(keyword))
      return isMatching
    })
  }
  // 排序方式
  const sortValue = {
    'new-old': (x, y) => y.time - x.time,
    'old-new': (x, y) => x.time - y.time,
    'expensive-cheap': (x, y) => y.money - x.money,
    'cheap-expensive': (x, y) => x.money - y.money,
  }
  filteredList = filteredList.sort((x, y) => {
    return sortValue[product.filtered](x, y)
  })
  return filteredList
})

// 分頁與分頁內的商品列表
const pagination = reactive({
  pageSize: 10,
  total: computed(() => productList.value.length),
  currentPage: 1,
  currentPageData: computed(() => {
    let list = productList.value.filter((item, index) => {
      let minIndex = pagination.pageSize * (pagination.currentPage - 1)
      let maxIndex = pagination.pageSize * pagination.currentPage - 1
      let inRange = index >= minIndex && index <= maxIndex
      return inRange
    })
    return list
  }),
  event: {
    changePage: async (newPage) => {
      await getProductList(getProductListApi())
      pagination.currentPage = newPage
    },
  },
})

// 下訂商品
const bookProduct = (product) => {
  let formData = new FormData()
  formData.append('gmid', userInfo.value.id)
  formData.append('tanid', product.tanid)

  marketApi({
    method: 'post',
    url: 'placeCatOrderApi.php',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  })
    .then(async (response) => {
      if (response.data.isPass) {
        await getProductList(getProductListApi())
        await store.dispatch('getUserInfo')
        ElMessage.success('已成功下訂商品')
      }
    })
    .catch((error) => {
      alert('下訂商品失敗')
      console.error(error)
    })
}
// 商品大圖
const produceDialog = reactive({
  isActive: false,
  title: '',
  img: null,
})
const openProduceDialog = (product) => {
  produceDialog.isActive = true
  produceDialog.title = product.title
  produceDialog.img = product.icon
}
const closeProduceDialog = () => {
  produceDialog.isActive = false
  produceDialog.title = ''
  produceDialog.img = null
}

// 生命週期
onMounted(async () => {
  await getProductList(getProductListApi())
})
</script>

<template>
  <div>
    <section class="mb-8 flex gap-4 rounded bg-gray-100 p-4">
      <el-input v-model="product.keyword" class="w-auto" placeholder="商品關鍵字" />
      <el-select v-model="product.filtered" class="w-auto" placeholder="Select">
        <el-option
          v-for="item in product.filterList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </section>
    <section class="mb-16">
      <ul class="mx-auto flex flex-wrap items-stretch justify-center gap-x-4 gap-y-8">
        <li v-for="item in pagination.currentPageData" :key="item.tanid">
          <el-card
            :body-style="{
              padding: '0px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }"
            shadow="hover"
            class="h-full w-60"
          >
            <button v-if="item.icon" type="button" @click="openProduceDialog(item)">
              <img :src="item.icon" :alt="item.title" class="aspect-[4/3] w-full object-cover" />
            </button>
            <div
              v-else
              class="flex aspect-[4/3] w-full select-none items-center justify-center bg-gray-200"
            >
              <span class="text-xl font-bold text-gray-400">無商品圖片</span>
            </div>
            <div class="flex grow flex-col justify-between gap-4 p-2">
              <div class="flex flex-col gap-2 break-all px-2">
                <div class="text-lg font-bold">{{ item.title }}</div>
                <el-divider class="my-0" />
                <div class="text-sm font-bold">{{ item.dcname }}</div>
                <div>{{ item.message }}</div>
              </div>

              <div>
                <div v-if="item.money" class="px-2">
                  <span class="mr-2 text-sm text-gray-400">櫻花幣</span>
                  <span class="text-xl font-bold text-brand">${{ item.money }}</span>
                </div>
                <div v-else class="px-2">
                  <div class="text-sm text-gray-400">以物易物</div>
                  <div class="font-bold text-brand">
                    {{ item.money_item || '無資料' }}
                  </div>
                </div>
                <button
                  v-if="isLogin"
                  type="button"
                  class="mt-4 w-full rounded border py-2 transition"
                  :class="
                    item.isPlaceOrder && isCommunity
                      ? 'cursor-not-allowed border-brand bg-brand-light text-brand'
                      : 'hover:bg-brand hover:text-white'
                  "
                  :disabled="item.isPlaceOrder"
                  @click="bookProduct(item)"
                >
                  {{ item.isPlaceOrder && isCommunity ? '已被下訂' : '下訂' }}
                </button>
              </div>
            </div>
          </el-card>
        </li>
      </ul>
    </section>
    <section class="flex justify-center">
      <el-pagination
        background
        :hide-on-single-page="false"
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :current-page="pagination.currentPage"
        @current-change="pagination.event.changePage"
      >
      </el-pagination>
    </section>

    <el-dialog
      v-model="produceDialog.isActive"
      :title="produceDialog.title"
      width="40rem"
      @closed="closeProduceDialog"
    >
      <img :src="produceDialog.img" :alt="produceDialog.title" class="w-max-full mx-auto" />
    </el-dialog>
  </div>
</template>

<style scoped></style>
