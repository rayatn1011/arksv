<template>
  <header-component></header-component>
  <!-- <transition name="slow-fade"> -->
  <router-view></router-view>
  <!-- </transition> -->
  <footer-component></footer-component>
</template>

<script>
import headerComponent from "@/components/Header.vue";
import footerComponent from "@/components/Footer.vue";

export default {
  components: {
    headerComponent,
    footerComponent,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  created() { },
  mounted() { },
};
</script>

<style lang="scss">
// import fonts
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Noto+Sans+TC:wght@400;700&display=swap");
// global setting
body {
  * {
    box-sizing: border-box;
    box-shadow: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  [v-cloak] {
    display: none;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    border: 0;
    padding: 0;
    font-size: 100%;
    font: inherit;
    color: #333;
    font-family: "Noto Sans TC", "Noto Sans SC", "Microsoft JhengHei",
      "Heiti TC", "WenQuanYi Zen Hei", sans-serif;
    word-wrap: break-word;
  }
  ul,
  ol {
    list-style: none;
  }
  a {
    text-decoration: none;
    display: inline-block;
    transition: color 0.2s;
    &:hover {
      color: $c-main;
    }
  }
  ::placeholder {
    color: #999;
  }
  img {
    width: 100%;
  }
  i {
    color: inherit;
    font-size: 1.5em;
  }
  h2 {
    font-size: $fs * 2;
    font-weight: bold;
    letter-spacing: 2px;
  }
  h3 {
    font-size: $fs * 1.5;
    font-weight: bold;
    letter-spacing: 1px;
  }
  h4 {
    font-size: $fs * 1.2;
    font-weight: bold;
    letter-spacing: 1px;
  }
}
.bg-f5 {
  background: #f5f5f5;
}
.fs-7 {
  font-size: 0.9rem;
}
// cover plugin class
.container-full {
  margin-left: 40px;
  margin-right: 40px;
}
// vue
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slow-fade-enter-active,
.slow-fade-leave-active {
  opacity: 0;
  transition: opacity 1.25s;
}

.slow-fade-enter-from,
.slow-fade-leave-to {
  opacity: 0;
}

.slow-fade-enter-to,
.slow-fade-leave-from {
  opacity: 1;
}
a.router-link-active {
  color: $c-main;
}
</style>
