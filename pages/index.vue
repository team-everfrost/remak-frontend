<script setup>
useSeoMeta({
  title: 'Remak, your personal knowledge base',
});
</script>

<template>
  <div>
    <h1>메인페이지</h1>
    <NuxtLink to="/login">로그인</NuxtLink>
    <br />
    <NuxtLink to="/app">로그인 후 메인화면</NuxtLink>

    <br />
    <NuxtLink to="/main">메인페이지</NuxtLink>
    <br />
    <NuxtLink to="/testPage">테스트페이지</NuxtLink>
    <br />
    <NuxtLink to="/register">회원가입 테스트페이지</NuxtLink>
  </div>
</template>
