<template>
  <article id="notFound" class="container">
    <h2>404</h2>
    <section>
      <h3>找不到此頁面</h3>
      <p>請確認輸入的網址是否正確。</p>
      <router-link to="/" alt="回首頁">
      <i class="icon-left-open"></i>
      回首頁</router-link>
    </section>
  </article>
</template>
<style lang="scss" scoped>
#notFound {
  margin-top: 20vh;
  margin-bottom: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    border-right: 4px solid #eee;
    padding-right: 64px;
    margin-right: 64px;
    line-height: 1;
    font-size: $fs * 8;
    color: #CCC;
  }
  section {
    text-align: left;
    h3 {
      font-weight: bold;
      font-size: $fs * 2;
      letter-spacing: 2px;
      color: $c-main;
    }
    p {
      margin: 8px 0 32px;
      font-size: $fs * 1.2;
      color: #777;
    }
    a {
      border-radius: 8px;
      border: 2px solid $c-main;
      padding: 4px 16px 4px 4px;
      font-size: $fs*1.2;
      color: $c-main;
      transition: all 0.2s;
      &:hover {
        color: #FFF;
        background-color: $c-main;
      }
      i {
        font-size: 1em;
        color: inherit;
      }
    }
  }
}
</style>