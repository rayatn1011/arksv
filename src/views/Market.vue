<template>
  <div class="container">
    <article
      id="bannerCarousel"
      class="carousel slide carousel-fade my-4"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators mb-1">
        <template v-for="(item, index) in bannerList" :key="item.alt + index">
          <button
            type="button"
            data-bs-target="#bannerCarousel"
            :data-bs-slide-to="index"
            class="active"
            aria-current="true"
            :aria-label="'Slide' + index"
          ></button>
        </template>
      </div>
      <div class="carousel-inner">
        <template v-for="(item, index) in bannerList" :key="item.alt + index">
          <div class="carousel-item" :class="{ active: index == 0 }">
            <img
              :src="require('../assets/image/' + item.fileName)"
              class="d-block w-100"
              :alt="item.alt"
            />
            <div class="title">{{ item.alt }}</div>
          </div>
        </template>
      </div>
    </article>
    <article class="d-flex">
      <aside id="market-nav-block" class="flex-shrink-0">
        <ul>
          <li v-for="(item) in markeLink" :key="item.name">
            <router-link
              :to="item.url"
              :alt="item.name"
              :class="{
                'router-link-active ':
                  $route.path.includes(item.url.split('/')[2]),
              }"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
        <!-- 篩選商品列表
        <ul>
          <li>
            <button
              class="btn-collapse"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#multiCollapseExample1"
              aria-expanded="true"
              aria-controls="multiCollapseExample1"
            >
              社群市集
            </button>
            <div class="collapse show" id="multiCollapseExample1">
              <ul>
                <li>
                  <router-link to="/Market/weapon/0" class="market-link"
                    >武器類</router-link
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul> -->
      </aside>
      <main class="flex-grow-1">
        <router-view></router-view>
      </main>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        {
          fileName: "中文3.jpg",
          alt: "交易系統新上線！",
        },
        {
          fileName: "中文3.jpg",
          alt: "交易系統新上線！",
        },
      ],
      markeLink: [],
    };
  },
  methods: {
    productUpload() {
      let formData = new FormData();
      formData.append("catuser", "MTYwNzgwOTE0");
      formData.append("title", "網站測試中");
      formData.append("message", "網站測試中請勿下訂");
      formData.append("money", "");
      formData.append("game_item", "金屬碇99999999");
      formData.append("isRootUser", "0");
      // formData.append('my_file', document.getElementById('file').files[0]);

      this.axios({
        method: "post",
        url: "/catAssets/catTan/newTanApi.php",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((res) => {
        console.log(res);
      });
    },
    replacePath(nowPath) {
      if (nowPath == "/Market"||nowPath == "/Market/") {
        this.$router.replace({ path: this.markeLink[0].url });
      }
    },
  },
  computed: {},
  watch: {
    "$route.path": function (nowPath) {
      this.replacePath(nowPath);
    },
  },
  created() {
    this.markeLink =  this.$store.state.markeLink;
    this.replacePath(this.$route.path);    
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#bannerCarousel {
  .carousel-indicators [data-bs-target] {
    border: none;
    width: 16px;
    height: 4px;
    border-radius: 8px;
  }
  .carousel-item {
    position: relative;
    img {
      height: 120px;
      object-fit: cover;
      pointer-events: none;
      border-radius: 8px;
      user-select: none;
      filter: brightness(80%);
    }
    .title {
      position: absolute;
      border-radius: 0 0 8px 0;
      padding: 4px 8px 4px 56px;
      bottom: 0;
      right: 0;
      color: #fff;
      background: linear-gradient(
        to right,
        rgba($color: $c-main, $alpha: 0) 0%,
        rgba($color: $c-main, $alpha: 1) 48px
      );
      font-size: $fs * 1.5;
      font-weight: bold;
    }
  }
}
#market-nav-block {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  margin-right: 16px;
  min-height: 60vh;
  padding-top: 50px;
  li {
    &:last-child {
      position: relative;
      margin-top: 32px;
      &::after {
        position: absolute;
        content: "";
        height: 1px;
        width: 100%;
        background-color: #EEE;
        left: 0;
      }
      
    }
  a {
    border-bottom: 3px solid transparent;
    margin: 8px 32px 8px;
    padding-bottom: 4px;
    font-size: $fs * 1.5;
    font-weight: bold;
    letter-spacing: 4px;
    color: #555;
    transition: all 0.2s;
    &:hover {
      color: $c-main;
      border-bottom: 3px solid $c-main;
    }
    &.router-link-active {
      color: $c-main;
      border-bottom: 3px solid $c-main;
    }
  }
  }
}
// 篩選商品列表
// #market-nav-block {
//   border-left: 1px solid #eee;
//   .btn-collapse {
//     position: relative;
//     border: none;
//     background: none;
//     margin: 8px 0;
//     padding: 0 32px;
//     color: $c-main;
//     font-size: $fs * 1.2;
//     letter-spacing: 2px;
//     transition: color 0.25s;

//     &::before {
//       position: absolute;
//       content: "";
//       width: 8px;
//       height: 100%;
//       top: 0;
//       left: 0;
//       background: $c-main;
//       transition: width 0.25s;
//     }
//     &.collapsed {
//       color: #333;
//       &::before {
//         width: 0;
//       }
//     }
//   }
//   .market-link{
//     padding: 0 32px;
//   }
// }
</style>