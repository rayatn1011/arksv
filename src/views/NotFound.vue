<script setup></script>

<template>
  <article id="notFound" class="container my-8 flex flex-col justify-center bg-gray-50 text-center">
    <el-empty description="找不到此頁面" :image-size="200" class="mt-8">
      <router-link
        to="/"
        alt="回首頁"
        class="mt-8 inline-block rounded bg-brand px-16 py-2 text-white transition hover:bg-brand-dark"
      >
        <i class="icon-left-open"></i>
        回首頁
      </router-link>
    </el-empty>
  </article>
</template>

<style>
#notFound .el-empty__description p {
  font-size: 1.5rem;
}
</style>
