<template>
  <section class="top-toolbar">
    <div class="filter-box">
      <input
        type="text"
        id="keyword"
        placeholder="搜索商品關鍵字"
        v-model="picked.searchKeyword"
        @keyup.enter="changeFilterAndKeyword(null, picked.searchKeyword)"
      />
      <button
        type="button"
        @click="changeFilterAndKeyword(null, picked.searchKeyword)"
      >
        <i class="icon-search"></i>
      </button>
    </div>
    <div class="sort-box">
      <div class="dropdown">
        <button
          type="button"
          id="sortButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="ms-2">{{ picked.filterData.label }}</span>
          <i class="icon-filter ms-3"></i>
        </button>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="sortButton"
        >
          <li v-for="(item, index) in filterData" :key="index">
            <button
              type="button"
              class="dropdown-item"
              @click="changeFilterAndKeyword(item, null)"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="product-list" ref="listContainer">
    <ul class="row g-3" v-if="pageData.length > 0">
      <template v-for="(item, index) in pageData" :key="index">
        <li class="col-6 col-lg-4 col-xl-3">
          <div class="product-item">
            <div class="img-box">
              <template v-if="item.icon != null">
                <img :src="item.icon" :alt="item.title" />
                <button
                  type="button"
                  @click="openProductImgModal(item)"
                ></button>
              </template>
              <template v-else>
                <div class="img-null">無商品圖片</div>
              </template>
            </div>
            <div class="tag-box">
              <span class="blueprint" v-if="item.isBlueprint">藍圖</span>
              <span class="legend">傳說</span>
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="dcname">賣家：{{ item.dcname }}</div>
            <div class="message">{{ item.message }}</div>
            <div class="order">
              <div class="price" v-if="item.money">
                <span>櫻花幣</span>${{ item.money }}
              </div>
              <div class="exchange" v-if="item.money_item">
                <span>自訂價格：</span><br />{{ item.money_item }}
              </div>
              <button type="button" class="btn-order">下訂</button>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </section>
  <section class="navigation">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: picked.nowPage == 1 }">
          <router-link
            class="page-link"
            :to="{ params: { pageId: 1 } }"
            alt="最前頁"
            >最前頁
          </router-link>
        </li>

        <template v-for="(item, index) in pageBtnData" :key="index">
          <li class="page-item" :class="{ active: item == picked.nowPage }">
            <router-link
              class="page-link"
              :to="{ params: { pageId: item } }"
              :alt="`第${item}頁`"
              >{{ item }}</router-link
            >
          </li>
        </template>
        <li
          class="page-item"
          :class="{
            disabled: picked.nowPage == totalPage,
          }"
        >
          <router-link
            class="page-link"
            :to="{ params: { pageId: totalPage } }"
            alt="最末頁"
            >最末頁
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
  <section
    id="ProductImgModalDom"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="ProductImgModalLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable
      "
    >
      <div class="modal-content">
        <template v-if="ProductImgModalItem != ''">
          <div class="modal-header px-3 py-2">
            <h5 class="modal-title me-4">{{ ProductImgModalItem.title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center flex-wrap p-2">
            <img
              :src="ProductImgModalItem.icon"
              :alt="ProductImgModalItem.title"
            />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  data() {
    return {
      marketApi: "", //社群or官方API
      ProductImgModal: null, //Bootstrap modal
      ProductImgModalItem: "", //modal content
      filterData: [
        { label: "時間-由新到舊", value: "fromNewToOld" },
        { label: "時間-由舊到新", value: "fromOldToNew" },
        { label: "價格-由大到小", value: "fromExpensiveToCheap" },
        { label: "價格-由小到大", value: "fromCheapToExpensive" },
      ],
      rawData: [], //原始社群市集資料
      filterPageData: [], //搜尋&排序過後的市集資料
      totalPageData: 12, //  單頁總筆數
      totalPage: 0, // 總頁數
      pageData: [], //單頁資料
      pageBtnData: [], //分頁列表
      pageBtnMaxLength: 5, //最大分頁筆數
      picked: {
        nowPage: "",
        filterData: { label: "時間-由新到舊", value: "fromNewToOld" },
        searchKeyword: "",
      },
    };
  },
  methods: {
    // 取得url對應的api路徑
    getPageApi() {
      let url = this.$route.path.split("/")[2];
      switch (url) {
        case "Community":
          this.marketApi =
            "/catAssets/catTan/getTanListApi.php";
          break;
        case "Official":
          this.marketApi =
            "/catAssets/catTan/getRootTanListApi.php";
          break;
      }
    },
    // 取得api原始資料
    async getRawData() {
      if (this.marketApi == "") return;
      let load = this.$loading.show({ container: this.$refs.listContainer });
      await this.axios
        .get(this.marketApi)
        .then((res) => {
          console.log(res.data);
          console.log("社群市集資料取得成功");
          this.rawData = res.data.map((item) => {
            if (item.title == "") item.title = "--";
            if (item.message == "") item.message = "--";
            // console.log(new Date(item.time))
            return item;
          });
          this.toFilterData();
          this.matchKeyword();
          this.picked.nowPage = this.$route.params.pageId;
          load.hide();
        })
        .catch((error) => {
          console.log("伺服器無回應，社群市集資料取得失敗");
          console.log(error);
          load.hide();
        });
    },
    changeFilterAndKeyword(filterValue, KeywordValue) {
      this.$router.replace({ params: { pageId: 1 } });
      this.picked.nowPage = 1;
      if (filterValue != null) this.picked.filterData = filterValue;
      if (KeywordValue != null) this.picked.searchKeyword = KeywordValue;
      this.toFilterData();
      this.matchKeyword();
      this.getPageData();
      this.changePage();
    },
    // 篩選資料
    toFilterData() {
      switch (this.picked.filterData.value) {
        case "fromNewToOld":
          this.filterPageData = this.rawData.sort(
            (item, item2) => item2.time - item.time
          );
          break;
        case "fromOldToNew":
          this.filterPageData = this.rawData.sort(
            (item, item2) => item.time - item2.time
          );
          break;
        case "fromExpensiveToCheap":
          this.filterPageData = this.rawData.sort(
            (item, item2) => item2.money - item.money
          );
          break;
        case "fromCheapToExpensive":
          this.filterPageData = this.rawData.sort(
            (item, item2) => item.money - item2.money
          );
          break;
      }
    },
    // 符合關鍵字
    matchKeyword() {
      let keyword = new RegExp(String(this.picked.searchKeyword), "i");
      this.filterPageData = this.filterPageData.filter(
        (item) =>
          keyword.test(item.title) ||
          keyword.test(item.dcname) ||
          keyword.test(item.message)
      );
    },
    // 取得當頁資料
    getPageData() {
      if (this.filterPageData.length < 1) return;
      let vm = this;
      let pageId = vm.picked.nowPage; //目前url頁數

      vm.totalPage = Math.ceil(vm.filterPageData.length / vm.totalPageData);

      if (pageId == 0 || pageId > vm.totalPage) {
        vm.$router.replace({
          name: "NotFoundPageId",
          params: { pathMatch: vm.$route.path.split("/") },
        });
        return;
      }
      let firstIndex = (pageId - 1) * vm.totalPageData;
      let lastIndex = pageId * vm.totalPageData - 1;
      vm.pageData = vm.filterPageData.slice(firstIndex, lastIndex + 1);
    },
    //開啟商品圖片
    openProductImgModal(item) {
      this.ProductImgModalItem = item;
      this.ProductImgModal.toggle();
    },
    changePage() {
      let vm = this;
      let nowPageId = Number(vm.picked.nowPage);
      if (nowPageId == 1) {
        vm.pageBtnData = [
          nowPageId,
          nowPageId + 1,
          nowPageId + 2,
          nowPageId + 3,
          nowPageId + 4,
        ];
      } else if (nowPageId == 2) {
        vm.pageBtnData = [
          nowPageId - 1,
          nowPageId,
          nowPageId + 1,
          nowPageId + 2,
          nowPageId + 3,
        ];
      } else if (nowPageId == vm.totalPage) {
        vm.pageBtnData = [
          nowPageId - 4,
          nowPageId - 3,
          nowPageId - 2,
          nowPageId - 1,
          nowPageId,
        ];
      } else if (nowPageId == vm.totalPage - 1) {
        vm.pageBtnData = [
          nowPageId - 3,
          nowPageId - 2,
          nowPageId - 1,
          nowPageId,
          nowPageId + 1,
        ];
      } else if (nowPageId > 2) {
        vm.pageBtnData = [
          nowPageId - 2,
          nowPageId - 1,
          nowPageId,
          nowPageId + 1,
          nowPageId + 2,
        ];
      }
      vm.pageBtnData = vm.pageBtnData.filter(
        (item) => item > 0 && item <= vm.totalPage
      );
    },
  },
  computed: {},
  watch: {
    "$route.path": async function (nowPath, oldPath) {
      if (nowPath != oldPath) {
        this.getPageApi();
        await this.getRawData();
        this.getPageData();
        this.changePage();
      }
    },
  },
  created() {},
  async mounted() {
    this.getPageApi();
    await this.getRawData();
    this.getPageData();
    this.changePage();
    this.ProductImgModal = new Modal(
      document.getElementById("ProductImgModalDom")
    );
  },
};
</script>

<style lang="scss" scoped>
.top-toolbar {
  display: flex;
  justify-content: end;
  gap: 16px;
  margin-bottom: 16px;
  .filter-box {
    position: relative;
    display: flex;
    gap: 8px;
    #keyword {
      border: none;
      border-bottom: 1px solid #ccc;
      &::placeholder {
        color: #999;
      }
    }
    > button {
      position: absolute;
      right: 0;
      border: none;
      margin: 0;
      padding: 0;
      background: none;

      > i {
        font-size: $fs;
        transition: color 0.2s;
      }
      &:hover {
        color: $c-main;
      }
    }
  }
  .sort-box {
    #sortButton {
      border: none;
      border-bottom: 1px solid #ccc;
      margin: 0;
      padding: 0;
      background: none;
      span {
        color: #999;
      }
      i {
        font-size: $fs * 0.9;
      }
    }
  }
}
.product-list {
  position: relative;
  .product-item {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 8px;
    height: 100%;
    > *:not(:first-child) {
      margin-top: 8px;
    }
    .img-box {
      position: relative;
      padding-bottom: 70%;
      > * {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      img {
        border-bottom: 1px solid #eee;
        border-radius: 4px;
        object-fit: cover;
      }
      button {
        border: none;
        margin: 0;
        padding: 0;
        background: none;
      }
      .img-null {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        color: #ccc;
        font-weight: bold;
        font-size: $fs * 1.5;
        background-color: #f5f5f5;
      }
    }
    .tag-box {
      display: flex;
      gap: 8px;
      > span {
        pointer-events: none;
        color: #fff;
        border-radius: 4px;
        padding: 0 8px;
        font-size: $fs * 0.9;
      }
      .blueprint {
        background-color: #777;
      }
      .legend {
        background-color: #74c1c1;
      }
    }
    .title {
      font-size: $fs * 1.2;
      font-weight: bold;
      color: #555;
    }
    .dcname {
      color: #777;
    }
    .message {
      color: $c-main;
    }
    .order {
      margin-top: auto;
      .price {
        margin-top: 8px;
        text-align: right;
        font-size: $fs * 1.5;
        font-weight: bold;
        color: #555;
        > span {
          font-size: $fs;
          font-weight: normal;
          margin-right: 8px;
        }
      }
      .exchange {
        margin-top: 8px;
        font-weight: bold;
        color: #555;
        > span {
          font-weight: normal;
          color: #777;
        }
      }
      .btn-order {
        display: block;
        width: 100%;
        border-radius: 4px;
        border: 1px solid $c-main;
        margin-top: 8px;
        padding: 4px 0;
        background: linear-gradient(to left, #fff 50%, $c-main 50%) right;
        background-size: 201%;
        color: $c-main;
        transition: color 0.2s, background-position 0.4s;
        &:hover {
          color: #fff;
          background-position: left;
        }
      }
    }
  }
}
.navigation {
  .pagination {
    margin: 32px 0;
    justify-content: end;
    .router-link-active {
      color: #fff;
    }
    .page-item.disabled .router-link-active {
      color: #999;
    }
  }
}
#ProductImgModalDom {
  .modal-dialog {
    width: auto;
    justify-content: center;
    .modal-content {
      width: auto;
      .modal-header {
        background: #eee;
        .modal-title {
          font-weight: bold;
        }
      }
      img {
        width: auto;
        max-width: 100%;
        border-radius: 4px;
      }
    }
  }
}
</style>