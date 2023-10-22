<template>
  <div class="flex justify-center">
    <ModalInformAlert
      :is-open="isModalOpen"
      :modal-title="'비밀번호 재설정이 완료되었습니다.'"
      :modal-subtitle="'다시 로그인해주세요'"
      @update:is-open="handleIsOpenUpdate"
      @confirm="handleConfirmClick"
    />
    <div
      class="flex min-h-[318px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
    >
      <div
        class="text-netural-900 items-start text-left text-sm font-medium leading-[14px]"
      >
        비밀번호 재확인
      </div>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        class="mt-3 inline-flex h-14 w-[432px] items-center justify-start gap-2 rounded-xl border border-gray-200 bg-white px-4"
        :class="{
          'border-gray-300 focus:outline-remak-blue': isValidPassword,
          'border-red-500 focus:outline-red-500': !isValidPassword,
        }"
        @input="resetState"
      />
      <div class="h-4">
        <span v-if="!isValidPassword" class="text-xs text-red-500"
          >비밀번호를 다시 확인해주세요</span
        >
      </div>
      <button
        class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl bg-remak-blue px-2 py-4 text-white"
        @click="handleNextClick"
      >
        다음으로
      </button>
      <button
        class="mt-3 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl bg-neutral-100 px-2 py-4 font-bold text-black"
        @click="handleBackClick"
      >
        이전으로
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/account';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const accountStore = useAccountStore();
const password = ref('');
const isValidPassword = ref(true);

const isModalOpen = ref(false);
const handleIsOpenUpdate = (value: boolean) => {
  isModalOpen.value = value;
};
const openModal = () => {
  isModalOpen.value = true;
};
const handleConfirmClick = () => {
  navigateTo('/');
  authStore.signOut();
};

const handleNextClick = async () => {
  if (await accountStore.resetPassword(password.value)) {
    openModal();
  } else {
    isValidPassword.value = false;
  }
};

const resetState = () => {
  isValidPassword.value = true;
};

const handleBackClick = () => {
  accountStore.resetPage -= 1;
};
</script>
