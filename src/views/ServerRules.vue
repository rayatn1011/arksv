<template>
  <main class="p-5">
    <div class="container">
      <section class="page-block">
        <div class="page-title">
          <h2>伺服器規則</h2>
        </div>
        <section class="rule-block">
          <h3>ARK 伺服器規則</h3>
          <ol class="row">
            <li class="col-12 col-lg-6 col-xl-4">
              <h4>通用規則</h4>
              <ol>
                <li>請勿限制他人行動</li>
                <li>請勿使用BUG或是非法程式</li>
                <li>請勿在伺服器內發佈廣告</li>
                <li>請勿挑釁、侮辱或侵害他人遊戲權益之行為</li>
                <li>禁止仇恨、歧視性言論或散播不實消息</li>
                <li>請勿影響他人遊戲</li>
              </ol>
            </li>
            <li class="col-12 col-lg-6 col-xl-4">
              <h4>建築規則</h4>
              <ol>
                <li>資源豐富區請勿蓋建築和封鎖</li>
                <li>神器洞穴不可封鎖出入口，也不可讓寵物逗留在內</li>
                <li>請勿到處圈地插柱子</li>
                <li>請勿建造違反善良風俗之建築</li>
                <li>請勿將基地蓋超出5遊戲單位大小(地圖、GPS為主)</li>
                <li>每部落每張圖以主基地2個以內為主，傳送點以10個以內為主</li>
                <li>請勿將建築物蓋在重生點 違者直接拆除不補償</li>
              </ol>
            </li>
            <li class="col-12 col-lg-6 col-xl-4">
              <h4>其他規則</h4>
              <ol>
                <li>物品及道具遺失若非管理員失當行為造成者將不予補償</li>
                <li>請勿未經過同意拿取他人受精蛋</li>
                <li>過期建築被拆除不補償</li>
                <li>伺服器因遊戲性當機將斟酌補償(暫定)</li>
                <li>伺服器因硬體性當機將斟酌補償(暫定)</li>
              </ol>
            </li>
          </ol>
        </section>
        <section class="rule-block">
          <h3>Discord 規則</h3>
          <ol class="row">
            <li class="col-12 col-lg-6 col-xl-4">
              <h4>通用規則</h4>
              <ol>
                <li>成員互動時，請互相尊重並保持禮貌</li>
                <li>不會容忍騷擾、辱罵、仇恨言論及任何的歧視性言論</li>
                <li>不可洩漏任何人的個人私人訊息</li>
                <li>不要在公共頻道指責其他玩家的不當行為檢舉請到 #違規舉報</li>
                <li>不要無意義郵件、圖片、表情符號、命令和@提及</li>
                <li>不可發布與盜版、作弊、破解、漏洞利用相關的內容</li>
              </ol>
            </li>
            <li class="col-12 col-lg-6 col-xl-4">
              <h4>帳戶規則</h4>
              <ol>
                <li>不可使用多個帳戶</li>
                <li>禁止使用攻擊性及有歧視性頭貼及名稱</li>
              </ol>
            </li>
          </ol>
        </section>
        <section class="rule-block">
          <h3>備註</h3>
          <ol class="list-style-none">
            <li>
              規則中沒寫並不代表可以做，請勿存在僥倖心理，所有規則皆視情況給予懲處。
            </li>
            <li>
              不管是付費或是非付費成員在規則中皆平等，違規都會進行懲處，大家都遵守一樣的規則，請勿為難管理員，感謝配合。
            </li>
          </ol>
        </section>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
main {
  background-blend-mode: multiply;
  background-color: rgba($color: #000, $alpha: 0.4);
  background-image: url(../assets/image/中文3.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.page-block {
  border-radius: 8px;
  padding: 32px 24px;
  background: #fff;
  box-shadow: 0 4px 16px rgba($color: #000, $alpha: 0.16);
  .page-title {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 16px 0 48px;
    h2 {
      background: #fff;
      padding: 0 32px;
      z-index: 1;
    }
    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 2px;
      left: 0;
      top: 50%;
      background: $c-main;
    }
  }
  .rule-block {
    h3 {
      border-radius: 8px;
      margin: 32px 0;
      padding: 4px 0;
      background: #eee;
      font-size: $fs * 1.2;
      text-align: center;
    }
    > ol {
      counter-reset: olListCounter;
      font-weight: bold;
      > li {
        position: relative;
        font-size: $fs * 1.2;
        &::before {
          display: inline-block;
          border-radius: 4px 4px 0 0;
          padding: 2px 12px;
          color: #fff;
          background: $c-main;
          counter-increment: olListCounter;
          content: counter(olListCounter);
          margin-right: 0.5em;
        }
        &::after {
          position: absolute;
          content: "";
          margin: 0 calc(var(--bs-gutter-x) * 0.5);
          width: calc(100% - calc(var(--bs-gutter-x) * 0.5));
          height: 1px;
          left: 0;
          top: $fs * 2;
          background: $c-main;
        }
        > h4 {
          display: inline-block;
          margin-left: 4px;
          letter-spacing: 1px;
        }
        > ol {
          margin-top: 8px;
          list-style: inside normal;
          font-weight: normal;
          font-size: $fs;
          > li {
            margin: 4px 0;
            transition: background-color 0.2s;
            &:hover {
              color: #000;
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
    .list-style-none {
      font-weight: normal;
      li {
        margin: 4px 0;
        font-size: $fs;
        transition: background-color 0.2s;
        &:hover {
          color: #000;
          background-color: #eee;
        }
        &::before {
          margin: 0;
          margin-right: 4px;
          padding: 0;
          color: #333;
          background: none;
          content: counter(olListCounter) ".";
        }
      }
    }
  }
}
</style>