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
    <NuxtLink to="/registerEmail">회원가입1</NuxtLink>
    <br />
    <NuxtLink to="/registerValidCode">회원가입2</NuxtLink>
    <br />
    <NuxtLink to="/registerPassword">회원가입3</NuxtLink>
    <br />
    <NuxtLink to="/registerPasswordRepeat">회원가입4</NuxtLink>
  </div>
</template>
