<template>
  <div>
    <TopBar />
    <component :is="currenComponent" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const currenComponent = computed(() => {
  switch (authStore.registerPage) {
    case 1:
      return 'RegisterEmail';
    case 2:
      return 'RegisterValidCode';
    case 3:
      return 'RegisterPassword';
    case 4:
      return 'RegisterPasswordRepeat';
    default:
      return 'RegisterEmail';
  }
});

useSeoMeta({
  title: '회원가입 - Remak',
});
</script>
