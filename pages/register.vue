<template>
  <div>
    <TopBar />
    <component :is="currenComponent" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

definePageMeta({
  onlyLogout: true,
});

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

const handlePopState = () => {
  // registerPage 값을 감소시키고 필요한 경우 컴포넌트를 변경하는 로직
  if (authStore.registerPage > 1) {
    authStore.registerPage -= 1;
  } else {
    navigateTo('/');
  }
};

onMounted(() => {
  // 초기 상태를 푸시
  history.pushState({ page: authStore.registerPage }, '');

  // popstate 이벤트 핸들러를 등록
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  // popstate 이벤트 핸들러를 해제
  window.removeEventListener('popstate', handlePopState);
});
</script>
