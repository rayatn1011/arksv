<template>
  <footer id="footer">
    <div class="container">
      <div class="row">
        <div class="col-5">
          <div class="logo-block">
            <div class="logo">
              <img src="../assets/image/logo-w.png" alt="LOGO" />
            </div>
            <h3>方舟：生存進化伺服器</h3>
            <h5>Copyright © 2021 Town of Sakura</h5>
          </div>
        </div>
        <div class="col-7">
          <div class="row footer-content gy-5">
            <div class="col-6">
              <div class="sitemap-block">
                <h3>網站導覽</h3>
                <ul>
                  <template
                    v-for="(item, index) in getNavLinks"
                    :key="item.name + index"
                  >
                    <li v-if="item.isOpen">
                      <router-link :to="item.url" :alt="item.name">{{
                        item.name
                      }}</router-link>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
            <div class="col-6">
              <div class="external-block">
                <h3>外部連結</h3>
                <ul>
                  <li
                    v-for="(item, index) in getExternalLink"
                    :key="item.name + index"
                  >
                    <a :href="item.url" :alt="item.name" target="_blank">
                      <i :class="item.icon" class="me-2"></i>{{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12">
              <div class="serviceProvider-block">
                <h3>網站維護</h3>
                <ul>
                  <li>管理員：冰的熱拿鐵、asd456uu</li>
                  <li>網站工程師：☆Rainbow·catjennie☆、狐狸乎離</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    /* 取得外部連結 */
    getExternalLink() {
      return this.$store.state.external;
    },
    /* 取得nav清單 */
    getNavLinks() {
      return this.$store.state.nav;
    },
  },
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
#footer {
  background: #333;
  padding: 40px 0;
  .logo-block {
    .logo {
      pointer-events: none;
      width: 200px;
      padding: 20px 0;
    }
    h3,
    h5 {
      color: #fff;
      margin-bottom: 10px;
    }
    h3 {
      font-weight: bold;
      font-size: $fs * 1.5;
    }
  }
  .footer-content {
    h3 {
      border-bottom: 2px solid #555;
      padding-bottom: 10px;
      margin-bottom: 10px;
      color: #fff;
      font-weight: bold;
      font-size: $fs * 1.5;
      letter-spacing: 4px;
    }
    a {
      color: #ccc;
      transition: color 0.2s;
      &:hover {
        color: #fff;
      }
    }
    li {
      color: #ccc;
      font-size: $fs * 1.2;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    i {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid;
      font-size: 0.9em;
    }
    .unopen {
      pointer-events: none;
      color: #555;
      span {
        color: #555;
      }
    }
    .external-block {
      h3 {
        margin-bottom: 20px;
      }
      li {
        margin-bottom: 20px;
      }
    }
  }
}
</style>