<template>
  <div>
    <TopBarBase />
    <div
      class="flex min-h-screen flex-col items-center bg-remak-background-gray pt-36"
    >
      <div class="mb-4 text-2xl font-bold">
        <span class="text-gray-800">회원가입</span>
      </div>
      <div
        class="flex h-[282px] w-[480px] flex-col rounded-2xl border border-gray-200 bg-white px-6 py-9"
      >
        <div
          class="text-netural-900 items-start text-left text-sm font-medium leading-[14px]"
        >
          비밀번호
        </div>
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          class="mt-3 inline-flex h-14 w-[432px] items-center justify-start gap-2 rounded-xl border border-gray-200 bg-white px-4"
          @input="checkPassword"
        />

        <div class="mt-4 flex">
          <div class="flex items-center">
            <img :src="letterCheckImg" alt="" />
            <span class="ml-1 text-sm leading-[14px] text-gray-500"
              >영문자</span
            >
          </div>
          <div class="flex items-center">
            <img :src="numberCheckImg" alt="" class="ml-2" />
            <span class="ml-1 text-sm leading-[14px] text-gray-500">숫자</span>
          </div>
          <div class="flex items-center">
            <img :src="lengthCheckImg" alt="" class="ml-2" />
            <span class="ml-1 text-sm leading-[14px] text-gray-500"
              >9자 이상</span
            >
          </div>
        </div>
        <button
          :class="passwordClass"
          :disabled="!isValidPassword(password)"
          class="mt-12 inline-flex h-[52px] w-[432px] items-center justify-center rounded-xl px-2 py-4"
        >
          다음으로
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const password = ref('');

const passwordClass = computed(() => {
  return isValidPassword(password.value)
    ? 'bg-remak-blue text-white'
    : 'bg-gray-200 text-gray-500';
});

const lengthCheckImg = computed(() => {
  return password.value.length >= 9
    ? '/assets/check.svg'
    : '/assets/uncheck.svg';
});

const numberCheckImg = computed(() => {
  return /\d/.test(password.value) ? 'assets/check.svg' : 'assets/uncheck.svg';
});

const letterCheckImg = computed(() => {
  return /[A-Za-z]/.test(password.value)
    ? 'assets/check.svg'
    : 'assets/uncheck.svg';
});

const checkPassword = () => {
  isValidPassword(password.value);
};

function isValidPassword(password: string): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
  return regex.test(password);
}
</script>
