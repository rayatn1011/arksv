<template>
  <section class="row">
    <div class="col-6">
      <form id="addNewForm">
        <div>
          <label for="userId">個人ID</label>
          <input id="userId" type="text" :value="getUserId" autocomplete="off" readonly />
        </div>
        <div>
          <label for="userName">名稱</label>
          <input id="userName" type="text" :value="getUserName" autocomplete="off" readonly />
        </div>
        <div>
          <label for="productName">商品名稱</label>
          <input
            id="productName"
            type="text"
            placeholder="例：汞動式散彈槍"
            autocomplete="off"
            v-model="form.title"
          />
        </div>
        <div>
          <label for="productType">類別</label>
          <select id="productType" v-model="form.class" @change="changeProductType($event)">
            <template v-for="item in product.type" :key="item.value">
              <option :value="item.value">{{ item.label }}</option>
            </template>
          </select>
        </div>
        <div>
          <label for="productQuality">品質</label>
          <select id="productQuality" v-model="form.quality" :disabled="notHasQuality">
            <template v-for="item in product.quality" :key="item.value">
              <option :value="item.value">{{ item.label }}</option>
            </template>
          </select>
        </div>
        <div class="d-none">
          <label for="productAmount">數量</label>
          <input id="productAmount" type="text" placeholder="商品數量" autocomplete="off" />
        </div>
        <div>
          <label for="productMessage">商品描述</label>
          <input
            id="productMessage"
            type="text"
            placeholder="例：攻擊500%"
            autocomplete="off"
            v-model="form.message"
          />
        </div>
        <div>
          <span>販售方式</span>
          <input
            type="radio"
            name="saleMethod"
            id="sakuraCoin"
            value="sakuraCoin"
            checked
            v-model="form.saleMethod"
          />
          <label for="sakuraCoin">櫻花幣</label>

          <input
            type="radio"
            name="saleMethod"
            id="Barter"
            value="Barter"
            v-model="form.saleMethod"
          />
          <label for="Barter">以物易物</label>
        </div>
        <div>
          <template v-if="form.saleMethod == 'Barter'">
            <label for="productPrice">想要換得的物品</label>
            <input
              id="productPrice"
              type="text"
              placeholder="例：100金屬碇"
              autocomplete="off"
              v-model="form.game_item"
            />
          </template>
          <template v-else>
            <label for="productPrice">櫻花幣價格</label>
            <input
              id="productPrice"
              type="number"
              placeholder="輸入販售價格"
              autocomplete="off"
              v-model.number="form.money"
            />
          </template>
        </div>
        <div>
          <label for="productImg">商品圖片</label>
          <div class="input-file">
            <input
              id="productImg"
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              @change="getFiles($event)"
            />
            <button type="button" @click="clearFile()">
              <i class="icon-trashcan"></i>移除
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="col-6">
      <div class="text-center fs-7">商品預覽</div>
      <!-- <div class="product-item">
        <div class="img-box">
            <img src="item.icon" alt="item.title" />
          <template v-if="false">
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
      </div>-->
    </div>
  </section>
  <section id="addNewBox">
    <h4>注意事項</h4>
    <ol>
      <li>櫻花幣需要買家收到貨之後，在此交易系統上確認完成此交易櫻花幣才會轉帳。</li>
      <li>物品交換則需要自行承擔信用風險,過於特殊的商品管理員可能無法補償</li>
      <li>賣家需要自行截圖留存,發生問題時要附上截圖。</li>
    </ol>
    <div class="submit">
      <button type="button">我已經閱讀注意事項，確定上架</button>
      <button type="button">清除已輸入的內容</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "", // 商品名稱
        class: "weapon", // 商品類別
        quality: "primitive", // 商品品質
        message: "", // 商品描述
        saleMethod: "",
        game_item: "", // 以物易物
        money: "", // 櫻花幣
        isRootUser: "", // 是否為官方市集
        my_file: "", // 商品圖片
        isBlueprint: "", // 是否是藍圖
      },
      product: {
        type: [
          {
            value: "weapon",
            label: "武器",
            hasQuality: true,
          },
          {
            value: "armor",
            label: "防具",
            hasQuality: true,
          },
          {
            value: "props",
            label: "道具",
            hasQuality: false,
          },
          {
            value: "resource",
            label: "資源",
            hasQuality: false,
          },
          {
            value: "blueprint",
            label: "藍圖",
            hasQuality: true,
          },
          {
            value: "other",
            label: "其他",
            hasQuality: false,
          },
        ],
        quality: [
          {
            value: "primitive",
            label: "原始",
          },
          {
            value: "ramshackle",
            label: "普通",
          },
          {
            value: "apprentice",
            label: "優秀",
          },
          {
            value: "journeyman",
            label: "精良",
          },
          {
            value: "mastercraft",
            label: "史詩",
          },
          {
            value: "ascendant",
            label: "傳說",
          },
        ],
      },
    };
  },
  methods: {
    getFiles(e) {
      this.form.my_file = e.target.files[0];
    },
    clearFile() {
      document.getElementById("productImg").value = null;

      this.my_file = "";
    },
    changeProductType(e) {
      this.product.type.some((item) => {
        if (item.value != e.target.value) return false;
        if (!item.hasQuality) {
          this.form.quality = "primitive";
          return true;
        }
      });
    },
  },
  computed: {
    getUserId() {
      return this.$store.state.userId;
    },
    getUserName() {
      return this.$store.state.userName;
    },
    notHasQuality() {
      return !this.product.type.some(
        (item) => item.value == this.form.class && item.hasQuality
      );
    },
  },
  watch: {},
  created() {
    // let cookieArr = document.cookie.split('; ');
    // this.form.catuser = cookieArr.filter(item=> item.match(/^tokenID=/))[0].slice(8);
  },
  mounted() { },
};
</script>

