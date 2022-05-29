<script setup>
import { useStore } from 'vuex'
import { marketApi } from '../../utils/api.js'
import { getCookie } from '../../utils/cookie.js'

const store = useStore()
const userInfo = ref(store.state.auth.userInfo)
const productType = [
  {
    label: '武器',
    value: 'weapon',
    hasBluePrint: true,
    hasQuality: true,
  },
  {
    label: '防具',
    value: 'armor',
    hasBluePrint: true,
    hasQuality: true,
  },
  {
    label: '道具',
    value: 'props',
    hasBluePrint: true,
    hasQuality: false,
  },
  {
    label: '資源',
    value: 'resource',
    hasBluePrint: false,
    hasQuality: false,
  },
  {
    label: '其他',
    value: 'other',
    hasBluePrint: false,
    hasQuality: false,
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
// 全螢幕載入中
const fullscreenLoading = ref(false)
// 商品表單
const productForm = reactive({
  isRootUser: computed(() => userInfo.value.isRootUser),
  userId: computed(() => userInfo.value.id),
  userName: computed(() => userInfo.value.name),
  title: null,
  content: null,
  type: null,
  quality: null,
  hasQuality: false,
  isBluePrint: false,
  hasBluePrint: false,
  saleType: 'item',
  saleContent: null,
  imgFile: null,
  imgPreviewSrc: computed(() => {
    return productForm.imgFile ? URL.createObjectURL(productForm.imgFile) : null
  }),
  isOfficialMarket: 'community',
  showDialog: false,
})
// 商品類別影響: 品質&類型是否可選
watch(
  () => productForm.type,
  () => {
    //品質
    productForm.hasQuality = productType.some(
      (item) => item.value === productForm.type && item.hasQuality
    )
    productForm.quality = productForm.hasQuality ? productForm.quality : null
    //類型
    productForm.hasBluePrint = productType.some(
      (item) => item.value === productForm.type && item.hasBluePrint
    )
    productForm.isBluePrint = productForm.hasBluePrint ? productForm.isBluePrint : false
  }
)
// 販售方式影響: 販售內容&價格
const changeSaleType = () => {
  productForm.saleContent = null
}
// 儲存商品圖片
const changeFile = (e) => {
  productForm.imgFile = e.target.files ? e.target.files[0] : null
}
// 清除商品圖片
const imgFileElement = ref()
const clearFile = () => {
  productForm.imgFile = null
  imgFileElement.value.value = null
}
// 開啟商品大圖
const openProductFormDialog = () => {
  productForm.showDialog = true
}
// 關閉商品圖大圖
const closeProductFormDialog = () => {
  productForm.showDialog = false
}
// 驗證表單
const confirm = () => {
  let isPass = true
  if (!productForm.title) {
    ElMessage.error('商品標題未填寫')
    isPass = false
  } else if (!productForm.content) {
    ElMessage.error('商品內容未填寫')
    isPass = false
  } else if (!productForm.type) {
    ElMessage.error('商品類別未選擇')
    isPass = false
  } else if (productForm.hasQuality && !productForm.quality) {
    ElMessage.error('商品品質未選擇')
    isPass = false
  } else if (!productForm.saleContent) {
    ElMessage.error(`${productForm.saleType === 'item' ? '想交換的物品' : '販售價格'}未填寫`)
    isPass = false
  }
  return isPass
}
// 送出表單
const submitForm = async () => {
  if (!confirm()) return
  fullscreenLoading.value = true
  let formData = new FormData()
  formData.append('catuser', getCookie('tokenID'))
  formData.append('title', productForm.title)
  formData.append('message', productForm.content)
  formData.append('isBlueprint', productForm.isBluePrint ? 1 : 0)
  formData.append('class', productForm.type)
  formData.append('quality', productForm.quality)
  formData.append(
    `${productForm.saleType === 'item' ? 'game_item' : 'money'}`,
    productForm.saleContent
  )
  if (productForm.imgFile) {
    formData.append('my_file', productForm.imgFile)
  }
  formData.append('isRootUser', productForm.isOfficialMarket === 'community' ? 0 : 1)

  await marketApi({
    method: 'post',
    url: 'newTanApi.php',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
  })
    .then(() => {
      ElMessage.success('成功新增商品')
      clearForm()
      fullscreenLoading.value = false
    })
    .catch((error) => {
      alert('新增商品失敗')
      fullscreenLoading.value = false
      console.error(error)
    })
}
// 清除表單
const clearForm = () => {
  productForm.title = null
  productForm.content = null
  productForm.type = null
  productForm.quality = null
  productForm.isBluePrint = false
  productForm.saleContent = null
  productForm.imgFile = null
  imgFileElement.value.value = null
}
</script>

<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="新增商品中，請勿關閉視窗..."
    class="grid grid-cols-12 gap-y-4"
  >
    <form class="col-span-6">
      <ul class="grid grid-cols-12 gap-4">
        <li class="col-span-6">
          <label for="userId" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >個人ID</label
          >
          <input
            id="userId"
            type="text"
            autocomplete="off"
            :value="productForm.userId"
            readonly
            class="w-full rounded-md border border-gray-100 bg-gray-200 px-3 py-2 transition focus:border-brand focus:outline-none"
          />
        </li>
        <li class="col-span-6">
          <label for="userName" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >名稱</label
          >
          <input
            id="userName"
            type="text"
            autocomplete="off"
            :value="productForm.userName"
            readonly
            class="w-full rounded-md border border-gray-100 bg-gray-200 px-3 py-2 transition focus:border-brand focus:outline-none"
          />
        </li>
        <li v-if="productForm.isRootUser" class="col-span-12">
          <label class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >上架位置(僅管理員可見)</label
          >
          <el-radio-group v-model="productForm.isOfficialMarket">
            <el-radio label="community" size="large" border class="bg-white">社群市集</el-radio>
            <el-radio label="Oofficial" size="large" border class="bg-white">官方市集</el-radio>
          </el-radio-group>
        </li>
        <li class="col-span-12">
          <label for="productName" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >商品名稱</label
          >
          <input
            id="productName"
            v-model="productForm.title"
            type="text"
            autocomplete="off"
            class="w-full rounded-md border border-gray-200 px-3 py-2 transition focus:border-brand focus:outline-none"
          />
        </li>
        <li class="col-span-4">
          <label for="productType" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >類別</label
          >
          <el-select
            id="productType"
            v-model="productForm.type"
            placeholder="請選擇類別"
            size="large"
          >
            <el-option
              v-for="item in productType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li class="col-span-4">
          <label for="productQuality" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >品質</label
          >
          <el-select
            id="productQuality"
            v-model="productForm.quality"
            placeholder="請選擇品質"
            size="large"
            :disabled="!productForm.hasQuality"
          >
            <el-option
              v-for="item in productQuality"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </li>
        <li class="col-span-4">
          <label for="productIsBluePrint" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >類型</label
          >
          <el-switch
            id="productIsBluePrint"
            v-model="productForm.isBluePrint"
            :disabled="!productForm.hasBluePrint"
            size="large"
            active-text="藍圖"
            inactive-text="成品"
            class="pl-3"
          />
        </li>
        <li class="col-span-12">
          <label for="productMessage" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >商品內容</label
          >
          <input
            id="productMessage"
            v-model="productForm.content"
            type="text"
            autocomplete="off"
            class="w-full rounded-md border border-gray-200 px-3 py-2 transition focus:border-brand focus:outline-none"
          />
        </li>
        <li class="col-span-12">
          <label class="mb-2 ml-1 block select-none text-sm text-gray-600">販售方式</label>
          <el-radio-group v-model="productForm.saleType" @change="changeSaleType">
            <el-radio label="item" size="large" border class="bg-white">以物易物</el-radio>
            <el-radio label="money" size="large" border class="bg-white">櫻花幣</el-radio>
          </el-radio-group>
        </li>
        <li class="col-span-12">
          <label
            for="productSaleContent"
            class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >{{ productForm.saleType === 'item' ? '想交換的物品' : '販售價格' }}</label
          >
          <input
            id="productSaleContent"
            v-model="productForm.saleContent"
            :type="productForm.saleType === 'item' ? 'text' : 'number'"
            autocomplete="off"
            class="w-full rounded-md border border-gray-200 px-3 py-2 transition focus:border-brand focus:outline-none"
          />
        </li>
        <li class="col-span-12">
          <label for="productImg" class="mb-2 ml-1 block select-none text-sm text-gray-600"
            >商品圖片</label
          >
          <div class="flex items-center gap-2">
            <label
              for="productImg"
              class="group flex grow cursor-pointer items-center rounded-md border border-gray-300 bg-white transition hover:border-gray-400 hover:bg-gray-50 focus:border-brand focus:outline-none"
            >
              <div
                class="flex items-center gap-2 border-r border-gray-200 bg-gray-200 px-3 py-2 text-gray-600 transition group-hover:border-gray-300 group-hover:bg-gray-300"
              >
                <i-custom-image class="text-xl" />
                <span> 選擇檔案</span>
              </div>
              <span class="ml-3" :class="productForm.imgFile ? 'text-brand' : 'text-gray-400'">{{
                productForm.imgFile ? productForm.imgFile.name : '尚未上傳圖片'
              }}</span>
            </label>
            <button
              type="button"
              class="rounded-md border px-3 py-2 transition"
              :class="
                productForm.imgFile
                  ? 'border-gray-300 bg-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-300'
                  : 'border-gray-200 bg-gray-100 text-gray-200'
              "
              :disabled="!productForm.imgFile"
              @click="clearFile"
            >
              <i-custom-delete class="text-xl" />
            </button>
          </div>

          <input
            id="productImg"
            ref="imgFileElement"
            type="file"
            autocomplete="off"
            class="hidden"
            accept=".png, .jpg, .jpeg"
            @change="changeFile"
          />
        </li>
      </ul>
    </form>
    <div class="col-span-6 mx-auto">
      <div class="mb-2 ml-1 block select-none text-sm text-gray-600">商品預覽</div>
      <el-card
        :body-style="{
          padding: '0px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }"
        shadow="hover"
        class="w-60"
      >
        <button v-if="productForm.imgPreviewSrc" type="button" @click="openProductFormDialog">
          <img class="aspect-[4/3] w-full object-cover" :src="productForm.imgPreviewSrc" />
        </button>
        <div
          v-else
          class="flex aspect-[4/3] w-full select-none items-center justify-center bg-gray-200"
        >
          <span class="text-xl font-bold text-gray-400">無商品圖片</span>
        </div>
        <div class="flex grow flex-col justify-between gap-4 p-2">
          <div class="flex flex-col gap-2 break-all px-2">
            <div class="text-lg font-bold">
              {{ productForm.title ? productForm.title : '無名稱' }}
            </div>
            <el-divider class="my-0" />
            <div class="text-sm font-bold">{{ productForm.userName }}</div>
            <div>
              {{ productForm.content ? productForm.content : '無內容' }}
            </div>
          </div>

          <div>
            <div v-if="productForm.saleType === 'money'" class="px-2">
              <span class="mr-2 text-sm text-gray-400">櫻花幣</span>
              <span class="text-xl font-bold text-brand">${{ productForm.saleContent }}</span>
            </div>
            <div v-else class="px-2">
              <div class="text-sm text-gray-400">以物易物</div>
              <div class="font-bold text-brand">
                {{ productForm.saleContent || '無資料' }}
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <hr class="col-span-12 my-4 border-gray-300" />
    <div class="col-span-12">
      <div class="mb-2 text-lg font-bold text-brand">注意事項</div>
      <ol class="list-inside list-decimal">
        <li>櫻花幣需要買家收到貨之後，在此交易系統上確認完成此交易櫻花幣才會轉帳。</li>
        <li>物品交換則需要自行承擔信用風險,過於特殊的商品管理員可能無法補償。</li>
        <li>賣家需要自行截圖留存,發生問題時要附上截圖。</li>
      </ol>
    </div>
    <div class="col-span-12 ml-auto flex gap-4">
      <button
        type="button"
        class="rounded-md border border-gray-300 bg-brand px-4 py-2 text-white transition hover:bg-brand-dark"
        @click="submitForm"
      >
        我已經閱讀注意事項，確定上架
      </button>
      <button
        type="button"
        class="rounded-md border border-gray-300 bg-white px-4 py-2 transition hover:bg-gray-200"
        @click="clearForm"
      >
        清除已輸入的內容
      </button>
    </div>
    <el-dialog
      v-model="productForm.showDialog"
      :title="productForm.title"
      width="40rem"
      @closed="closeProductFormDialog"
    >
      <img
        v-if="productForm.showDialog"
        :src="productForm.imgPreviewSrc"
        :alt="productForm.title"
        class="w-max-full mx-auto"
      />
    </el-dialog>
  </div>
</template>

<style scoped></style>
