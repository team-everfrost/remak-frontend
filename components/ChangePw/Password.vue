<template>
  <div class="flex w-full justify-center items-center">
    <div
      class="flex justify-center min-h-[282px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
    >
      <div
        class="text-netural-900 items-start text-left text-sm font-medium leading-[14px]"
      >
        비밀번호
      </div>
      <input
        ref="passwordInput"
        v-model="password"
        type="password"
        autofocus
        placeholder="비밀번호를 입력해주세요"
        class="mt-3 inline-flex h-14 w-[432px] items-center justify-start gap-2 rounded-xl border border-gray-200 bg-white px-4"
        @input="checkPassword"
        @keyup.enter="handleNextClick"
      />

      <div class="mt-4 flex">
        <div class="flex items-center">
          <img v-if="letterCheckImg" src="/assets/check.svg" alt="" />
          <img v-else src="/assets/uncheck.svg" alt="" />
          <span class="ml-1 text-sm leading-[14px] text-gray-500">영문자</span>
        </div>
        <div class="flex items-center ml-2">
          <img v-if="numberCheckImg" src="/assets/check.svg" alt="" />
          <img v-else src="/assets/uncheck.svg" alt="" />
          <span class="ml-1 text-sm leading-[14px] text-gray-500">숫자</span>
        </div>
        <div class="flex items-center ml-2">
          <img v-if="lengthCheckImg" src="/assets/check.svg" alt="" />
          <img v-else src="/assets/uncheck.svg" alt="" />
          <span class="ml-1 text-sm leading-[14px] text-gray-500"
            >9자 이상</span
          >
        </div>
      </div>
      <button
        :class="passwordClass"
        :disabled="!isValidPassword(password)"
        class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl px-2 py-4"
        @click="handleNextClick"
      >
        다음으로
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAccountStore } from '~/stores/account';

const accountStore = useAccountStore();
const password = ref('');
const passwordInput = ref<HTMLInputElement | null>(null);

onActivated(() => {
  passwordInput.value?.focus();
});

const passwordClass = computed(() => {
  return isValidPassword(password.value)
    ? 'bg-remak-blue text-white'
    : 'bg-gray-200 text-gray-500';
});

const lengthCheckImg = computed(() => {
  return password.value.length >= 9;
});

const numberCheckImg = computed(() => {
  return /\d/.test(password.value);
});

const letterCheckImg = computed(() => {
  return /[A-Za-z]/.test(password.value);
});

const checkPassword = () => {
  isValidPassword(password.value);
};

function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{9,}$/;
  return regex.test(password);
}

const handleNextClick = () => {
  if (!isValidPassword(password.value)) return;
  accountStore.setPassword(password.value);
};
</script>