<style lang="scss" scoped>
#addNewForm {
  display: flex;
  flex-wrap: wrap;
  > div {
    display: flex;
    flex-wrap: wrap;
    padding: 4px;
    width: 100%;
    > label,
    > span {
      width: 100%;
      font-size: $fs * 0.9;
      margin-bottom: 4px;
    }
    input {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ccc;
      padding: 8px;
      background-color: #fff;
      &[readonly] {
        font-weight: bold;
        background: none;
        border: none;
        padding: 0;
      }
      &[type="radio"] {
        display: none;
        & + label {
          width: auto;
          cursor: pointer;
          background-color: #fff;
          border-radius: 99px;
          border: 1px solid #ccc;
          padding: 8px 16px;
          font-size: $fs;
          margin-right: 8px;
          transition: background-color 0.2s, color 0.2s;
        }
        &:checked + label {
          background-color: $c-main;
          color: #fff;
        }
      }
      &[type="file"] {
        flex-grow: 1;
        padding: 4px;
        z-index: 0;
        & + button {
          flex-shrink: 0;
          margin-left: 8px;
          width: auto;
          border-radius: 8px;
          border: 1px solid #ccc;
          padding: 0 8px;
          z-index: 1;
          background-color: #fafafa;
          transition: background-color 0.2s;
          &:hover {
            background-color: #eee;
          }
          i {
            font-size: $fs;
          }
        }
      }
    }
    select {
      &[disabled] {
        color: #ccc;
        background-color: #eee;
      }
    }
    .input-file {
      display: flex;
      width: 100%;
    }
    > select {
      width: 100%;
      background: url("../assets/icon/arrow-down.png") no-repeat 94% / 14px #fff;
      appearance: none;
      border-radius: 8px;
      border: 1px solid #ccc;
      padding: 8px;
      color: $c-main;
    }
    &:nth-child(1),
    &:nth-child(2) {
      width: 50%;
    }
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      width: 33%;
    }
  }
}
#addNewBox {
  border-top: 1px solid #eee;
  margin-top: 8px;
  padding-top: 8px;
  h4 {
    color: $c-main;
  }
  ol {
    list-style: normal inside;
    margin-bottom: 32px;
    li {
      color: $c-main;
    }
  }
  .submit {
    display: flex;
    justify-content: end;
    gap: 8px;
    button {
      border-radius: 4px;
      border: 1px solid;
      margin: 0;
      padding: 8px 16px;
      background: none;
      transition: all 0.2s;
      &:nth-child(1) {
        border-color: $c-main;
        color: #fff;
        background: $c-main;
        &:hover {
          background: $c-main * 0.9;
        }
      }
      &:nth-child(2) {
        border-color: #ccc;
        background-color: #fff;
        &:hover {
          color: #000;
          background-color: #eee;
        }
      }
    }
  }
}
</style>
