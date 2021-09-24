<template>
  <headerComponent></headerComponent>
  <router-view></router-view>
</template>

<script>
import headerComponent from "@/components/Header.vue";

export default {
  components: {
    headerComponent,
  },
  data() {
    return {
      //是否登入
      isLogin: false,
      //外部連結
      externalLinks: [
        {
          name: "春櫻之城Discord社群",
          url: "https://discord.gg/XKpqdZTDna",
          icon: "icon-discord",
        },
        {
          name: "匿名意見表",
          url: "https://forms.gle/hEosESAypVs1b3kP9",
          icon: "icon-doc",
        },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss">
// import fonts
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap");

// global setting
body {
  * {
    box-sizing: border-box;
    box-shadow: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba($color: $c-main, $alpha: 0.6);
    }
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
    font-family: "Noto Sans TC", sans-serif;
  }
  ul,
  ol {
    list-style: none;
  }
  a {
    text-decoration: none;
    display: inline-block;
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
}

// cover plugin class
#app {
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
}
</style>

