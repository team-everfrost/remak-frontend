<template>
  <div>
    <TopBar />
    <component :is="currenComponent" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const RegisterEmail = defineAsyncComponent(
  () => import('@/components/Register/Email.vue'),
);
const RegisterVerifiCode = defineAsyncComponent(
  () => import('@/components/Register/VerifiCode.vue'),
);
const RegisterPassword = defineAsyncComponent(
  () => import('@/components/Register/Password.vue'),
);
const RegisterPasswordRepeat = defineAsyncComponent(
  () => import('@/components/Register/PasswordRepeat.vue'),
);

const currenComponent = computed(() => {
  switch (authStore.registerPage) {
    case 1:
      return RegisterEmail;
    case 2:
      return RegisterVerifiCode;
    case 3:
      return RegisterPassword;
    case 4:
      return RegisterPasswordRepeat;
    default:
      return RegisterEmail;
  }
});

useSeoMeta({
  title: '회원가입 - Remak',
});
</script>
