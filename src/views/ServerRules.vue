<script setup></script>

<template>
  <div class="bg-tos h-full w-full py-8 xl:px-32">
    <div class="container rounded bg-white p-8">
      <h1 class="py-4 text-center text-2xl font-bold text-brand">伺服器規則</h1>
      <el-divider class="my-0 mb-4 border-brand"></el-divider>
      <div class="mb-4">
        <h2 class="mb-4 bg-gray-100 py-2 text-center text-lg font-bold">ARK 伺服器規則</h2>
        <ul class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <li>
            <h3 class="text-xl font-bold">
              <span class="mr-4 bg-brand px-2 text-2xl text-white">1</span>通用規則
            </h3>
            <el-divider class="mt-0 mb-4" />
            <ol class="list-decimal pl-4">
              <li>請勿限制他人行動</li>
              <li>請勿使用BUG或是非法程式</li>
              <li>請勿在伺服器內發佈廣告</li>
              <li>請勿挑釁、侮辱或侵害他人遊戲權益之行為</li>
              <li>禁止仇恨、歧視性言論或散播不實消息</li>
              <li>請勿影響他人遊戲</li>
            </ol>
          </li>
          <li>
            <h3 class="text-xl font-bold">
              <span class="mr-4 bg-brand px-2 text-2xl text-white">2</span>
              建築規則
            </h3>
            <el-divider class="mt-0 mb-4" />
            <ol class="list-decimal pl-4">
              <li>資源豐富區請勿蓋建築和封鎖</li>
              <li>神器洞穴不可封鎖出入口，也不可讓寵物逗留在內</li>
              <li>請勿到處圈地插柱子</li>
              <li>請勿建造違反善良風俗之建築</li>
              <li>請勿將基地蓋超出5遊戲單位大小(地圖、GPS為主)</li>
              <li>每部落每張圖以主基地2個以內為主，傳送點以10個以內為主</li>
              <li>請勿將建築物蓋在重生點 違者直接拆除不補償</li>
            </ol>
          </li>
          <li>
            <h3 class="text-xl font-bold">
              <span class="mr-4 bg-brand px-2 text-2xl text-white">3</span>其他規則
            </h3>
            <el-divider class="mt-0 mb-4" />
            <ol class="list-decimal pl-4">
              <li>物品及道具遺失若非管理員失當行為造成者將不予補償</li>
              <li>請勿未經過同意拿取他人受精蛋</li>
              <li>過期建築被拆除不補償</li>
              <li>伺服器因遊戲性當機將斟酌補償(暫定)</li>
              <li>伺服器因硬體性當機將斟酌補償(暫定)</li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="mb-4">
        <h2 class="mb-4 bg-gray-100 py-2 text-center text-lg font-bold">Discord 規則</h2>
        <ul class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <li>
            <h3 class="text-xl font-bold">
              <span class="mr-4 bg-brand px-2 text-2xl text-white">1</span>通用規則
            </h3>
            <el-divider class="mt-0 mb-4" />
            <ol class="list-decimal pl-4">
              <li>成員互動時，請互相尊重並保持禮貌</li>
              <li>不會容忍騷擾、辱罵、仇恨言論及任何的歧視性言論</li>
              <li>不可洩漏任何人的個人私人訊息</li>
              <li>不要在公共頻道指責其他玩家的不當行為檢舉請到 #違規舉報</li>
              <li>不要無意義郵件、圖片、表情符號、命令和@提及</li>
              <li>不可發布與盜版、作弊、破解、漏洞利用相關的內容</li>
            </ol>
          </li>
          <li>
            <h3 class="text-xl font-bold">
              <span class="mr-4 bg-brand px-2 text-2xl text-white">2</span>
              帳戶規則
            </h3>
            <el-divider class="mt-0 mb-4" />
            <ol class="list-decimal pl-4">
              <li>不可使用多個帳戶</li>
              <li>禁止使用攻擊性及有歧視性頭貼及名稱</li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="mb-4">
        <h2 class="mb-4 bg-gray-100 py-2 text-center text-lg font-bold">備註</h2>
        <ol class="list-decimal pl-4">
          <li>規則中沒寫並不代表可以做，請勿存在僥倖心理，所有規則皆視情況給予懲處。</li>
          <li>
            不管是付費或是非付費成員在規則中皆平等，違規都會進行懲處，大家都遵守一樣的規則，請勿為難管理員，感謝配合。
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-tos {
  background-blend-mode: multiply;
  background-color: rgba(0, 0, 0, 0.4);
  background-image: url(../assets/image/中文3.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-attachment: fixed;
}
</style>
