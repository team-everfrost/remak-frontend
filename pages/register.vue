<template>
  <div>
    <TopBar />
    <RegisterAcceptToS v-if="current === 0" />
    <RegisterEmail v-if="current === 1" />
    <RegisterVerifiCode v-if="current === 2" />
    <RegisterPassword v-if="current === 3" />
    <RegisterPasswordRepeat v-if="current === 4" />
  </div>
</template>

<script setup lang="ts">
import { useRegisterStore } from '~/stores/register';

definePageMeta({
  onlyLogout: true,
});

const registerStore = useRegisterStore();

const current = computed(() => {
  return registerStore.registerPage;
});

const handlePopState = () => {
  // registerPage 값을 감소시키고 필요한 경우 컴포넌트를 변경하는 로직
  if (registerStore.registerPage > 1) {
    registerStore.registerPage -= 1;
  } else {
    navigateTo('/');
  }
};

onMounted(() => {
  // 초기 상태를 푸시
  history.pushState({ page: registerStore.registerPage }, '');

  // popstate 이벤트 핸들러를 등록
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  // popstate 이벤트 핸들러를 해제
  window.removeEventListener('popstate', handlePopState);
});
</script>
