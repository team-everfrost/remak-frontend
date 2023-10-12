<template>
  <div
    class="fixed left-0 top-0 flex h-20 w-full items-center border-b border-gray-300 bg-topbar-background pl-6"
  >
    <button @click="handleClick">
      <img src="~/assets/logo.svg" alt="logo" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const handleClick = () => {
  console.log('click');
  authStore.allowNavigationToHome = true;
  navigateTo('/');
};
</script>
