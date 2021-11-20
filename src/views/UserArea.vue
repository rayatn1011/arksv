<template>
  <article id="userArea">
    <ul>
      <li v-for="item in userAreaLink" :key="item.name">
        <router-link :to="item.url" :alt="item.name">
          {{
            item.name
          }}
        </router-link>
      </li>
    </ul>
    <section class="container">
      <router-view></router-view>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      userAreaLink: [],
    };
  },
  methods: {},
  computed: {},
  watch: {},
  created() {
    this.userAreaLink = this.$store.state.userAreaLink;
  },
  mounted() { },
};
</script>

<style lang="scss" scoped>
#userArea {
  margin-top: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #eee;
  background: #fafafa;
  min-height: 50vh;
  > ul {
    display: flex;
    align-items: baseline;
    background: #eee;
    border-bottom: 2px solid $c-main;

    a {
      position: relative;
      padding: 4px 16px;
      color: #555;
      font-size: $fs * 1.2;
      z-index: 1;
      &:hover {
        color: #000;
      }
      &::after {
        content: "";
        position: absolute;
        border-radius: 4px 4px 0 0;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 0;
        z-index: -1;
        background-color: $c-main;
        transition: height 0.3s;
      }
      &.router-link-active {
        color: #fff;
        &::after {
          height: calc(100% + 8px);
        }
      }
    }
  }
  > section {
    margin-top: 16px;
    margin-bottom: 16px;
  }
}
</style>